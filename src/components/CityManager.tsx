import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';
import { citiesService, City } from '../lib/supabase';

const CityManager: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    x: '',
    y: '',
    banner_image: '',
    description: '',
    ruler: '',
    ideology: '',
    date_first_visited: '',
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setLoading(true);
      const data = await citiesService.getAllCities();
      setCities(data);
    } catch (error) {
      console.error('Error loading cities:', error);
      alert('Failed to load cities');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      name: '',
      x: '',
      y: '',
      banner_image: '',
      description: '',
      ruler: '',
      ideology: '',
      date_first_visited: '',
    });
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      x: String(city.x),
      y: String(city.y),
      banner_image: city.banner_image,
      description: city.description,
      ruler: city.ruler,
      ideology: city.ideology,
      date_first_visited: city.date_first_visited,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingCity(null);
    setFormData({
      name: '',
      x: '',
      y: '',
      banner_image: '',
      description: '',
      ruler: '',
      ideology: '',
      date_first_visited: '',
    });
  };

  const handleSave = async () => {
    try {
      const cityData = {
        name: formData.name,
        x: parseFloat(formData.x),
        y: parseFloat(formData.y),
        banner_image: formData.banner_image,
        description: formData.description,
        ruler: formData.ruler,
        ideology: formData.ideology,
        date_first_visited: formData.date_first_visited,
      };

      if (editingCity) {
        await citiesService.updateCity(editingCity.id, cityData);
      } else {
        await citiesService.createCity(cityData);
      }

      await loadCities();
      handleCancel();
    } catch (error) {
      console.error('Error saving city:', error);
      alert('Failed to save city');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this city?')) return;

    try {
      await citiesService.deleteCity(id);
      await loadCities();
    } catch (error) {
      console.error('Error deleting city:', error);
      alert('Failed to delete city');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-signal-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-deep-indigo">City Manager</h1>
          {!isCreating && !editingCity && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-signal-blue text-soft-white px-4 py-2 rounded-lg hover:bg-signal-blue/90 transition-colors"
            >
              <Plus size={20} />
              Add City
            </button>
          )}
        </div>

        {(isCreating || editingCity) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-deep-indigo mb-6">
              {editingCity ? 'Edit City' : 'Create New City'}
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-deep-indigo mb-2">
                    City Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-deep-indigo mb-2">
                      X Position (%) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={formData.x}
                      onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-deep-indigo mb-2">
                      Y Position (%) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={formData.y}
                      onChange={(e) => setFormData({ ...formData, y: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-deep-indigo mb-2">
                  Banner Image URL *
                </label>
                <input
                  type="url"
                  value={formData.banner_image}
                  onChange={(e) => setFormData({ ...formData, banner_image: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-deep-indigo mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                  rows={6}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-deep-indigo mb-2">
                    Ruler *
                  </label>
                  <input
                    type="text"
                    value={formData.ruler}
                    onChange={(e) => setFormData({ ...formData, ruler: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-indigo mb-2">
                    Ideology *
                  </label>
                  <input
                    type="text"
                    value={formData.ideology}
                    onChange={(e) => setFormData({ ...formData, ideology: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-deep-indigo mb-2">
                  Date First Visited (MM/DD/YYYY) *
                </label>
                <input
                  type="text"
                  value={formData.date_first_visited}
                  onChange={(e) => setFormData({ ...formData, date_first_visited: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-gray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-signal-blue"
                  placeholder="01/15/2024"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-signal-blue text-soft-white px-6 py-2 rounded-lg hover:bg-signal-blue/90 transition-colors"
                >
                  <Save size={20} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-slate-gray/20 text-deep-indigo px-6 py-2 rounded-lg hover:bg-slate-gray/30 transition-colors"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {cities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-deep-indigo mb-2">{city.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-gray">
                    <div>
                      <span className="font-semibold">Position:</span> ({city.x}%, {city.y}%)
                    </div>
                    <div>
                      <span className="font-semibold">Ruler:</span> {city.ruler}
                    </div>
                    <div>
                      <span className="font-semibold">Ideology:</span> {city.ideology}
                    </div>
                    <div>
                      <span className="font-semibold">Visited:</span> {city.date_first_visited}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(city)}
                    className="p-2 text-signal-blue hover:bg-signal-blue/10 rounded-lg transition-colors"
                    aria-label="Edit city"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(city.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete city"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cities.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <p className="text-slate-gray text-lg">No cities yet. Add your first city to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityManager;
