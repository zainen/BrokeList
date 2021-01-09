-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  username VARCHAR(255) NOT NULL,
=======
>>>>>>> bbc9ba93ff25cc9693c0babf59989ee65e2a4e1b
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
);
