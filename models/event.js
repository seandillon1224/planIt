
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var EventSchema = new Schema({
  // `name` must be of type String
  // `name` must be unique, the default mongoose error message is thrown if a duplicate value is given
  event: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  creator:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dates: {
    type: String
  },
  
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      dates:"string"
    }
    
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Event = mongoose.model("Event", EventSchema);

// Export the Event model
module.exports = Event;
