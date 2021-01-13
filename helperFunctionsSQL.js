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
  VALUES ($1, $2, $3, $4);
  `, arr)
};
exports.newListing = newListing;

const newListingPhoto = (items) => {
  return db.query(`
  INSERT INTO photos (location, listing_id)
  VALUES ($1, $2);
  `, items)
}
exports.newListingPhoto = newListingPhoto;

// filterFavourite
const favourites = (user) => {
  const values = [user]
  db.query(`
  SELECT *
  FROM favourites
  JOIN listings ON listings.id = listing_id
  WHERE favourites.user_id = $1;
  `, values)
}
exports.favourites = favourites;

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
  WHERE user_id = $1`, value)
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

const getMessages = () => {

}
exports.getMessages = getMessages;
