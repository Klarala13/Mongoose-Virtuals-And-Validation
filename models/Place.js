const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: String,
  validate: {
    isAsync: true,
    validator: function (v, callback) {
      setTimeout(() =>{
        const result = v.length > 3;
        callback(result);
      }, 2000);
    },
    message: 'You must provide more than 3 characters.'
  },
  location: {
    type: {
      type: String, 
      validate: {
        isAsync: true,
        validator: function (v, callback) {
          setTimeout(() =>{
            const result = v.length > 3;
            callback(result);
          }, 2000);
        },
        message: 'You must provide more than 3 characters.'
      },
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

PlaceSchema.virtual("inEurope").get(function(){
  let inEurope = false;
  //console.log('this', this.location.coordinates[0]);
  //console.log('this', this.location.coordinates[1]);
  if("-12.3046875" < this.location.coordinates[0] 
     && this.location.coordinates[0] < "35.17380831799959" 
     && this.location.coordinates[1] > "26.3671875" 
     && this.location.coordinates[1] > "62.103882522897855"){ 
      inEurope = true;
     }
  console.log("inEurope", inEurope);
  return inEurope;
});
module.exports = PlaceSchema;
