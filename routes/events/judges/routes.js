let express = require('express');
let router = express.Router();
let mw = require('../../middleware.js');
let handler = require('./handlers.js');

router.get('/', handler.listJudges);
router.post('/', handler.assignJudge);
router.get('/:judge_id', handler.getJudge);
router.delete('/:judge_id', handler.unassignJudge);

module.exports = router;