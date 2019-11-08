let jwt = require('jsonwebtoken');
let secret = process.env.SECRET;

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
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearerToken = bearerHeader.split(" ")[1];
      // Set token
      req.token = bearerToken;
      next();
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
