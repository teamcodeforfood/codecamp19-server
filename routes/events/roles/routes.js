let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js')
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/:id', handler.getRole);
router.post('/', handler.createRole);
router.patch('/:id', handler.updateRole);
router.delete('/:id', handler.deleteRole);

module.exports = router;
