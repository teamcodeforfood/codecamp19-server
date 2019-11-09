let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js');
let handler = require('./handlers.js');

router.get('/', handler.listJudges);
router.post('/', handler.assignJudge);
router.delete('/:judge_id', handler.unassignJudge);
router.post('/saveResponse', handler.saveResponse);

module.exports = router;
