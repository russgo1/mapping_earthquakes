// 14.2.4

// console.log to check code
console.log("logic working");

// create map object
let map = L.map('mapid').setView([40.7, -94.5], 4); // 4 is zoom level (scale 0-18)
// Alternative:
// This method is useful when we need to add multiple tile layers, or a background image of our map(s), which we will do later in this module.
//let map = L.map("mapid", {
    //center: [
      //40.7, -94.5
    //],
    //zoom: 4
  //});

// create tile layer

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); // reference map defined above