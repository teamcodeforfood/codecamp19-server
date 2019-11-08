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
  })
}

module.exports.createEvent = (req, res) => {
  console.log(req.token);
  // db.Event.create({
  //   name: req.body.name,

  // })
}