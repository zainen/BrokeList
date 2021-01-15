// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || 'development'; // not used
const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const helpers = require('./helperFunctionsSQL.js');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own


// ~~~~~~~~~~~~~~ STRECH ADD ROUTES ~~~~~~~~~~~~~~
// const getListings = require('./routes/listings');
// const mainPage = require('./routes/mainPage');
// const listingPage = require('./routes/listing');
// const messagesPage = require('./routes/messages');
// const myListingsPage = require('./routes/myListings');
// const newListingPage = require('./routes/newListing');
// const sentPage = require('./routes/sent-messages');


// ~~~~~~~~~~~~~~ STRETCH ADD USE OF ROUTES ~~~~~~~~~~~~~~


// app.use('/new-listing')
// app.use('/my-listings')
// app.use('/listing')
// app.use('/messages')
// app.use('/new-message')
// app.use('**')


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER GET REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/', (req, res) => {
  return helpers.listings()
    .then(response => {
      let templateVars = {};
      templateVars.listings = response.rows;
      templateVars.cookies = req.cookies;
      return res.render('main', templateVars);
    })
    .catch(err => {
      return err;
    });
});

// add :min&:max
app.get('/filtered', (req, res) => {
  templateVars = {};
  templateVars.cookies = req.cookies;
  const min = req.query.min;
  const max = req.query.max;
  const numMax = isNaN(Number(max)) || max === '' ? Infinity : Number(max) * 100;
  const numMin = isNaN(Number(min)) || min === '' ? 0 : Number(min) * 100;
  return helpers.listings()
    .then(response => {
      templateVars.listings = helpers.filterPrice(response.rows, numMin, numMax);
      res.render('main', templateVars);
    })
    .catch(err => {
      return err;
    });
});

app.get('/favourites', (req, res) => {
  const user_id = req.cookies.id;
  templateVars = {};
  templateVars.cookies = req.cookies;
  if (!user_id) {
    return res.status(404).end("Please login to see favourites");
  }

  return helpers.favourites(Number(user_id))
    .then(response => {
      templateVars.listings = response.rows;
      return res.render('main', templateVars);
    })
    .catch(err => {
      return err;
    });
});

app.get('/new-listing', (req, res) => {
  templateVars = {};
  templateVars.cookies = req.cookies;
  return res.render('new-listing', templateVars);
});

app.get('/my-listings', (req, res) => {
  templateVars = {};
  const user_id = req.cookies.id;
  templateVars.cookies = req.cookies;
  return helpers.myListings(user_id)
    .then(response => {
      templateVars.listings = response.rows;
      return res.render('my-listings', templateVars);
    })
    .catch(err => {
      return err;
    });
});

app.get('/listing/:listing_id', (req, res) => {
  templateVars = {};
  templateVars.cookies = req.cookies;
  const item_id = req.params.listing_id;
  return helpers.viewListing(item_id)
    .then(response => {
      const listing = response.rows[0];
      if (listing) {
        templateVars.listing = listing;
        return res.render('listing', templateVars); // update with other page
      } else {
        return res.redirect('/');
      }
    })
    .catch(err => {
      return err;
    });
});

app.get('/messages' , (req, res) => {
  templateVars = {};
  const user_id = req.cookies.id;
  helpers.getMessages(user_id)
    .then(response => {
      const buyer_id = user_id ? response.rows[0].buyer_id : 0;
      return helpers.getBuyerInfo(buyer_id, user_id)
        .then(resp => {
          const buyerInfo = resp.rows[0];
          templateVars.cookies = req.cookies;
          templateVars.buyer = buyerInfo;
          templateVars.messages = response.rows;
          return res.render('messages', templateVars);
        })
        .catch(err => {
          return err;
        });
    })
    .catch(err => {
      return err;
    });
});

app.get('/sent-message', (req, res) => {
  templateVars.cookies = req.cookies.id;
  res.render('sent-message', templateVars);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER POST REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/', (req, res) => {
  const user = req.body.user;
  helpers.checkUser(user)
    .then(response => {
      if (!response.rows[0]) {
        return res.status(401).end('Incorrect Username!');
      } else  {
        if (response.rows[0].user_id === Number(user)) {
          const is_admin = !!response.rows[0].is_admin;
          res.cookie('is_admin', is_admin);
          res.cookie('id', user);
          req.cookies.user_id = user;
          res.redirect('/');
        }
      }
    })
    .catch(err => {
      return err;
    });
});

