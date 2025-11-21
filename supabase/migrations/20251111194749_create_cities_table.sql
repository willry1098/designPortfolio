/*
  # Create Cities Table for Interactive Map

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text) - City name
      - `x` (numeric) - X position on map as percentage
      - `y` (numeric) - Y position on map as percentage
      - `banner_image` (text) - URL to city banner image
      - `description` (text) - City description (2-3 paragraphs)
      - `ruler` (text) - Name and title of current leader
      - `ideology` (text) - Political system/governing philosophy
      - `date_first_visited` (text) - Date in MM/DD/YYYY format
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `cities` table
    - Add policy for public read access (anyone can view cities)
    - Add policy for authenticated insert/update/delete (for admin management)
*/

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  x numeric NOT NULL CHECK (x >= 0 AND x <= 100),
  y numeric NOT NULL CHECK (y >= 0 AND y <= 100),
  banner_image text NOT NULL,
  description text NOT NULL,
  ruler text NOT NULL,
  ideology text NOT NULL,
  date_first_visited text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cities"
  ON cities
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert cities"
  ON cities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cities"
  ON cities
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cities"
  ON cities
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS cities_created_at_idx ON cities(created_at DESC);
