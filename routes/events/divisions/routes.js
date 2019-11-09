let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/:division_id', handler.getDivision);
router.post('/', handler.createDivision);
router.patch('/:division_id', handler.updateDivision);
router.delete('/:division_id', handler.deleteDivision);

module.exports = router;
