import React, { useState, useEffect } from 'react';
import { Gamepad2, Clock, Calendar } from 'lucide-react';

interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  header_image: string;
  icon_url?: string;
}

const SteamGames: React.FC = () => {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  useEffect(() => {
    const fetchSteamGames = async () => {
      try {
        const steamId = '76561198088720071';

        // Use Supabase Edge Function to proxy Steam API request
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/steam-games?steamId=${steamId}`;

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Steam API Response Error:', response.status, errorData);
          throw new Error(`Failed to fetch Steam games: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        console.log('Steam games fetched successfully:', data);
        setGames(data.games || []);
        
      } catch (err) {
        console.error('Error fetching Steam games:', err);
        setError('Using sample data (Edge function not available)');
        // Fallback to mock data for demonstration
        setGames([
          {
            appid: 730,
            name: "Counter-Strike 2",
            playtime_2weeks: 120,
            playtime_forever: 2400,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/730/header.jpg"
          },
          {
            appid: 570,
            name: "Dota 2",
            playtime_2weeks: 80,
            playtime_forever: 1800,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/570/header.jpg"
          },
          {
            appid: 271590,
            name: "Grand Theft Auto V",
            playtime_2weeks: 45,
            playtime_forever: 600,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/271590/header.jpg"
          },
          {
            appid: 1086940,
            name: "Baldur's Gate 3",
            playtime_2weeks: 200,
            playtime_forever: 1200,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1086940/header.jpg"
          },
          {
            appid: 1174180,
            name: "Red Dead Redemption 2",
            playtime_2weeks: 60,
            playtime_forever: 800,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1174180/header.jpg"
          },
          {
            appid: 1245620,
            name: "ELDEN RING",
            playtime_2weeks: 150,
            playtime_forever: 900,
            header_image: "https://steamcdn-a.akamaihd.net/steam/apps/1245620/header.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamGames();
  }, []);

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    if (hours < 1) return `${minutes}m`;
    if (hours < 100) return `${hours}h ${minutes % 60}m`;
    return `${hours}h`;
  };

  if (loading) {
    return (
      <div className="mt-16 bg-slate-gray/5 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-signal-blue"></div>
          <span className="ml-3 text-slate-gray">Loading recent games...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-slate-gray/5 rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-deep-indigo mb-4">Recently Played Games</h2>
        <p className="text-slate-gray max-w-2xl mx-auto leading-relaxed">
          Look, I know video games may not belong on bookshelves (good luck even finding physical copies of games these days), but they are still one of my favorite narrative vehicles. I listen to video game music when I'm working, I play the games to relax, and I unabashedly adapt mechanics I love into stories of my own. I don't always get the chance to play as much as I would like, but this page wouldn't be complete without an ode to some of my favorite stories.
        </p>
        {error && (
          <p className="text-sm text-slate-gray/70 mt-2">
            {error} - Showing sample data
          </p>
        )}
      </div>

      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.appid}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredGame(game.appid)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              <div className="bg-soft-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={game.header_image}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=200";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-deep-indigo mb-2 line-clamp-1">{game.name}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-slate-gray">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatPlaytime(game.playtime_forever)} total</span>
                    </div>
                    
                    {game.playtime_2weeks && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatPlaytime(game.playtime_2weeks)} recent</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay with additional info */}
                {hoveredGame === game.appid && (
                  <div className="absolute inset-0 bg-deep-indigo/90 text-soft-white p-3 flex flex-col justify-center items-center rounded-lg animate-fade-in">
                    <h3 className="font-bold text-base mb-2 text-center">{game.name}</h3>
                    <div className="text-center space-y-1">
                      <p className="text-sm">
                        <span className="text-tech-teal">Total:</span> {formatPlaytime(game.playtime_forever)}
                      </p>
                      {game.playtime_2weeks && (
                        <p className="text-sm">
                          <span className="text-tech-teal">Last 2 weeks:</span> {formatPlaytime(game.playtime_2weeks)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-gray">
          <Gamepad2 size={48} className="mx-auto mb-4 opacity-50" />
          <p>No recent games found</p>
        </div>
      )}

    </div>
  );
};

export default SteamGames;