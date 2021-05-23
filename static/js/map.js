
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 20,
	accessToken: API_KEY
});
// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};
// Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});
// Pass our map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);
// Retrieve the earthquake GeoJSON data.
d3.json("Resources/myfile.geojson").then(function(data) {
  
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 5,
      fillColor: "#ed2121",
      color: "black",
      radius: getRadius(feature.properties.Average),
      stroke: true,
      weight: 0.5
    };
  }
  function getRadius(Average) {
    return Average *1.5;
  }


// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
          "State: "
            + feature.properties.State
            + "<br>Average: "
            + feature.properties.Average
            
        );}
    }).addTo(map);
});