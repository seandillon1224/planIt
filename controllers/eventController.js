// const Events = require("mongoose").model("Events")
const Events = require("../models/events");
const User = require("../models/user");

// Defining methods for the articleController
module.exports = {
  findAll: function(req, res) {
    Events
      .find(req.query)
      .sort({ date: -1 })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));

    // res.json({
    //   track: 'events'
    // });
  },
  findById: function(req, res) {
    console.log(req.params.id)
    Events
      .find({creator: req.params.id})
      .populate('creator')
      .populate('guests.guest')
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findByGuestId: function(req, res) {
    Events
      .find({"guests.guest": req.params.id})
      .populate('creator')
      .populate('guests.guest')
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
 
    User.findOne({name: req.body.creator}, (err, user) => {
      if (err) throw new Error(err);
      // We create an object containing the data from our post request
      const newPost = {
        event: req.body.event,
        description: req.body.description,
        guests: req.body.guests,
        dates: req.body.dates,
        // in the author field we add our current user id yas a reference
        creator: user._id
      };
      console.log(newPost)
      Events.create(newPost)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

      console.log(newPost)

      
   });
    // Events
    //   .create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Events
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Events
      .findById({ _id: req.params.id })
      .then(dbEvent => dbEvent.remove())
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  }
};
