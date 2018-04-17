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
  },
  findByName: function(req, res) {
    let name=req.params.name;
    User
      .find({"name": { $regex: new RegExp("^" + name.toLowerCase(), "i") }})
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.status(422).json(err));
  }


};
