const { response } = require("express")
const { Pool } = require("pg")

// const getUserId = (user, db) => {

// }

const filterPrice = (min, max) => {
  const values = [min, max]
  return pool.query(`
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
  return pool.query(`
  INSERT INTO listings (user_id, title, price_in_cents, description)
  VALUES ($1, $2, $3, $4);
  INSERT INTO photos (location)
  VALUES ($5)
  `, values)
  .then(response => {
    return response.rows
  })
};
exports.newListing = newListing;

// filterFavourite

