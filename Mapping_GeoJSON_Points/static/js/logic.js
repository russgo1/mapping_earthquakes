/*
REVERTED HERE TO SIMPLE_MAP VERSION OF FILES TO CLEAR SCRIPT FROM OTHER MODULES
*/

// 14.2.4

// console.log to check code
console.log("logic working");


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

let sanFranAirport =
{"type":"FeatureCollection","features":[{ // This is where the "feature" starts
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}} // lat and lon reversed so longitude can be X-axis and longitude Y-Axis
]};

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
    id: "outdoors-v12"
});
// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map); // reference map defined above //comented out for multi-layer

// 14.5.4
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer for both maps
let baseMaps = {
  Street: streets,
  Dark: dark
};

// moved to after creation of baseMaps in 14.5.4
// create map object
let map = L.map('mapid', {
  center: [40.7, -94.5],
  zoom: 4,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// 14.5.3
// Load in large data file AFTER creating tile layer to enusre loading the map doesn't get held up
let airportData = "https://raw.githubusercontent.com/russgo1/mapping_earthquakes/Mapping_Single_Points/majorAirports.json"

// When loading json from an external source, we have to use the d3 promise thing:

d3.json(airportData).then(function(data) {
  console.log(data);
  // Create GeoJSON layer with data
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng).bindPopup(`<h3>Airport code: ${feature.properties.faa}</h3><hr>
      <h4>Airport name: ${feature.properties.name}`);
    }
  }).addTo(map);
});

