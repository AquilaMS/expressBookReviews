const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:'aquila', password:'123456'}];
const SECRET = 'fingerprint_customer'

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
regd_users.post("/login", (req,res) => {
    const username = req.body.username
    const password =req.body.password
   
     if (!password || !username){
         return res.status(401).json({error: 'Need login'})
     } 
   
     if(authenticatedUser(username, password)){
         const token = jwt.sign({
             data: password
         }, 'access', { expiresIn: 60 * 60 })
   
         req.session.authorization = {
           token, username
       }
       return res.status(200).json({message: "Logged"});
     }
     else{
       return res.status(208).json({error: "Invalid Login. Check username and password"});
     }
});

// Add a book review 
regd_users.put("/auth/review/:isbn",  (req, res) => {
    console.log(req.session)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser
