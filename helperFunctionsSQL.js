const { response } = require("express")
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// const getUserId = (user, db) => {

// }

const filterPrice = (arr, min, max) => {
  const newArr = []
  arr.forEach((item) => {
    if (item.price_in_cents >= min && item.price_in_cents <= max) {
      newArr.push(item)
    }
  })
  return newArr
};
exports.filterPrice = filterPrice;

const newListing = (arr) => {
  return db.query(`
  INSERT INTO listings (user_id, title, price_in_cents, description)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
  `, arr)
};
exports.newListing = newListing;

const newListingPhoto = (items) => {
  return db.query(`
  INSERT INTO photos (location, listing_id)
  VALUES ($1, $2)
  RETURNING *;
  `, items)
}
exports.newListingPhoto = newListingPhoto;

// filterFavourite
const favourites = (user) => {
  const values = [user]
  return db.query(`
  SELECT *
  FROM favourites
  JOIN listings ON listings.id = listing_id
  JOIN photos ON listings.id = photos.listing_id
  WHERE favourites.user_id = $1;
  `, values)
}
exports.favourites = favourites;

const addFavourite = (user, listing) => {
  const arr = [user, listing]
  return db.query(`
  INSERT INTO favourites (user_id, listing_id)
  VALUES ($1, $2)
  `, arr)
}
exports.addFavourite = addFavourite;

const checkForFavourite = (user, listing) => {
  const arr = [user, listing]
  return db.query(`
  SELECT *
  FROM favourites
  WHERE user_id = $1 AND listing_id = $2
  `, arr)
}
exports.checkForFavourite= checkForFavourite

const getNewestListing = () => {
  return db.query(`
  SELECT *
  FROM listings
  ORDER BY id DESC
  LIMIT 1
  `)
}

exports.getNewestListing = getNewestListing;

// listings
const listings = () => {
  return db.query(`
  SELECT *
  FROM listings
  JOIN photos ON listings.id = listing_id
  WHERE is_sold = false;
  `)
};
exports.listings = listings

//sold listings
const setListingToSold = (listing) => {
  const query = [listing];

  return db.query (`
  UPDATE listings
    SET is_sold = true
   WHERE listing.id = $1;
  `, query)
};
exports.setListingToSold = setListingToSold;

const checkUser = (id) => {
  const value = [id]
  return db.query(`
  SELECT * FROM users
  JOIN listings ON users.id = user_id
  WHERE user_id = $1;`, value)
}
exports.checkUser = checkUser;

const myListings = (id) => {
  const value = [id];
  return db.query(`
  SELECT * FROM listings
  JOIN photos ON listing_id = listings.id
  WHERE user_id = $1;
  `, value)
}
exports.myListings = myListings

const viewListing = (id) => {
  const value = [id];
  return db.query(`
  SELECT * FROM listings
  JOIN photos ON listing_id = listings.id
  WHERE listings.id = $1`, value)
}
exports.viewListing = viewListing;

const deleteListing = (id) => {
  const value = [id]
  return db.query(`
  DELETE FROM listings
  WHERE id = $1
  `, value)
}
exports.deleteListing = deleteListing;

const getMessages = (seller_id, user_id) => {
  const value = [seller_id, user_id]
  return db.query(`
  SELECT * FROM messages
  JOIN users ON users.id = seller_id
  JOIN listings ON listings.id = listing_id
  WHERE seller_id = $1 OR buyer_id = $2
  `, value)
}
exports.getMessages = getMessages;

const getBuyerInfo = (id) => {
  const arr = [id]
  return db.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, arr)
}
exports.getBuyerInfo = getBuyerInfo;
