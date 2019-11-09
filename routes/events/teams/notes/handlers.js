let db = require('../../../../database.js');

module.exports.listNotes = async (req, res) => {
  try {
    const notes = await db.Note.findAll({
      where: {
        team_id: req.params.team_id,
      },
    });
    return res.status(200).json({ notes: notes });
  } catch(error) {
    return res.status(500).json({ msg: 'error listing notes: ' + error });
  }
}

module.exports.getNote = async (req, res) => {
  try {
    const note = await db.Note.findOne({
      where: {
        id: req.params.note_id,
      }
    });
    if (!note) {
      return res.status(404).json({ 
        msg: 'note ' + req.params.note_id + ' does not exist',
      });
    } 
    return res.status(200).json(note);
  } catch(error) {
    return res.status(500).json({ msg: 'error getting note: ' + error });
  }
}

module.exports.createNote = async (req, res) => {
  try {
    const note = await db.Note.findOrCreate({
      where: {
        user_id: req.user.id,
        team_id: req.params.team_id,
      },
      defualts: {
        user_id: req.user.id,
        team_id: req.params.team_id,
        body: req.body.body,
      },
    });
    return res.status(201).json(note);
  } catch(error) {
    return res.status(500).json({ msg: 'error creating note: ' + error });
  }
}

module.exports.updateNote = async (req, res) => {
  try {
    const updated = await db.Note.update(req.body.note, {
      where: {
        id: req.params.note_id,
      },
    });
    return res.status(200).json(updated);
  } catch(error) {
    return res.status(500).json({ msg: 'error updating note: ' + error });
  }
}

module.exports.deleteNote = async (req, res) => {
  try {
    const deleted = await db.Note.destroy({
      where: {
        id: req.params.note_id,
      }
    });
    return res.status(200).json(deleted);
  } catch(error) {
    return res.status(500).json({ msg: 'error deleting note: ' + error });
  }
}