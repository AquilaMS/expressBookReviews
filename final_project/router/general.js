const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if(!req.params.username) return {error: 'Insert a username'}
  if(!req.params.password) return {error: 'Insert a password'}
  const username = req.params.username
  const ttt = users.find(users.username) 

  return res.status(300).json(ttt);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) { 
  return res.status(200).json({data: books})
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const filtereredBook = books[req.params.isbn]
  return res.status(200).json(filtereredBook);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const booksLength = Object.keys(books).length 
  var filteredByAuthor = []
  for(i=1; i<=booksLength; i++){
    if(books[i].author == req.params.author){
        filteredByAuthor.push(books[i])
    }
  }
  return res.status(200).json(filteredByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const booksLength = Object.keys(books).length 
    var filteredByTitle = []
    for(i=1; i<=booksLength; i++){
      if(books[i].title == req.params.title){
        filteredByTitle.push(books[i])
      }
    }
    return res.status(200).json(filteredByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const filtereredReviews = books[req.params.isbn].reviews
  return res.status(200).json(filtereredReviews);
});

module.exports.general = public_users;
