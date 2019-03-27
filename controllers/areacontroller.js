const mongoose = require("mongoose");
const areaSchema = require("../models/Area"); 
const Area = mongoose.model("Area", areaSchema); 

(async () => {
  const areas = await Area.find({})
  if(areas.length == 0){
    console.log(`DATABASE SEEDER. No areas in database, lets create some`);
    Area.create({
      name: 'Europe',
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            -12.3046875,
            35.17380831799959
          ],
          [
            26.3671875,
            35.17380831799959
          ],
          [
            26.3671875,
            62.103882522897855
          ],
          [
            -12.3046875,
            62.103882522897855
          ],
          [
            -12.3046875,
            35.17380831799959
          ]
        ]
      }
    })
  }
})()

exports.getAreas = async (req, res) => {
  const areas = await Area.find();
  res.status(200).json(areas);
}
exports.createArea = async (req, res) => {
  var area = await new Area({
    name: req.body.name,
    properties: req.body.loc.properties,
    geometry: {
      type: req.body.loc.type,
      coordinates: req.body.loc.geometry.coordinates
    }
  })
  area.save()
  res.status(200).json(area);
}
exports.updateArea = async (req, res) => {
  const area = await Area.findByIdAndUpdate(req.body.id, req.body);
  res.status(200).json(area);
}
