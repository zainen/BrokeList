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
VALUES (1, 'Spoon (Rat included)', 75, FALSE, 'One of my spoons started growing a rat. I dont want it anymore'),
  (1, 'Desk Built for Gaming', 430, FALSE, 'Missing a leg but can be held up with a speaker or something. This baby got me to 10th prestige in MW2.'),
  (1, 'Keyboard (Extra Loud w/ RGB', 300, FALSE, 'Assert your dominance in every Zoom Meeting by making sure everyone hears each keypress you make. Purchased for $250, willing to sell for $3. Serious offers only.'),
  (2, 'Half-Eaten Burrito', 400, FALSE, 'Ate half but then was not hungry anymore. Good condition, clean bite marks.'),
  (2, 'Samsung Touchscreen Phone', 450, TRUE, 'As you can see it is destroyed, but some parts should still work.'),
  (3, 'Banana Slicer', 500, TRUE, 'WARNING: Only use on bananas'),
  (3, 'Bagpipes', 550, FALSE, '1960s Hendersons. They work but I do not know how to use them.'),
  (4, 'iPhone Lightning Connector', 600, TRUE, 'The rest of the cable is missing, but the connector is in excellent condiiton.'),
  (4, 'Left Shoe (Used-Good Condition)', 650, FALSE, 'Selling my left shoe. Not sure where the right one is. Serious offers only.'),
  (4, 'Toilet Paper Holder (with Bluetooth Speaker', 700, FALSE, 'Great to fix the ambience in your bathroom'),

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

INSERT INTO photos (listing_id, location, is_cover)
VALUES (1, 'https://cdn.discordapp.com/attachments/797325001333276683/799436239346466856/image0.png', TRUE),
  (2, 'https://www.lefurniturerepair.com/wp-content/uploads/2014/10/fix-broken-table-300x235.jpg', TRUE),
  (3, 'https://media.discordapp.net/attachments/797325001333276683/799434105569017856/20210114_162354.jpg?width=620&height=827', TRUE),
  (4, 'https://i.imgur.com/OLvZdPi.jpg', TRUE),
  (5, 'https://external-preview.redd.it/6-G3r-jsyFuo9htNBw0AfcJ437vaILFAsMBbb8FjI2c.jpg?width=960&crop=smart&auto=webp&s=dd5d95ebe3a53bbb10623d4a153202cbcb232921', TRUE),
  (6, 'https://www.stayathomemum.com.au/cache/860x380-0/wp-content/uploads/2013/10/banana-slicer-2-e1447818918330.jpg', TRUE),
  (7, 'https://media.discordapp.net/attachments/797325001333276683/799433577968041994/20210107_183556.jpg', TRUE),
  (8, 'https://zdnet3.cbsistatic.com/hub/i/r/2019/02/04/50d7043e-ceec-4606-a770-11406c300fa6/resize/470xauto/08674cf52c05c114db462119c85d07c8/img-0935-2.jpg', TRUE),
  (9, 'https://i.imgur.com/Al2GXPd.jpeg', TRUE);

--Messages table seeds

INSERT into messages (buyer_id, seller_id, listing_id, message)
VALUES (1,2,4, 'Hey can I buy this?'),
 (1,2,5, 'Can I purchase just the battery?'),
 (2,1,1, 'Is the rat male or female? Asking for a friend.'),
 (3,4,9, 'How fast can I run in this?');


