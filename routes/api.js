let express = require('express');
let mw = require('./middleware.js');
let router = express.Router();

router.use(mw.logger);

let users = require('./users/routes.js');
router.use("/users", users);
let events = require('./events/routes.js');
router.use("/events", events);
let teams = require('./teams/routes.js');
router.use("/teams", teams);

let roles = require('./roles/routes.js');
router.use("/roles", roles);

module.exports = router;
