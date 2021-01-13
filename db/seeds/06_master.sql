--Users table seeds

INSERT INTO users (name, email, phone, is_admin)
VALUES ('Johnny', 'johnny@johnny.com', '7807807808', TRUE),
  ('Zainen', 'zainen@zainen.com', '4034034033', TRUE),
  ('Aqil', 'aqil@aqil.com', '5875875877', TRUE),
  ('Martha', 'martha@marha.com', '4164164166', FALSE),
  ('Stewart', 'stewart@stewart.com', '8048048044', FALSE),
  ('Jim', 'jim@stewart.com', '8055048044', FALSE);

--Listings table seeds

INSERT INTO listings (user_id, title, price_in_cents, is_sold, description)
VALUES (1, 'First Listing', 250, FALSE, 'First Listing Description'),
  (1, 'Second Listing', 300, FALSE, 'Second Listing Description'),
  (1, 'Third Listing', 350, FALSE, 'Third Listing Description'),
  (2, 'Fourth Listing', 400, FALSE, 'Fourth Listing Description'),
  (2, 'Fifth Listing', 450, TRUE, 'Fifth Listing Description'),
  (3, 'Sixth Listing', 500, TRUE, 'Sixth Listing Description'),
  (3, 'Seventh Listing', 550, FALSE, 'Seventh Listing Description'),
  (4, 'Eighth Listing', 600, TRUE, 'Eighth Listing Description'),
  (4, 'Ninth Listing', 650, FALSE, 'Ninth Listing Description'),
  (4, 'Tenth Listing', 700, FALSE, 'Tenth Listing Description'),
  (5, 'Eleventh Listing', 750, FALSE, 'Eleventh Listing Description');

--Favourites table seeds

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

--Photos table seeds

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
  (10, TRUE);

--Messages table seeds

INSERT into messages (buyer_id, seller_id, listing_id, message)
VALUES (1,2,4, 'Hey can I buy this?');
INSERT into messages (buyer_id, seller_id, listing_id, message)
VALUES (1,2,4, 'Hey can I buy this?');
INSERT into messages (buyer_id, seller_id, listing_id, message)
VALUES (2,1,4, 'Hey can I buy this?');

