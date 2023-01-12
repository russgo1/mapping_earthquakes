// 14.2.4

// console.log to check code
console.log("logic working");

// create map object
let map = L.map('mapid').setView([34.0522, -118.2437], 4); // 14 is zoom level (scale 0-18)
// Alternative:
// This method is useful when we need to add multiple tile layers, or a background image of our map(s), which we will do later in this module.
//let map = L.map("mapid", {
    //center: [
      //40.7, -94.5
    //],
    //zoom: 4
  //});





// 14.4.1
// Add marker
/*
var marker = L.marker([34.0522, -118.2437]).addTo(map);


L.circle([34.0522, -118.2437], {
    radius: 300,
    fillColor: "yellow",
    color: "black",
    fillOpacity: 0.25
}).addTo(map);

L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: "#ffffa1"
}).addTo(map);
*/

// 14.4.2
// Get data from cities.js
let cityData = cities;

// Loop thorugh citites to create one marker for each
cityData.forEach(function(city) {
  console.log(city)
  L.circleMarker(city.location, {
    radius: ((city.population - 200000) / 100000),
    lineWeight: 4,
    color: "orange",
    fillColor: "orange"
  })
  .bindPopup(`<h2>${city.city}, ${city.state}</h2> <hr> <h3>Population ${city.population.toLocaleString()}</h3>`)
  .addTo(map)
});

// create tile layer
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "dark-v10"
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); // reference map defined above