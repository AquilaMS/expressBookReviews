const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  if (!req.body.username) return res.send({ error: 'Insert a username' })
  if (!req.body.password) return res.send({ error: 'Insert a password' })

  const username = req.body.username
  const usersCount = users.filter(item => item.username == username)
  if (usersCount.length >= 1) {
    console.log(req.body)
    return res.send({ error: 'User already registered' })
  }
  const insertedUser = users.push({ username: req.body.username, password: req.body.password })
  return res.status(200).json(insertedUser);
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const allBooks = new Promise((resolve, rejected) => {
    try {
      const data = {data:books}
      resolve(data)
    }
    catch (err) {
      rejected(err)
    }
  })
  allBooks.then((result) => {
    return res.status(200).json(result);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const filtereredBook = new Promise((resolve, rejected) => {
    try {
      const data = books[req.params.isbn]
      resolve(data)
    }
    catch (err) {
      rejected(err)
    }
  })
  filtereredBook.then((result) => {
    return res.status(200).json(result);
  })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const booksByAuthor = new Promise((resolve, rejected) => {
    try {
      const booksLength = Object.keys(books).length
      var filteredByAuthor = []
      for (i = 1; i <= booksLength; i++) {
        if (books[i].author == req.params.author) {
          filteredByAuthor.push(books[i])
        }
      }
      console.log(filteredByAuthor)
      resolve(res.status(200).json(filteredByAuthor))
    }
    catch (err) {
      rejected(err)
    }
  })
  booksByAuthor.then(result => {
    return result
  })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const booksByTitle = new Promise((resolve, rejected) => {
    try {
      const booksLength = Object.keys(books).length
      var filteredByTitle = []
      for (i = 1; i <= booksLength; i++) {
        if (books[i].title == req.params.title) {
          filteredByTitle.push(books[i])
        }
      }
      console.log(filteredByTitle)
      resolve(res.status(200).json(filteredByTitle))
    }
    catch (err) {
      rejected(err)
    }
  })
  booksByTitle.then(result => {
    return result
  })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const reviewByISBN = new Promise((resolve, rejected) => {
    try {
      const filtereredReviews = books[req.params.isbn].reviews
      resolve(res.status(200).json(filtereredReviews))

    }
    catch (err) {
      rejected(err)
    }
  })
  reviewByISBN.then(result => {
    return result
  })
});

module.exports.general = public_users;
