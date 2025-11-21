interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

interface SteamResponse {
  response: {
    games: SteamGame[];
    game_count: number;
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const url = new URL(req.url);
    const steamId = url.searchParams.get('steamId');
    const apiKey = Deno.env.get('STEAM_API_KEY');

    if (!steamId || !apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing Steam ID or API key' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Fetch recently played games from Steam API
    const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&count=6`;
    
    const response = await fetch(steamApiUrl);
    
    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data: SteamResponse = await response.json();
    
    // Transform the data to include image URLs
    const games = data.response.games?.map(game => ({
      ...game,
      header_image: `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`,
      icon_url: game.img_icon_url ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : null,
    })) || [];

    return new Response(
      JSON.stringify({ games }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Steam API error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Steam games' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
