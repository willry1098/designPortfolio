import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import { citiesService, City } from '../lib/supabase';

const MapPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await citiesService.getAllCities();
      setCities(data);
    } catch (err) {
      console.error('Error loading cities:', err);
      setError('Failed to load city data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const mapCities = cities.map(city => ({
    id: city.id,
    name: city.name,
    x: Number(city.x),
    y: Number(city.y),
    bannerImage: city.banner_image,
    description: city.description,
    ruler: city.ruler,
    ideology: city.ideology,
    dateFirstVisited: city.date_first_visited,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-signal-blue animate-spin mx-auto mb-4" />
          <p className="text-soft-white text-lg">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={loadCities}
            className="bg-signal-blue text-soft-white px-6 py-3 rounded-lg hover:bg-signal-blue/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/projects/cerca-mare"
          className="flex items-center gap-2 bg-soft-white text-deep-indigo px-4 py-3 rounded-lg shadow-lg hover:bg-slate-gray/10 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Project</span>
        </Link>
      </div>

      <InteractiveMap
        mapImage="/cercaMareMap.jpeg"
        cities={mapCities}
      />
    </div>
  );
};

export default MapPage;
