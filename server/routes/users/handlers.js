let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');

if (process.env.NODE_ENV == 'dev') {
  require('dotenv').config();
}

let secret = process.env.SECRET;

var gUser = {
  email: "admin",
  password: "password",
};

module.exports.register = (req, res) => {
  // TODO: see if user already exists in database

  bcrypt.genSalt(10, function(error, salt) {
    bcrypt.hash(req.body.password, salt, function(error, hashed_password) {
      var user = {
        email: req.body.email,
        password: hashed_password
      };

      // TODO: actually save the user
      gUser = user;

      res.status(201);
      res.json({
        user: user
      });
    });
  });
}

module.exports.authenticate = (req, res) => {
  // TODO: pull user from database and authenticate passwords first to get user
  // Mock user
  var user = {
    email: "mock admin",
    password: "mock password",
  };

  jwt.sign({user: user}, secret, {expiresIn: '24h'}, (error, token) => {
    console.log(token);
    res.json({
      token: token,
    });
  });
}

module.exports.checkAuthentication = (req, res) => {
  jwt.verify(req.token, secret, (error, authData) => {
    if(error) {
      res.status(403);
      res.json({
        msg: "No token"
      });
    } else {
      res.json({
        msg: "I got in.",
        authData,
      });
    }
  });

}
