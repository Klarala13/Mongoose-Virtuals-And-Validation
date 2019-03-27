const mongoose = require("mongoose");
const placeSchema = require("../models/Place"); 
const Place = mongoose.model("Place", placeSchema); 

(async () => {
  const places = await Place.find({})
  if(places.length == 0){
    console.log(`DATABASE SEEDER. No places in database, lets create some`);
    Place.create({
      name: "Old DCI location",
      location: {
        type: "Point",
        coordinates: [ 52.42199734521927, 13.525030017608515 ]
        
      }
    })
    Place.create({
      name: "New DCI location",
      location: {
        type: "Point",
        coordinates: [ 52.52376543859652, 13.486121892492523 ]
        
      }
    })
  }

})()
exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  places.map(place => console.log("place.inEurope", place.inEurope))
  res.status(200).json(places);
}

exports.createPlace = async (req, res) => {
  const place = new Place({
    name: req.body.name,
    location: {
      type: 'Point', 
      "coordinates": [
        56.25,
        56.75272287205736
      ]
    }
  })
  place.save()
  res.status(200).json(place);
}
exports.updatePlace = async (req, res) => {
  const place = await Place.findByIdAndUpdate(req.body.id, req.body);
  res.status(200).json(place);

}
