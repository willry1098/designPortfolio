#!/usr/bin/env python3
"""
Syncs new "recently read" books from the reading-log Google Sheet into
src/data/booksData.ts.

Run manually after updating the sheet:
    python3 customScripts/update_bookshelf.py

Safe to re-run: books already present in booksData.ts (matched by title)
are skipped, so nothing gets duplicated.

Cover art is looked up automatically (Open Library, falling back to Google
Books) and can fail for individual titles. To retry just the covers that
fell back to the placeholder image, without re-syncing anything else:
    python3 customScripts/update_bookshelf.py --backfill-covers

Google Books works without a key but shares a global anonymous quota. To
use your own quota instead, set GOOGLE_BOOKS_API_KEY in the environment.
"""

import csv
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

SHEET_CSV_URL = (
    "https://docs.google.com/spreadsheets/d/"
    "1zu73SqA-x1hagAFZPCcrYzUV00kYEHerp5cymyDSOaE/export?format=csv"
)

REPO_ROOT = Path(__file__).resolve().parent.parent
BOOKS_DATA_PATH = REPO_ROOT / "src" / "data" / "booksData.ts"

PLACEHOLDER_COVER = (
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
    "?auto=compress&cs=tinysrgb&w=300&h=400"
)

ARRAY_START = "export const books: Book[] = [\n"

OPEN_LIBRARY_TIMEOUT = 25
OPEN_LIBRARY_RETRIES = 3
GOOGLE_BOOKS_TIMEOUT = 15
GOOGLE_BOOKS_API_KEY = os.environ.get("GOOGLE_BOOKS_API_KEY")

ENTRY_PATTERN = re.compile(
    r'id: (\d+),\s*\n\s*title: "((?:[^"\\]|\\.)*)",\s*\n\s*author: "((?:[^"\\]|\\.)*)",'
    r'\s*\n\s*cover: "([^"]*)",'
)


def fetch_sheet_rows():
    with urllib.request.urlopen(SHEET_CSV_URL) as resp:
        text = resp.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(text))
    if "Category" not in (reader.fieldnames or []):
        sys.exit(
            "Sheet has no 'Category' column yet. Add one (Fiction, Design, "
            "Business, Psychology, etc. per book) before running this script."
        )
    return list(reader)


def reformat_author(raw):
    parts = [p.strip() for p in raw.split(",")]
    if len(parts) == 2:
        return f"{parts[1]} {parts[0]}"
    return raw.strip()


def clean_summary(raw):
    collapsed = re.sub(r"\s*\n\s*", " ", raw.strip())
    return re.sub(r" {2,}", " ", collapsed)


def date_sort_key(date_str):
    date_str = date_str.strip()
    try:
        return datetime.strptime(date_str, "%B %Y")
    except ValueError:
        return datetime.min


def fetch_cover_open_library(title, author):
    primary_author = author.split(",")[0].strip()
    query = urllib.parse.urlencode({"title": title, "author": primary_author, "limit": 1})
    url = f"https://openlibrary.org/search.json?{query}"
    for attempt in range(1, OPEN_LIBRARY_RETRIES + 1):
        try:
            with urllib.request.urlopen(url, timeout=OPEN_LIBRARY_TIMEOUT) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            docs = data.get("docs") or []
            cover_id = docs[0].get("cover_i") if docs else None
            # A real response with no cover_id is a genuine miss, not worth retrying.
            return f"https://covers.openlibrary.org/b/id/{cover_id}-M.jpg" if cover_id else None
        except Exception as e:
            if attempt < OPEN_LIBRARY_RETRIES:
                time.sleep(2 * attempt)
            else:
                print(f"  (Open Library lookup failed for {title!r} after {OPEN_LIBRARY_RETRIES} attempts: {e})")
    return None


def fetch_cover_google_books(title, author):
    primary_author = author.split(",")[0].strip()
    params = {"q": f"intitle:{title} inauthor:{primary_author}", "maxResults": 1}
    if GOOGLE_BOOKS_API_KEY:
        params["key"] = GOOGLE_BOOKS_API_KEY
    query = urllib.parse.urlencode(params)
    url = f"https://www.googleapis.com/books/v1/volumes?{query}"
    try:
        with urllib.request.urlopen(url, timeout=GOOGLE_BOOKS_TIMEOUT) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        items = data.get("items") or []
        if not items:
            return None
        image_links = items[0].get("volumeInfo", {}).get("imageLinks", {})
        thumbnail = image_links.get("thumbnail") or image_links.get("smallThumbnail")
        return thumbnail.replace("http://", "https://") if thumbnail else None
    except Exception as e:
        print(f"  (Google Books lookup failed for {title!r}: {e})")
    return None


