var map = L.map('map')

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//get data from mongodb
fetch(`http://localhost:3000/get_places`)
  .then(res => res.json())
  .then(data => {
    if(data.length !== 0){
      var markerArray = [];
      data.map(l => {
        var popupContent = `
          <form action='/create_place' method='POST'>
            <input class='form-control' name="name" type='text' value=${l.name}> 
            <input class='form-control' name="id" type='hidden' value=${l._id}> 
            <input class='form-control' name="lat" type=number value=${l.location.coordinates[0]}> 
            <input class='form-control' name="lng" type=number value=${l.location.coordinates[1]}>
            <button class='btn btn-primary updatebutton' type='submit'>Update place</button>
          </form>`;
        markerArray.push(L.marker(l.location.coordinates).bindPopup(popupContent).openPopup());
      })
      var group = L.featureGroup(markerArray).addTo(map);
      map.fitBounds(group.getBounds());
    }

  })
  .catch(err => {
    console.log("Error in fetch: ", err)
  })

//get data from mongodb
fetch(`http://localhost:3000/get_areas`)
  .then(res => res.json())
  .then(geoJson => {
    //GeoJSON comes in long/lat and leaflet uses lat/long so we need to reverse
    L.polyline(geoJson[0].geometry.coordinates[0].map(i => i.reverse()), {color: 'red', fill: true, fillColor: 'blue'}).addTo(map);
})
.catch(err => {
  console.log("Error in fetch: ", err)
})

function updatePlace(){
  event.preventDefault();
  var body = {
    id: event.target.parentElement.elements.id.value,
    name: event.target.parentElement.elements.name.value,
    lat: event.target.parentElement.elements.lat.value,
    lng: event.target.parentElement.elements.lng.value
  }
  fetch(`http://localhost:3000/update_place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
    })
    .catch(err => {
      console.log("fetch in posts.jsx failed: ", err)
    })
}

function createPlace(){
  event.preventDefault();
  fetch(`http://localhost:3000/create_place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: event.target.parentElement.elements.name.value, 
      lat: event.target.parentElement.elements.lat.value,
      lng: event.target.parentElement.elements.lng.value
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log("fetch in posts.jsx failed: ", err)
    })
}

//Event listeners for popup buttons
document.addEventListener('click', (event) => {
  //TODO close the popup after submitting update/create
  if(event.target.classList.contains('updatebutton')){
    updatePlace();
  }
  if(event.target.classList.contains('createbutton')){
    createPlace();
  }
})

var popup = L.popup();

function onMapClick(e) {
  var popupContent = `
    <h3>Create new place</h3>
    <form action='/create_place' method='POST'>
      <input placeholder='Name' autofocus class='form-control' name="name" type='text'> 
      <input class='form-control mb-1' name='lat' type=number value=${e.latlng.lat}> 
      <input class='form-control mb-1' name='lng' type=number value=${e.latlng.lng}>
      <button class='btn btn-primary createbutton' type='submit'>Create place</button>
    </form>`;
    popup
      .setLatLng(e.latlng)
      .setContent(popupContent)
      .openOn(map);
}

map.on('click', onMapClick);
