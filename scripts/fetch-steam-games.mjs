const STEAM_ID = '76561198088720071';
const OUTPUT_PATH = 'public/steam-games.json';

function fail(message) {
  // The ::error:: prefix promotes this to GitHub Actions' Annotations panel,
  // so the real cause is visible without needing to open the raw job log.
  console.error(`::error::${message}`);
  process.exit(1);
}

async function main() {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    fail('Missing STEAM_API_KEY environment variable');
  }

  const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${STEAM_ID}&format=json&count=6`;

  const response = await fetch(steamApiUrl);
  if (!response.ok) {
    fail(`Steam API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const games = (data.response.games ?? []).map((game) => ({
    ...game,
    header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
    icon_url: game.img_icon_url
      ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
      : null,
  }));

  const { readFile, writeFile } = await import('node:fs/promises');

  // Only rewrite the file when the games themselves changed. Otherwise the
  // updatedAt timestamp alone would produce a commit on every scheduled run.
  try {
    const previous = JSON.parse(await readFile(OUTPUT_PATH, 'utf8'));
    if (JSON.stringify(previous.games) === JSON.stringify(games)) {
      console.log(`No change in recently played games; leaving ${OUTPUT_PATH} as is`);
      return;
    }
  } catch {
    // No previous file, or it isn't valid JSON: write a fresh one.
  }

  const output = {
    games,
    updatedAt: new Date().toISOString(),
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');

  console.log(`Wrote ${games.length} games to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
