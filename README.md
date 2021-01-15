BrokeList
=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## The Project
BrokeList is a buying/selling service for you to sell your broken items for a low cost. One man's trash is another man's treasure! And remember, if you ain't broke. don't sell it.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- CookieParser
- Express
- jQuery
- ejs
- morgan
- pg
- chalk
