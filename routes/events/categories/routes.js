let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js');
let handler = require('./handlers.js');

router.get('/', handler.getCategories);
// router.post('/', handler.createCategory);
// router.get('/:id', handler.getCategory);

module.exports = router;