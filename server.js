// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || 'development';
const express    = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const helpers = require('./helperFunctionsSQL.js')

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
const usersRoutes = require('./routes/users');
const widgetsRoutes = require('./routes/widgets');
const getListings = require('./routes/listings')
const { response } = require('express');
const { resolveInclude } = require('ejs');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/api/users', usersRoutes(db));
app.use('/api/widgets', widgetsRoutes(db));
app.use('/listings', getListings(db))
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER GET REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// functions write html to then get rendered by get requests

// templateVars.listings = response.rows
app.get('/', (req, res) => {
  //inject html with database
  // helpers.listings()
  const haveCookie = req.cookies.id
  console.log(haveCookie)
  helpers.listings()
  .then(response => {
    let templateVars = {};
    templateVars.listings = response.rows;
    templateVars.cookies = req.cookies;
    console.log(templateVars.cookies)
    res.render('main', templateVars);
  })
});

// add :min&:max
app.get('/filtered', (req, res) => {
  templateVars = {}
  templateVars.cookies = req.cookies.id
  const min = Number(req.query.min) * 100;
  const max = Number(req.query.max) * 100;
  helpers.listings()
  .then (response => {
    templateVars.listings = helpers.filterPrice(response.rows, min, max)
    res.render('main', templateVars)
  })
  //inject html with filtered database
})
app.get('/favourites', (req, res) => {
  const user_id = req.cookies.id;
  templateVars = {}
  templateVars.cookies = user_id;
  helpers.favourites(Number(user_id))
  .then(response => {
    templateVars.listings = response.rows
    res.render('main', templateVars)
  })
})

app.get('/new-listing', (req, res) => {
  templateVars = {}
  templateVars.cookies = req.cookies.id;
  res.render('new-listing', templateVars); // update with other page
});
app.get('/my-listings', (req, res) => {
  templateVars = {}
  const user_id = req.cookies.id
  templateVars.cookies = user_id
  helpers.myListings(user_id)
  .then(response => {
    templateVars.listings = response.rows
    res.render('my-listings', templateVars); // update with other page
  })


});
// app.get('/alter-listing', (req, res) => {
//   res.render('new-li'); // update with other page
// });
// OR JUST /:listing_id
app.get('/listing/:listing_id', (req, res) => {
  templateVars = {}
  templateVars.cookies = req.cookies.id;
  const item_id = req.params.listing_id
  helpers.viewListing(item_id)
  .then(response => {
    const listing = response.rows
    templateVars.listing = listing[0]
    res.render('listing', templateVars); // update with other page
  })
  .catch(err => {
    throw err
  })
});

app.get('/messages' , (req, res) => {
  templateVars = {}
  const user_id = req.cookies.id
  helpers.getMessages(user_id, user_id)
  .then(response => {
    const buyer_id = response.rows[0].buyer_id
    helpers.getBuyerInfo(buyer_id, user_id)
    .then(resp => {
      const buyerInfo = resp.rows[0]
      templateVars.cookies = req.cookies
      templateVars.buyer = buyerInfo
      templateVars.messages = response.rows
      res.render('messages', templateVars)
    })
  })
})

app.get('/sent-message', (req, res) => {
  templateVars.cookies = req.cookies.id
  res.render('sent-message', templateVars)
})

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER POST REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/', (req, res) => {
  const user = req.body.user
  helpers.checkUser(user)
  .then(response => {
    if (!response.rows[0]) {
    return res.status(401).end('Incorrect Username!')
    } else  {
      if (response.rows[0].user_id === Number(user)) {
        res.cookie('id', user)
        req.cookies.user_id = user
        res.redirect('/')

      }
    }
    })
  .catch(err => {
    console.log(err)
  })
// filter
});
app.post('/logout', (req, res) => {
  res.clearCookie('id')
  res.redirect('/')
});

// app.post('/login', (req, res) => {

// become user
// })
app.post('/new-listing', (req, res) => {
  const user = req.cookies.id
  const title = req.body.title
  const price = req.body.price_in_cents
  const description = req.body.description
  const location = req.body.location[0]
  const values = [user, title, price, description];
  helpers.newListing(values)
  .then(response => {
    const new_listing_id = response.rows[0].id
      const photoValues = [location, new_listing_id]
      helpers.newListingPhoto(photoValues)
      .then(res => {
        return res.rows
    })
  })
  // new post data -> saved to db
  res.redirect('/my-listings')
  // after taking the req
});



app.post('/my-listings/:listing_id/sold', (req, res) => {
  //write function change is_sold to true
  const listing = req.params.listing_id;

  helpers.setListingToSold(listing)
  .then(res => console.log(res))
  .catch(err => console.log('err:', err));

  res.redirect('back');
});

app.post('/my-listings/:listing_id/delete', (req, res) => {
  // write function clear listing from db
  const session_user = req.cookies.id
  const listing_id = req.params.listing_id
  helpers.checkUser(session_user)
  .then(response => {
    const listing_user = response.rows[0].user_id
    if (listing_user === session_user || response.rows[0].is_admin) {
      helpers.deleteListing(Number(listing_id))
      .then(response => {
        res.redirect('/my-listings')
      })
    }
  })
});

app.post('/listing/:listing_id', (req, res) => {
  //sql function to select data needed to render page
  if ((req.body.inquiry.trim()).length) {
    const listing_id = req.params.listing_id
    helpers.getListingByListing_id(listing_id)
    .then(response => {
      const message = req.body.inquiry
      const buyer_id = Number(req.cookies.id)
      const seller_id = response.rows[0].user_id
      if (buyer_id === seller_id) {
        res.status(404).end("You already own that... Thats exaclty why you broke foo")
      } else {
        helpers.getMessages(seller_id, buyer_id)
        .then(resp => {
          if (!resp.rows) {
            helpers.messageSeller(buyer_id, seller_id, listing_id, message)
            .then(resp => {
              res.redirect('/sent-message')
            })
          } else {
            res.status(404).end('You already sent a message')
          }
        })
      }
    })

    //have message, buyer_id, listing_id

  } else {
    const listing_id = req.params.listing_id
    res.status(404).end('Please enter a message')
  }
  //message to user message sent

});

app.post('/new-favourite', (req, res) => {
  const user = req.cookies.id
  const listing = req.body.YASS_PLEEZ
  helpers.checkForFavourite(user, listing)
  .then(response => {
    if (!response.rows.length) {
      helpers.addFavourite(user, listing)
      .then(resp => {
        res.redirect('/')
      })
    } else {
      res.redirect('/')
    }
  })
})

// STRECH ADD REMOVE FAVOURITE

// STRETCH
// app.post('/alter-listing', (req, res) => {

// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER LISTENING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
