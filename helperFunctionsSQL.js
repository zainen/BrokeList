const { response } = require("express")
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// const getUserId = (user, db) => {

// }

const filterPrice = (min, max) => {
  const values = [min, max]
  return db.query(`
  SELECT *
  FROM listings
  WHERE price > $1
  AND price < $2;
  `, values)
  .then(response => {
    return response.rows
  })
};
exports.filterPrice = filterPrice;

const newListing = (user_id, title, price_in_cents, description, photo) => {

  const values = [user_id, title, price_in_cents, description, photo];
  return db.query(`
  INSERT INTO listings (user_id, title, price_in_cents, description)
  VALUES ($1, $2, $3, $4);
  INSERT INTO photos (location)
  VALUES ($5);
  `, values)
  .then(response => {
    return response.rows
  })
};
exports.newListing = newListing;

// filterFavourite
const favourites = (user) => {
  const values = [user]
  return db.query(`
  SELECT *
  FROM favourites
  JOIN users ON users.id = user_id
  JOIN listings ON listings.id = listing_id
  WHERE user_id = $1;
  `, values)
  .then(response => {
    return response.rows.forEach((item) => {
      // function to write html and
      console.log(item)
    })
  })
}
exports.favourites = favourites;

// listings
const listings = () => {
  return db.query(`
  SELECT *
  FROM listings
  WHERE is_sold = false;
  `)
  .then(response => {
    console.log(response.rows)
  })
};
exports.listings = listings

//sold listings
const soldListings = () => {
  return db.query (`
   SELECT *
   FROM listings
   WHERE is_sold = true;
  `)
  .then(response => {
    return response.rows
  })
};
exports.soldListings = soldListings;

const checkUser = (id) => {
  const values = [id]
  return db.query(`
  SELECT * FROM users WHERE id = $1`, values)
}
exports.checkUser = checkUser;
