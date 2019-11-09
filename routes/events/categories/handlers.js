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

module.exports.getCategory = (req, res) => {
  db.EventCategory.findOne({
    where: {
      id: req.params.event_id,
    },
  }).then((category) => {
    return res.status(200).json(category);
  }).catch((error) => {
    return res.status(500).json({ msg: 'error finding category: ' + error });
  });
}

module.exports.createCategory = (req, res) => {
  db.EventCategory.create({
    name: req.body.name,
    description: req.body.description,
    scale_min: req.body.scale_min,
    scale_max: req.body.scale_max,
    weight: req.body.weight,
    event_id: req.params.event_id,
    event_division_id: req.body.event_division_id,
  }).then((category) => {
    return res.status(201).json(category);
  }).catch((err) => {
    return res.status(500).json({ msg: 'error creating category: ' + error });
  });
}

module.exports.updateCategory = (req, res) => {
  db.EventCategory.update(req.body.category, {
    where: {
      event_id: req.params.event_id,
      owner_user_id: req.user.id,
    }
  }).then((rowsUpdated) => {
    return res.status(200);
  }).catch((error) => {
    return res.status(500).json({ msg: 'error updating category: ' + error });
  });
}

module.exports.deleteCategory = (req, res) => {
  db.EventCategory.destroy({
    where: {
      id: req.params.category_id,
    },
  }).then((rowsUpdated) => {
    return res.status(200);
  }).catch((error) => {
    return res.status(500).json({ msg: 'error deleting category: ' + error });
  });
}