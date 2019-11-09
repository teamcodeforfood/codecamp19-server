let express = require('express');
let mw = require('../../../middleware.js');
let router = express.Router({ mergeParams: true });
let handler = require('./handlers.js');

router.get('/', mw.hasPermission("admin"), handler.listNotes);
router.post('/', mw.hasPermission("judge"), handler.createNote);
router.get('/:note_id', mw.hasPermission("judge"), handler.getNote);
router.patch('/:note_id', mw.hasPermission("judge"), handler.updateNote);
router.delete('/:note_id', mw.hasPermission("judge"), handler.deleteNote);

module.exports = router;