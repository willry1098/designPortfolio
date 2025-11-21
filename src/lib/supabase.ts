import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  banner_image: string;
  description: string;
  ruler: string;
  ideology: string;
  date_first_visited: string;
  created_at?: string;
  updated_at?: string;
}

export const citiesService = {
  async getAllCities(): Promise<City[]> {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getCityById(id: string): Promise<City | null> {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createCity(city: Omit<City, 'id' | 'created_at' | 'updated_at'>): Promise<City> {
    const { data, error } = await supabase
      .from('cities')
      .insert([city])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCity(id: string, city: Partial<Omit<City, 'id' | 'created_at' | 'updated_at'>>): Promise<City> {
    const { data, error } = await supabase
      .from('cities')
      .update({ ...city, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('City not found or update failed');
    return data;
  },

  async deleteCity(id: string): Promise<void> {
    const { error } = await supabase
      .from('cities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
