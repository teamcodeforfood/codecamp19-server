let express = require('express');
let mw = require('./middleware.js')
let router = express.Router();

router.use(mw.logger);

let users = require('./users/routes.js');
router.use("/users", users);

let teams = require('./teams/routes.js');
router.use("/teams", teams);

module.exports = router;
