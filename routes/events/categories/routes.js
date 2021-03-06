let express = require('express');
let router = express.Router({ mergeParams: true });
let mw = require('../../middleware.js');
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/', handler.getCategories);
router.post('/', handler.createCategory);
router.get('/:category_id', handler.getCategory);
router.patch('/:category_id', handler.updateCategory);
router.delete('/:category_id', handler.deleteCategory);

module.exports = router;