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
  (5, 'Eleventh Listing', 750, FALSE, 'Eleventh Listing Description')
  ;
