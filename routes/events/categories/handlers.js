let db = require('../../../database.js');

module.exports.getCategories = (req, res) => {
  db.EventCategory.findAll({
    where: {
      event_id: req.body.event_id,
    },
  }).then((categories) => {
    return res.status(200).json({ categories: categories });
  }).catch((error) => {
    return res.status(500).json({ msg: 'error finding categories: ' + error });
  });
}