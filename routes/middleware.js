let jwt = require('jsonwebtoken');
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

module.exports = middleware
