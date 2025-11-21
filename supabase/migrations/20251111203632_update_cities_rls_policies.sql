/*
  # Update Cities RLS Policies

  1. Changes
    - Drop existing restrictive policies that require authentication
    - Add new policies allowing public access for insert, update, and delete operations
    - This is appropriate for a personal portfolio project where city management should be accessible
  
  2. Security
    - Policies now allow anonymous access for all operations
    - RLS remains enabled for future policy refinements if needed
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert cities" ON cities;
DROP POLICY IF EXISTS "Authenticated users can update cities" ON cities;
DROP POLICY IF EXISTS "Authenticated users can delete cities" ON cities;

-- Create new public policies
CREATE POLICY "Anyone can insert cities"
  ON cities
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update cities"
  ON cities
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete cities"
  ON cities
  FOR DELETE
  USING (true);
