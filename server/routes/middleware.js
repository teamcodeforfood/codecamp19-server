let middleware = {
  logger: (req, res, next) => {
    let now = new Date().toISOString()
    console.log(now, req.method, req.originalUrl, req.body);
    next();
  }
}

module.exports = middleware
