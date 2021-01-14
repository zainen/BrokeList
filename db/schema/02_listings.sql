-- Drop and recreate Listings table

DROP TABLE IF EXISTS listings CASCADE;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'Somebody forgot a title',
  price_in_cents INTEGER NOT NULL DEFAULT 0,
  is_sold BOOLEAN DEFAULT FALSE,
  description TEXT DEFAULT 'Someone is broke and needs money'
);
