let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let db = require('../../database.js');

if (process.env.NODE_ENV == 'dev') {
  require('dotenv').config();
}

let secret = process.env.SECRET;

module.exports.register = (req, res) => {
  db.User.findOne({where: {
    email: req.body.email,
  }}).then((user) => {
    if(user === null) {
      bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(req.body.password, salt, function(error, hashed_password) {
          db.User.create({
            email: req.body.email,
            password: hashed_password,
            bio: "",
          }).then((user) => {
            res.status(201);
            res.json({
              user: user
            });
          }).catch((error) => {
            res.status(400);
            res.json({
              msg: error,
            });
          });
        });
      });
    } else {
      res.status(403);
      res.json({
        msg: "Email already in use.",
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Failed to find a user in the database."
    });
  });
}

module.exports.authenticate = (req, res) => {
  db.User.findOne({where: {
    email: req.body.email,
  }}).then((user) => {
    if(user !== null) {
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if(isMatch) {
          jwt.sign({user: user}, secret, {expiresIn: '24h'}, (error, token) => {
            console.log(token);
            res.json({
              token: token,
            });
          });
        } else {
          res.status(403);
          res.json({
            msg: "Wrong username or password."
          });
        }
      });
    } else {
      res.status(403);
      res.json({
        msg: "Wrong username or password."
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Failed to find a user in the database."
    });
  });
}

module.exports.checkAuthentication = (req, res) => {
  jwt.verify(req.token, secret, (error, authData) => {
    if(error) {
      res.status(403);
      res.json({
        msg: "Could not get user data."
      });
    } else {
      res.json({
        msg: "I got in.",
        authData,
      });
    }
  });
}
