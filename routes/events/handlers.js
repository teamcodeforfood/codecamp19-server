let db = require('../../database.js');

module.exports.getEvent = (req, res) => {
  db.Event.findOne({
    where: {
      id: req.params.id,
    },
  }).then((event) => {
    if (event === null) {
      res.status(404).json({msg: 'event with id ' + req.params.id + ' not found'});
      return;
    }
    res.status(200).json(event);
  }).catch((error) => {
    res.status(500).json({msg: 'error finding event: ' + error});
  });
}

module.exports.listEvents = (req, res) => {
  db.Event.findAll({
    order: [['createdAt', 'DESC']],
  }).then((events) => {
    res.status(200).json({events: events});
  }).catch((error) => {
    res.status(500).json({ msg: 'error listing events: ' + error});
  })
}

module.exports.createEvent = (req, res) => {
  db.Event.create({
    name: req.body.name,
    owner_user_id: req.user.id,
    starts_at: req.body.starts_at,
    ends_at: req.body.ends_at,
    website_url: req.body.website_url,
    description: req.body.description,
    logo_url: req.body.logo_url,
    max_team_size: req.body.max_team_size,
    location: req.body.location,
  }).then((event) => {
    res.status(201).json(event);
    return;
  }).catch((error) => {
    res.status(500).json({ msg: 'error creating event: ' + error });
    return;
  });
}

module.exports.listParticipants = (req, res) => {
  db.UserTeamAssignment.findAll({
    where: {
      id: req.params.id,
    },
  }).then((user_ids) => {
    db.User.findAll({
      where: {
        id: user_ids,
      },
    }).then((users) => {
      res.status(200).json({ users: users });
      return;
    }).catch((error) => {
      res.status(500).json({ msg: 'error getting users: ' + error });
      return;
    });
  }).catch((error) => {
    res.status(500).json({ msg: 'error listing participants: ' + error });
    return;
  });
}

module.exports.listTeams = (req, res) => {
  db.Team.findAll({
    where: {
      id: req.params.id,
    },
  }).then((teams) => {
    res.status(200).json({ teams: teams });
    return;
  }).catch((error) => {
    res.status(500).json({ msg: 'error listing teams: ' + error });
    return;
  });
}

// requires admin
module.exports.updateEvent = (req, res) => {
  db.Event.findOne({
    where: {
      id: req.params.id,
      owner_user_id: req.user.id,
    },
  }).then((event) => {
    if (event === null) {
      res.status(403).json({ msg: 'not the owner' });
      return;
    }
    db.Event.update(req.event, {
      where: {
        id: event.id,
      },
    }).then(() => {
      res.status(200);
      return;
    }).catch((error) => {
      res.status(500).json({ msg: 'error updating event: ' + error });
      return;
    })
  }).catch((error) => {
    res.status(500).json({ msg: 'error finding event: ' + error });
    return;
  });
}

module.exports.deleteEvent = (req, res) => {
  db.Event.findOne({
    where: {
      id: req.params.id,
      owner_user_id: req.user.id,
    },
  }).then((event) => {
    if (event === null) {
      res.status(403).json({ msg: 'not the owner' });
      return;
    }
    db.Event.destroy({
      where: {
        id: event.id,
      },
    }).then(() => {
      res.status(200);
      return;
    }).catch((error) => {
      res.status(500).json({ msg: 'error deleting event: ' + error });
      return;
    })
  }).catch((error) => {
    res.status(500).json({ msg: 'error finding event: ' + error });
    return;
  });
}
