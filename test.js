require('dotenv').config();
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
console.log(dbParams);
const db = new Pool(dbParams);

db.connect();




db.query(`
  SELECT *
  FROM listings`)
  .then(response => {
    console.log(response.rows);
})
.catch(err => {
  console.log(err);
})
