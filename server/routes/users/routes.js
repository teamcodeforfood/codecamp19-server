let express = require('express');
let router = express.Router();
let handler = require('./handlers.js');

router.get('/', handler.listUsers);
router.post('/', handler.createUser);

module.exports = router;
