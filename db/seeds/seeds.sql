-- Users table seeds here (Example)
INSERT INTO users (name, email, phone, is_admin)
VALUES ('Johnny', 'johnny@johnny.com', '7807807808', TRUE),
  ('Zainen', 'zainen@zainen.com', '4034034033', TRUE),
  ('Aqil', 'aqil@aqil.com', '5875875877', FALSE),
  ('Martha', 'martha@marha.com', '4164164166', TRUE),
  ('Stewart', 'stewart@stewart.com', '8048048044', FALSE)
  ;

INSERT INTO listings (user_id, title, price_in_cents, is_sold, description)
VALUES (1, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (1, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (1, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (2, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (2, 'Shoe (Used)', 250, TRUE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (2, 'Shoe (Used)', 250, TRUE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (4, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (4, 'Shoe (Used)', 250, TRUE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (4, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.'),
  (4, 'Shoe (Used)', 250, FALSE, 'Shoe for sale. Great condition. Missing the other one, though.')
  ;

INSERT INTO favourites (user_id, listing_id)
VALUES (1, 7),
  (1, 8),
  (2, 7),
  (2, 8),
  (3, 1),
  (3, 2),
  (4, 1),
  (4, 3),
  (5, 1),
  (5, 2),
  (5, 3);

INSERT INTO photos (listing_id, is_cover)
VALUES (1, TRUE),
  (2, TRUE),
  (3, TRUE),
  (4, TRUE),
  (5, TRUE),
  (6, TRUE),
  (7, TRUE),
  (8, TRUE),
  (9, TRUE),
  (10, TRUE)
;