app.post('/logout', (req, res) => {
  res.clearCookie('id');
  res.clearCookie('is_admin');
  res.redirect('/');
});

app.post('/new-listing', (req, res) => {
  const user = req.cookies.id;
  const title = req.body.title ? req.body.title : 'Somebody forgot a title';
  const price = Number(req.body.price_in_cents) * 100 ? Number(req.body.price_in_cents) * 100 : 0;
  const description = req.body.description ? req.body.description : 'Someone is broke and needs money... Maybe you should message them and check how they are doing.';
  const location = req.body.location ? req.body.location : '../media/default.jpg';
  const values = [user, title, price, description];
  if (!req.cookies.id) {
    return res.status(404).end('Please login to post');
  } else {
    return helpers.newListing(values)
      .then(response => {
        const new_listing_id = response.rows[0].id;
        const photoValues = [location, new_listing_id];
        helpers.newListingPhoto(photoValues)
          .then(() => {
            return res.redirect('/my-listings');
          })
          .catch(err => {
            return err;
          });
      })
      .catch(err => {
        return err;
      });
  }
});



app.post('/my-listings/:listing_id/sold', (req, res) => {
  const listing = req.params.listing_id;
  return helpers.setListingToSold(listing)
    .then(() => {
      return res.redirect('back');
    })
    .catch(err => {
      return err;
    });
});

app.post('/my-listings/:listing_id/delete', (req, res) => {
  const session_user = Number(req.cookies.id);
  const listing_id = req.params.listing_id;
  return helpers.checkUser(session_user)
    .then(response => {
      const listing_user = Number(response.rows[0].user_id);
      if (listing_user === session_user || response.rows[0].is_admin) {
        return helpers.deleteListing(Number(listing_id))
          .then(() => {
            return res.redirect('/my-listings');
          })
          .catch(err => {
            return err;
          });
      }
    })
    .catch(err => {
      return err;
    });
});

app.post('/listing/:listing_id', (req, res) => {
  if ((req.body.inquiry.trim()).length) {
    const listing_id = req.params.listing_id;
    return helpers.getListingByListing_id(listing_id)
      .then(response => {
        const message = req.body.inquiry;
        const buyer_id = Number(req.cookies.id);
        const seller_id = response.rows[0].user_id;
        if (!buyer_id) {
          return res.status(404).end("Please login to message the seller");
        } else {
          if (buyer_id === seller_id) {
            return res.status(404).end("You already own that... Thats exaclty why you broke foo");
          } else if (!buyer_id) {
            return res.status(404).end("Please login to send a message");
          } else {
            return helpers.getParticularMessage(seller_id, buyer_id, listing_id)
              .then(resp => {
                const messages = resp.rows; // check why not used
                if (!resp.rows.length) {
                  return helpers.messageSeller(buyer_id, seller_id, listing_id, message)
                    .then(() => {
                      return res.redirect('/sent-message');
                    })
                    .catch(err => {
                      return err;
                    });
                } else {
                  return res.status(404).end('You already sent a message');
                }
              })
              .catch(err => {
                return err;
              });
          }
        }
      })
      .catch(err => {
        return err;
      });
  } else {
    return res.status(404).end('Please enter a message');
  }
});

app.post('/new-favourite', (req, res) => {
  const user = req.cookies.id;
  if (!user) {
    return res.status(404).end("Please login tofavourites or we cant keep your favourites");

  }
  const listing = req.body.YASS_PLEEZ;
  return helpers.checkForFavourite(user, listing)
    .then(response => {
      if (!response.rows.length) {
        return helpers.addFavourite(user, listing)
          .then(() => {
            return res.redirect('/');
          })
          .catch(err => {
            return err;
          });
      } else {
        return res.redirect('/');
      }
    })
    .catch(err => {
      return err;
    });
});

// STRECH ADD REMOVE FAVOURITE

// STRETCH
// app.post('/alter-listing', (req, res) => {

// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER LISTENING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
