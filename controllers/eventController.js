const db = require("../models");

// Defining methods for the articleController
module.exports = {
  findAll: function(req, res) {
    db.Event
      .find(req.query)
      .sort({ date: -1 })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Event
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Event
      .findById({ _id: req.params.id })
      .then(dbEvent => dbEvent.remove())
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  }
};
