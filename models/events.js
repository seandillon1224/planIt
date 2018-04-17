
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var EventsSchema = new Schema({
  // `name` must be of type String
  // `name` must be unique, the default mongoose error message is thrown if a duplicate value is given
  event: {
    type: String
  },
  description: {
    type: String
  },
  creator:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dates: [{
    type: String
  }],
  
  guests: [
    {
      type: String
    }
    
  ]
});

// This creates our model from the above schema, using mongoose's model method
module.exports = mongoose.model("Events", EventsSchema);


// Export the Event model
// module.exports = Events;
