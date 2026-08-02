# Library-management-system
  
 This is the library management system of users and books

 # routes

 ## /users
   GET: get the list od all users
   POST: create/register new users

# /users/{ID}

GET: get a user by their ID
PUT: to update the ID of user
DELETE: deleting a user by their ID (check the user has still the issued book) && (user has no dues or penalty from any department)

 # /use/subscription-details/{id}
GET: Get a user subscription details by their ID
  >> Date of subscription
  >> Valid till ?
  >> Fine if any ?

## /books
GET: Get all the books in the system
POST: Add new book to the system

# /books/{id}
GET: Get a book by its ID
PUT: update a book by its id
DELETE: Delete a book by its ID

## /books/issued
GET: get all issued books

## /books/issued/withFine
GET: Get all the books with their Fine

## subscription Types

  >>Basic(3 months)
  >>Standard(6 months)
  >>Premium (12 months)

  > >If a user missed the renewal date, then user should be collected with 100
  > > If a user misses his subscription, then user is excepted to pay $100
  > >If a user misses both renewal and subscription, then the collected amount should be $200


## command
npm init
npm i express
npm i nodemon --save-dev
npm run dev

To install node modules and package.lock.json ---- npm i