let db = require('../../../database.js');

module.exports.getDivisions = (req, res) => {
	db.EventDivision.findAll({where: {
		event_id: req.params.event_id
	}}).then((divisions) => {
		res.json({
			divisions: divisions
		});
	}).catch((error) => {
		res.status(500);
		res.json({
			msg: "Could not find divisions for the event " + req.params.event_id + ": " + error
		});
	});
}

module.exports.getDivision = (req, res) => {
	db.EventDivision.findOne({where: {
    id: req.params.division_id,
  }}).then((division) => {
    if(division !== null) {
      res.json({
        division: division,
      });
    } else {
      res.status(404);
      res.json({
        msg: "There is no division with the id of " + req.params.division_id,
      });
    }
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error finding division " + req.params.division_id + ": " + error,
    });
  });
}

module.exports.createDivision = (req, res) => {
	db.EventDivision.create({
		name: req.body.name,
		description: req.body.description,
		event_id: req.body.event_id,
	}).then((division) => {
		res.status(201);
		res.json({
			division: division,
		});
	}).catch((error) => {
		res.status(422);
		res.json({
			msg: "Failed to create new division: " + error
		});
	});
}

module.exports.updateDivision = (req, res) => {
	db.EventDivision.update(
		{
			name: req.body.name,
      description: req.body.description,
      event_id: req.body.event_id,
		},
		{where: {id: req.params.division_id}},
	).then((rowsUpdated) => {
		res.json({
			rowsUpdated
		});
	}).catch((error) => {
		res.status(500);
    res.json({
      msg: "Error updating division " + req.params.division_id + ": " + error
    });
	});
}

module.exports.deleteDivision = (req, res) => {
	db.EventDivision.destroy({where: {
    id: req.params.division_id,
  }}).then(() => {
    res.json({
      msg: "Division " + req.params.division_id + " deleted."
    });
  }).catch((error) => {
    res.status(500);
    res.json({
      msg: "Error deleting division " + req.params.division_id + ": " + error
    });
  });
}
