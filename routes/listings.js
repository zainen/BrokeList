
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //get requests to /listings
  router.get("/", (req, res) => {
    //inject html with database
  // helpers.listings()
    const listings = () => {
        return db.query(`
        SELECT *
        FROM listings
        JOIN photos ON listing_id = listings.id;`)
        .then(response => {
        let templateVars = {};
        templateVars.listings = response.rows;
        res.render('main', templateVars);
        })
    }
    listings();
  });

  //posts requests to /listings
  router.post("/", (req, res) => {
    //inject html with database
  // helpers.listings()
    const listings = () => {
        return db.query(`
        SELECT *
        FROM listings
        JOIN photos ON listing_id = listings.id;`)
        .then(response => {
        let templateVars = {};
        templateVars.listings = response.rows;
        res.render('main', templateVars);
        })
    }
    listings();
  });

    //get requests to /listings/:id
    router.get("/listings/:id", (req, res) => {
        //inject html with database
      // helpers.listings()
        const listings = () => {
            return db.query(`
            SELECT *
            FROM listings
            JOIN photos ON listing_id = listings.id;`)
            .then(response => {
            let templateVars = {};
            templateVars.listings = response.rows;
            res.render('main', templateVars);
            })
        }
        listings();
      });


  return router;
};
