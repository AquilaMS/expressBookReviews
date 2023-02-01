const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:'aquila', password:'123456'}];
const SECRET = 'supersecret'

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const checkUser = users.filter(item=>item.username == username && item.password == password)
    if(checkUser.length ==1 ){
        return true
    }
    return false
}

//only registered users can login
regd_users.post("/", (req,res) => {
  //Write your code here
  if(authenticatedUser(req.body.username, req.body.password)){
    return res.send({
        token: jwt.sign({username: req.body.username}, SECRET)
    })
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn",  (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.regd_users = regd_users; 
