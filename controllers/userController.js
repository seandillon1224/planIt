const User = require("../models/user");

// Defining methods for the articleController
module.exports = {
  findAll: function(req, res) {
    User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));

    
    // res.json({
    //   track: 'track'
    // });
  }
};
