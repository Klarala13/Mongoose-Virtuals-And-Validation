const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  created: { 
    type: Date, 
    default: Date.now
  }
  // TODO create a virtual field which returns true or false if the place is in Europe
  // https://futurestud.io/tutorials/understanding-virtuals-in-mongoose
});

module.exports = PlaceSchema;
