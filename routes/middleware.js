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
    const bearerHeader = req.headers['authorization'];
    console.log("header", bearerHeader)
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearerToken = bearerHeader.split(" ")[1];
      // verify and get add user object to the request
      jwt.verify(bearerToken, process.env.SECRET, (error, authData) => {
        if(error) {
          res.status(403);
          res.json({
            msg: "error verifying token: " + error,
          });
          return;
        }
        req.user = authData.user;
        next();
      });

    } else {
      // Forbidden
      res.status(403);
      res.json({
        msg: "Please login first."
      })
    }
  },
}

module.exports = middleware
