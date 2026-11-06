// Exports the Supabase `cities` table to public/cities.json, which is what the
// /map page actually reads. Supabase is now only the editing backend for
// /city-manager: after changing cities there, run `npm run export-cities` and
// commit the updated JSON so the live map picks the changes up.
//
// Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from the environment
// (the npm script loads them from .env).

import { writeFile } from 'node:fs/promises';

const OUTPUT_PATH = 'public/cities.json';
const FIELDS = ['id', 'name', 'x', 'y', 'banner_image', 'description', 'ruler', 'ideology', 'date_first_visited'];

function fail(message) {
  console.error(message);
  process.exit(1);
}

async function main() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    fail('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY (expected in .env)');
  }

  const endpoint = `${url}/rest/v1/cities?select=${FIELDS.join(',')}&order=name.asc`;
  let response;
  try {
    response = await fetch(endpoint, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  } catch (err) {
    fail(`Could not reach Supabase (${err.cause?.code ?? err.message}). If the project is paused, restore it from the Supabase dashboard first.`);
  }
  if (!response.ok) {
    const body = (await response.text()).slice(0, 300);
    const hint = response.status >= 500 ? ' (the project may still be starting up after a restore; try again in a few minutes)' : '';
    fail(`Supabase error: ${response.status}${hint}\n${body}`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    fail('Supabase returned no cities; refusing to overwrite public/cities.json with an empty list.');
  }

  // numeric columns come back as numbers or strings depending on precision; normalise them.
  const cities = rows.map((row) => ({ ...row, x: Number(row.x), y: Number(row.y) }));

  await writeFile(OUTPUT_PATH, `${JSON.stringify(cities, null, 2)}\n`);
  console.log(`Wrote ${cities.length} cities to ${OUTPUT_PATH}`);
}

main();
