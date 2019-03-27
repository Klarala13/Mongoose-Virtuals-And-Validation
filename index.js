const path = require('path');
const bodyParser = require('body-parser');

const express = require('express')
const app = express()

const mongoose = require("mongoose");
mongoose
  .connect( `mongodb://localhost:27017/DCI2_geojson`, { useNewUrlParser: true } )
  .catch(error => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`);
    process.exit(1);
});

const PlaceController = require('./controllers/placecontroller');
const AreaController = require('./controllers/areacontroller');

app.use(express.static('./node_modules'))
app.use(express.static(path.join(__dirname, '/assets')))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
app.get('/get_places', PlaceController.getPlaces)
app.post('/create_place', PlaceController.createPlace)
app.post('/update_place', PlaceController.updatePlace)


app.post('/create_area', AreaController.createArea)
app.get('/get_areas', AreaController.getAreas)
app.listen(3000)

console.log(`#####################################`);
console.log(`Example of GEO data in mongodb`);
console.log(`Checkout the DCI_geojson database`);
console.log(`We seeded two Places and one Area which can be viewed at http://localhost:3000`);
console.log(`You can create new places by clicking on the map, enter a name, submit and refresh the page.`);
console.log(`If you want to create more Areas, checkout mongodb/05geojson/controllers/areacontroller.js:9 how its done while initial seeding`);
