let db = require('../../../database.js');

module.exports.getRole = (req, res) => {
	db.Role.findOne({where: {
    id: req.params.id,
  }}).then((role) => {
    if(role !== null) {
      res.json({
        role: role,
      });
    } else {
      res.status(404);
      res.json({
        msg: "There is no role with the id of " + req.params.id,
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error finding role " + req.params.id + ": " + error,
    });
  });
}

module.exports.createRole = (req, res) => {
	db.Role.create({
		user_id: req.body.user_id,
		event_id: req.body.event_id,
		level: req.body.level,
	}).then((role) => {
		res.status(201);
		res.json({
			role: role,
		});
	}).catch((error) => {
		res.status(422);
		res.json({
			msg: "Failed to create new role: " + error
		});
	});
}

module.exports.updateRole = (req, res) => {
	db.Role.update(
		{
			user_id: req.body.user_id,
			event_id: req.body.event_id,
			level: req.body.level,
		},
		{where: {id: req.params.id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating role " + req.params.id + ": " + error
    });
	});
}

module.exports.deleteRole = (req, res) => {
	db.Team.destroy({where: {
    id: req.params.id,
  }}).then(() => {
    res.json({
      msg: "Team " + req.params.id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting team " + req.params.id + ": " + error
    });
  });
}
