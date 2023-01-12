/*
REVERTED HERE TO SIMPLE_MAP VERSION OF FILES TO CLEAR SCRIPT FROM OTHER MODULES
*/

// 14.2.4

// console.log to check code
console.log("logic working");

// create map object
let map = L.map('mapid').setView([37.5, -122.5], 10); // number is zoom level (scale 0-18)
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

L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup(`<h3>Airport code: ${layer.feature.properties.faa}</h3><hr>
    <h4>Airport name: ${layer.feature.properties.name}`);
  }
}).addTo(map);

// create tile layer

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "outdoors-v12"
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); // reference map defined above