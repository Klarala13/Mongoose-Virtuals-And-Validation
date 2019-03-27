const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
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
});

module.exports = holidaySchema;
