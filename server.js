// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || 'development';
const express    = require('express');
const bodyParser = require('body-parser');
const sass       = require('node-sass-middleware');
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const widgetsRoutes = require('./routes/widgets');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/api/users', usersRoutes(db));
app.use('/api/widgets', widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER GET REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', (req, res) => {

  res.render('main');
});
app.get('/new-listing', (req, res) => {
  res.render('new-listing'); // update with other page
});
app.get('/my-listings', (req, res) => {
  res.render('my-listings'); // update with other page
});
// app.get('/alter-listing', (req, res) => {
//   res.render('new-li'); // update with other page
// });
// OR JUST /:listing_id
app.get('/listing/:listing_id', (req, res) => {
  res.render('listing'); // update with other page
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SERVER POST REQUESTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/', (req, res) => {

// filter
});
// app.post('/login', (req, res) => {

// become user
// })
app.post('/new-post', (req, res) => {

  // new post data -> saved to db

  // after taking the req
  res.redirect('/view-my-listings')
});
app.post('/view-my-listings/:listing_id/delete', (req, res) => {

  //check user_id with listing(user_id)

  // after delete
  res.redirect('/view-my-listings')
});
app.post('/listing/:listing_id', (req, res) => {
  //sql function to select data needed to render page

  //message to user message sent
});

// STRETCH
// app.post('/alter-listing', (req, res) => {

// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER LISTENING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
