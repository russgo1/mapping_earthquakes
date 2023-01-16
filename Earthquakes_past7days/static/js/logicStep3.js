console.log("logicStep1 working");


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "streets-v11"
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: "satellite-streets-v11"
});

let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// Retrieve earthquake geoJSON
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    L.geoJSON(data, {
        // create marker on layer
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
    // function to stylize L.geoJSON
    style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`);
        }
    }).addTo(map);
    // function to define parameters of style function - returns object
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            // pass this part of the data object to the function
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    };
    // function to determine marker color based on magnitude
    function getColor(magnitude) {
        /*
        switch (magnitude) {
        case (magnitude > 5):
            return "#ea2c2c";
        case (magnitude > 4):
            return "#ea822c";
        case (magnitude > 3):
            return "#ee9c00";
        case (magnitude > 2):
            return "#eecc00";
        case (magnitude > 1):
            return "#d4ee00";
        case (magnitude < 1):
            return "#98ee00";
        }
    };
    */
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
          return "#98ee00";
    };
    // function to define radius value in styleInfo function
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    };
});