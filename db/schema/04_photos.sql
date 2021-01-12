-- Drop and recreate Photos table

DROP TABLE IF EXISTS photos;

CREATE TABLE photos(
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  location VARCHAR(255) DEFAULT 'media/default.jpg',
  is_cover BOOLEAN DEFAULT FALSE
);
