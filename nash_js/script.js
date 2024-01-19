$(document).ready(function() {
    // Initialize the Leaflet map
    var map = L.map('map', {
    // zoomControl: false, // Disable the zoom control buttons
    // scrollWheelZoom: false, // Disable zooming with the mouse scroll wheel
    // doubleClickZoom: false, // Disable zooming with double-click
    // touchZoom: false, // Disable zooming with touch gestures
    // boxZoom: false, // Disable zooming with box selection
    // keyboard: false, // Disable zooming with keyboard (+ and - keys)
    dragging: false // Disable dragging to pan
    }).setView([48.858, 2.345], 12); // Set the initial view

    // var map = L.map('map').setView([48.858, 2.345], 12); // Coordinates for Paris

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO'
    }).addTo(map);


    var imageUrl = 'img/paris2leaf.png'; // URL to your georeferenced image
    var imageBounds = [[48.816277, 2.225594], [48.902098, 2.468296]]; // Bounds of the image in [lat, lng] format

    L.imageOverlay(imageUrl, imageBounds).addTo(map);

    // Function to set the initial style of each polygon
    function style(feature) {
        return {
            color: 'transparent',  // Transparent border
            weight: 0,             // No border
            fillColor: 'transparent', // Transparent fill
            fillOpacity: 0         // Fully transparent fill
        };
    }

    // Function to highlight feature on mouseover and click
    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 2,
            color: 'blue',     // Change border color to blue
            dashArray: '',
            fillOpacity: 0
        });
        var arrondissement = layer.feature.properties.c_ar; 
        $('#overlay-text').text("Names of places: " + arrondissement + " Arrondissement");
    }

    // Function to reset the highlight
    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    // Function to handle click on feature
    function onFeatureClick(e) {
        var layer = e.target;
        var arrondissement = layer.feature.properties.c_ar; 
        $('#overlay-text').text("Names of places: " + arrondissement + " Arrondissement");
    }

    // Function to handle each feature
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: onFeatureClick
        });
    }

    // Load the GeoJSON and add it to the map
    var geojsonLayer = L.geoJSON.ajax('data/arrondissements.geojson', {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
});