def fetch_cover(title, author):
    cover = fetch_cover_open_library(title, author)
    if not cover:
        cover = fetch_cover_google_books(title, author)
    return (cover, True) if cover else (PLACEHOLDER_COVER, False)


def existing_titles_and_max_id(contents):
    titles = {m.group(1).strip().lower() for m in re.finditer(r'title:\s*"((?:[^"\\]|\\.)*)"', contents)}
    ids = [int(m) for m in re.findall(r"id:\s*(\d+)", contents)]
    return titles, (max(ids) if ids else 0)


def format_entry(entry):
    lines = ["  {"]
    for key in ("id", "title", "author", "cover", "summary", "completedDate", "category"):
        value = entry[key]
        rendered = value if key == "id" else json.dumps(value)
        lines.append(f"    {key}: {rendered},")
    lines[-1] = lines[-1].rstrip(",")
    lines.append("  },")
    return "\n".join(lines)


def backfill_covers():
    contents = BOOKS_DATA_PATH.read_text(encoding="utf-8")
    matches = list(ENTRY_PATTERN.finditer(contents))

    updates = []
    fixed, still_placeholder = [], []
    for m in matches:
        _id, title, author, cover = m.groups()
        if cover != PLACEHOLDER_COVER:
            continue
        new_cover, found = fetch_cover(title, author)
        if found:
            updates.append((*m.span(4), new_cover))
            fixed.append(title)
        else:
            still_placeholder.append(title)

    if not updates:
        print("No covers could be improved right now.")
    else:
        # Apply from the end backwards so earlier match offsets stay valid.
        for start, end, new_cover in sorted(updates, key=lambda u: u[0], reverse=True):
            contents = contents[:start] + new_cover + contents[end:]
        BOOKS_DATA_PATH.write_text(contents, encoding="utf-8")
        print(f"Fixed {len(fixed)} cover(s):")
        for t in fixed:
            print(f"  - {t}")

    if still_placeholder:
        print(f"Still on the placeholder for {len(still_placeholder)} book(s) (try again later, or fix source data):")
        for t in still_placeholder:
            print(f"  - {t}")


def main():
    if "--backfill-covers" in sys.argv:
        backfill_covers()
        return

    rows = fetch_sheet_rows()
    reviewed = [r for r in rows if r.get("Post-Read Note", "").strip()]

    contents = BOOKS_DATA_PATH.read_text(encoding="utf-8")
    existing_titles, max_id = existing_titles_and_max_id(contents)

    new_rows = [r for r in reviewed if r["Title"].strip().lower() not in existing_titles]
    new_rows.sort(key=lambda r: date_sort_key(r["Date Completed"]), reverse=True)

    if not new_rows:
        print(f"No new books to add. ({len(reviewed)} reviewed in sheet, all already present.)")
        return

    entries = []
    placeholder_used = []
    for i, row in enumerate(new_rows):
        title = row["Title"].strip()
        author_raw = row["Author"].strip()
        cover, found = fetch_cover(title, author_raw)
        if not found:
            placeholder_used.append(title)
        entries.append({
            "id": max_id + i + 1,
            "title": title,
            "author": reformat_author(author_raw),
            "cover": cover,
            "summary": clean_summary(row["Post-Read Note"]),
            "completedDate": row["Date Completed"].strip(),
            "category": row["Category"].strip(),
        })

    block = "\n".join(format_entry(e) for e in entries) + "\n"
    updated = contents.replace(ARRAY_START, ARRAY_START + block, 1)
    BOOKS_DATA_PATH.write_text(updated, encoding="utf-8")

    print(f"Added {len(entries)} new book(s):")
    for e in entries:
        print(f"  - {e['title']} ({e['completedDate'] or 'no date'})")
    skipped = len(reviewed) - len(new_rows)
    print(f"Skipped {skipped} book(s) already present.")
    if placeholder_used:
        print(f"Used placeholder cover for {len(placeholder_used)} title(s):")
        for t in placeholder_used:
            print(f"  - {t}")
        print("Run with --backfill-covers later to retry just these.")


if __name__ == "__main__":
    main()
