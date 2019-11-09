let db = require('../../../database.js');

module.exports.getRoles = (req, res) => {
	db.Role.findAll({where: {
		event_id: req.params.event_id
	}}).then((roles) => {
		res.json({
			roles: roles
		});
	}).catch((error) => {
		res.status(500);
		res.json({
			msg: "Could not find roles for the event " + req.params.event_id + ": " + error
		});
	});
}

let rolesString = {
	2: 'admin',
	1: 'judge',
	0: 'participant',
}

module.exports.getRole = async (req, res) => {
	const row = db.Role.findOne({
		where: {
			event_id: req.params.event_id,
			user_id: req.user.id,
		}
	});
	if (!row.level) {
		return res.status(404).json({
			msg: 'could not find user role',
		});
	}

	let role = rolesString[row.level];
	if (!role) {
		return res.status(400).json({
			msg: 'unkown role for user',
		});
	}
	return res.status(200).json(role);
}

let rolesInt = {
	'admin': 2,
	'judge': 1,
	'participant': 0,
}

module.exports.createRole = (req, res) => {
	let level = rolesInt[req.body.level]
	if (!level) {
		return res.status(400).json({ msg: 'invalid role' + level });
	}
	db.Role.create({
		user_id: req.body.user_id,
		event_id: req.body.event_id,
		level: level,
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
		{where: {id: req.params.role_id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating role " + req.params.role_id + ": " + error
    });
	});
}

module.exports.deleteRole = (req, res) => {
	db.Team.destroy({where: {
    id: req.params.rules_id,
  }}).then(() => {
    res.json({
      msg: "Team " + req.params.role_id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting team " + req.params.role_id + ": " + error
    });
  });
}
