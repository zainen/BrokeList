const { response } = require("express");
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


const addFavourite = (user, listing) => {
  const arr = [user, listing];
  return db.query(`
  INSERT INTO favourites (user_id, listing_id)
  VALUES ($1, $2);
  `, arr);
};
exports.addFavourite = addFavourite;


const checkForFavourite = (user, listing) => {
  const arr = [user, listing];
  return db.query(`
  SELECT *
  FROM favourites
  WHERE user_id = $1 AND listing_id = $2;
  `, arr);
};
exports.checkForFavourite = checkForFavourite;

const checkUser = (id) => {
  const value = [id];
  return db.query(`
  SELECT * FROM users
  JOIN listings ON users.id = user_id
  WHERE user_id = $1;`, value);
};
exports.checkUser = checkUser;

const deleteListing = (id) => {
  const value = [id];
  return db.query(`
  DELETE FROM listings
  WHERE id = $1;
  `, value);
};
exports.deleteListing = deleteListing;

const favourites = (user) => {
  const values = [user];
  return db.query(`
  SELECT *
  FROM favourites
  JOIN listings ON listings.id = listing_id
  JOIN photos ON listings.id = photos.listing_id
  WHERE favourites.user_id = $1 AND is_sold = false;
  `, values);
};
exports.favourites = favourites;

const filterPrice = (arr, min, max) => {
  const newArr = [];
  arr.forEach((item) => {
    if (item.price_in_cents >= min && item.price_in_cents <= max) {
      newArr.push(item);
    }
  });
  return newArr;
};
exports.filterPrice = filterPrice;

const getBuyerInfo = (id) => {
  const arr = [id];
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, arr);
};
exports.getBuyerInfo = getBuyerInfo;

const getMessages = (seller_id) => {
  const value = [seller_id];
  return db.query(`
  SELECT * FROM messages
  JOIN users ON users.id = seller_id
  JOIN listings ON listings.id = listing_id
  WHERE seller_id = $1 OR buyer_id = $1;
  `, value);
};
exports.getMessages = getMessages;

const getParticularMessage = (seller_id, user_id, listing_id) => {
  const arr = [seller_id, user_id, Number(listing_id)];
  return db.query(`
  SELECT * FROM messages
  JOIN users ON users.id = seller_id
  JOIN listings ON listings.id = listing_id
  WHERE seller_id = $1 AND buyer_id = $2 AND listing_id = $3;
  `, arr);
};

exports.getParticularMessage = getParticularMessage;

const getListingByListing_id = (id) => {
  const arr = [id];
  return db.query(`
  SELECT *
  FROM listings
  JOIN users ON users.id = user_id
  WHERE listings.id = $1;
  `, arr);
};
exports.getListingByListing_id = getListingByListing_id;


const listings = () => {
  return db.query(`
  SELECT *
  FROM listings
  JOIN photos ON listings.id = listing_id
  WHERE is_sold = false
  ORDER BY listing_id DESC;
  `);
};
exports.listings = listings;


const messageSeller = (buyer_id, seller_id, listing_id, message) => {
  const newArr = [buyer_id, seller_id, listing_id, message];
  return db.query(`
  INSERT INTO messages (buyer_id, seller_id, listing_id, message)
  VALUES ($1, $2, $3, $4);
  `, newArr);
};
exports.messageSeller = messageSeller;


const myListings = () => {
  return db.query(`
  SELECT * FROM listings
  JOIN photos ON listing_id = listings.id
  ORDER BY listing_id DESC;
  `);
};
exports.myListings = myListings;


const newListing = (arr) => {
  return db.query(`
  INSERT INTO listings (user_id, title, price_in_cents, description)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
  `, arr);
};
exports.newListing = newListing;


const newListingPhoto = (items) => {
  return db.query(`
  INSERT INTO photos (location, listing_id)
  VALUES ($1, $2)
  RETURNING *;
  `, items);
};
exports.newListingPhoto = newListingPhoto;


const setListingToSold = (listing) => {
  const query = [listing];
  return db.query(`
  UPDATE listings
    SET is_sold = true
    WHERE listings.id = $1;
  `, query);
};
exports.setListingToSold = setListingToSold;


const viewListing = (id) => {
  const value = [id];
  return db.query(`
  SELECT * FROM listings
  JOIN photos ON listing_id = listings.id
  WHERE listings.id = $1`, value);
};
exports.viewListing = viewListing;







