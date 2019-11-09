let bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
let db = require('../../database.js');

if (process.env.NODE_ENV == 'dev') {
  require('dotenv').config();
}

let secret = process.env.SECRET;

module.exports.getUser = (req, res) => {
  db.User.findOne({where: {
    id: req.params.user_id,
  }}).then((user) => {
    if(user !== null) {
      res.json({
        user: user,
      });
    } else {
      res.status(404);
      res.json({
        msg: "There is no user with the id of " + req.params.user_id,
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error finding user " + req.params.user_id + ": " + error,
    });
  });
}

module.exports.updateUser = (req, res) => {
  db.User.update(
    {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
    },
    {where: {id: req.params.user_id}},
  ).then((rowsUpdated) => {
    res.json({
      rowsUpdated
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error updating user " + req.params.user_id + ": " + error
    });
  });
}

module.exports.deleteUser = (req, res) => {
  db.User.destroy({where: {
    id: req.params.user_id,
  }}).then(() => {
    res.json({
      msg: "User " + req.params.user_id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting user " + req.params.user_id + ": " + error
    });
  });
}

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
            name: "",
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
      msg: "error finding user " + req.body.email + ": " + error,
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
            // console.log(token);
            if(token == undefined) {
              res.json({
                msg: "Token undefined"
              });
            } else {
              res.json({
                token: token,
              });
            }
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