const STEAM_ID = '76561198088720071';

const apiKey = process.env.STEAM_API_KEY;
if (!apiKey) {
  console.error('Missing STEAM_API_KEY environment variable');
  process.exit(1);
}

const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${STEAM_ID}&format=json&count=6`;

const response = await fetch(steamApiUrl);
if (!response.ok) {
  console.error(`Steam API error: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const data = await response.json();

const games = (data.response.games ?? []).map((game) => ({
  ...game,
  header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
  icon_url: game.img_icon_url
    ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
    : null,
}));

const output = {
  games,
  updatedAt: new Date().toISOString(),
};

const { writeFile } = await import('node:fs/promises');
await writeFile('public/steam-games.json', JSON.stringify(output, null, 2) + '\n');

console.log(`Wrote ${games.length} games to public/steam-games.json`);
