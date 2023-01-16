/*
REVERTED HERE TO SIMPLE_MAP VERSION OF FILES TO CLEAR SCRIPT FROM OTHER MODULES
*/

// 14.2.4

// console.log to check code
console.log("logic working");
console.log("printing from Polygons")
console.log(ping)


// Alternative:
// This method is useful when we need to add multiple tile layers, or a background image of our map(s), which we will do later in this module.
//let map = L.map("mapid", {
    //center: [
      //40.7, -94.5
    //],
    //zoom: 4
  //});

// 14.5.2
// Add a geojson layer

/* pointToLayer

L.geoJSON(sanFranAirport, {
  // Turn each feature into a function on the map.
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng).bindPopup(`<h3>${feature.properties.name}</h3><hr>
    <h4>${feature.properties.city}, ${feature.properties.country}`)
  }
}).addTo(map);
*/

/* Using onEachFeature

L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup(`<h3>Airport code: ${layer.feature.properties.faa}</h3><hr>
    <h4>Airport name: ${layer.feature.properties.name}`);
  }
}).addTo(map);
*/

// create tile layer

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "streets-v11"
});
// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map); // reference map defined above //comented out for multi-layer

// 14.5.4
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "satellite-streets-v11"
});

// Create a base layer for both maps
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// moved to after creation of baseMaps in 14.5.4
// create map object
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 2,
  layers: [satelliteStreets]
});

L.control.layers(baseMaps).addTo(map);

// 14.5.3
// Load in large data file AFTER creating tile layer to enusre loading the map doesn't get held up
let torontoHoods = "https://raw.githubusercontent.com/russgo1/mapping_earthquakes/main/torontoNeighborhoods.json"

// When loading json from an external source, we have to use the d3 promise thing:

// 14.5.5
// let myStyle = {
//   color: "#ffffa1",
//   weight: 2
// };

d3.json(torontoHoods).then(function(data) {
  console.log(data);
  L.geoJSON(data).addTo(map);
});
