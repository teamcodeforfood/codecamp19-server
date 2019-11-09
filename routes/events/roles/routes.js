let express = require('express');
let router = express.Router({ mergeParams: true });
let mw = require('../../middleware.js');
let handler = require('./handlers.js');

router.use(mw.verifyToken);

router.get('/', handler.getRole);
router.get('/:role_id', handler.getRole);
router.post('/', handler.createRole);
router.patch('/:role_id', handler.updateRole);
router.delete('/:role_id', handler.deleteRole);

module.exports = router;
