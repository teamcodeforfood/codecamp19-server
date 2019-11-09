let jwt = require('jsonwebtoken');
let db = require('../database.js');
require('dotenv').config();

let middleware = {
  logger: (req, res, next) => {
    let now = new Date().toISOString()
    console.log(now, req.method, req.originalUrl, req.body);
    next();
  },

  // Format of token
  // Authorization: Bearer <access_token>
  verifyToken: (req, res, next) => {
    // Get auth header value
    let token = req.headers['authorization'];
    console.log("header", req.headers);

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else {
      return res.json({ msg: 'Auth token is not supplied' });
    }
  },
}

let roles = {
  "admin": 2,
  "judge": 1,
}

middleware.hasPermission = (level) => {
  return (req, res, next) => {
    console.log(req.headers)
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return res.status(403).json({ msg: 'invalid token' });
        } else {
          req.user = decoded.user;
          db.Role.findOne({
            where: {
              event_id: req.params.event_id,
              user_id: req.user.id,
              level: roles[level],
            },
          }).then((role) => {
            if (role) {
              next();
            } else {
              res.status(403).json({ msg: 'no permission' });
              return;
            }
          }).catch((error) => {
            res.status(500).json({ msg: 'error finding role: ' + error });
          });
        }
      });
    } else {
      return res.status(403).json({ msg: 'missing token' });
    }
  }
}

module.exports = middleware
