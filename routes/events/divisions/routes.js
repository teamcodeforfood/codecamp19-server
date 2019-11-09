let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/:id', handler.getDivision);
router.post('/', handler.createDivision);
router.patch('/:id', handler.updateDivision);
router.delete('/:id', handler.deleteDivision);

module.exports = router;
