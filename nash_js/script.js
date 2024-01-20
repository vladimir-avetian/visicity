$(document).ready(function() {
    // Initialize the Leaflet map
    var map = L.map('map', {
    zoomControl: false, // Disable the zoom control buttons
    scrollWheelZoom: false, // Disable zooming with the mouse scroll wheel
    doubleClickZoom: false, // Disable zooming with double-click
    touchZoom: false, // Disable zooming with touch gestures
    boxZoom: false, // Disable zooming with box selection
    keyboard: false, // Disable zooming with keyboard (+ and - keys)
    dragging: false // Disable dragging to pan
    }).setView([48.858, 2.345], 12); // Set the initial view

    // var map = L.map('map').setView([48.858, 2.345], 12); // Coordinates for Paris

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO'
    }).addTo(map);


    var imageUrl = 'img/paris2leaf.png'; // URL to your georeferenced image
    var imageBounds = [[48.816277, 2.225594], [48.902098, 2.468296]]; // Bounds of the image in [lat, lng] format

    var rasterLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);

    var flag_zoom_regiment = 0

    var previousZoomLevel = map.getZoom(); // Initialize with the current zoom level

    map.on('zoomend', function() {
        var currentZoomLevel = map.getZoom();

        // Check if the zoom level changed from 13 to 12
        if (previousZoomLevel === 14 && currentZoomLevel <= 13) {
            // Trigger your specific actions here
            console.log("Zoom level changed from 13 to 12");

            // Example: Revert to initial view, disable zoom controls, etc.
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
            map.touchZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.dragging.disable();

            map.setView([48.858, 2.345], 12);
            map.removeLayer(rasterLayer);
            rasterLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);
            setTimeout(function() {
                map.setView([48.858, 2.345], 12);
            }, 1000);
        }
        previousZoomLevel = currentZoomLevel;

        if (currentZoomLevel <= 11) {
            // Example: Revert to initial view, disable zoom controls, etc.
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
            map.touchZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            map.dragging.disable();

            map.setView([48.858, 2.345], 12);
            map.removeLayer(rasterLayer);
            rasterLayer = L.imageOverlay(imageUrl, imageBounds).addTo(map);
            setTimeout(function() {
                map.setView([48.858, 2.345], 12);
            }, 1000);
        }

    })


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

        if (districtData[arrondissement]) {
            // Update parks card
            var parksData = districtData[arrondissement].parks;
            $('#parks-number').text(parksData + '%');
            $('#parks-progress').css('width', parksData + '%').attr('aria-valuenow', parksData);

            var rentData = districtData[arrondissement].rent;
            $('#rent-number').text(rentData + '%');
            $('#rent-progress').css('width', rentData + '%').attr('aria-valuenow', rentData);

            var priceData = districtData[arrondissement].price;
            $('#price-number').text(priceData + '%');
            $('#price-progress').css('width', priceData + '%').attr('aria-valuenow', priceData);

            var bakeriesData = districtData[arrondissement].bakeries;
            $('#bakeries-number').text(bakeriesData + '%');
            $('#bakeries-progress').css('width', bakeriesData + '%').attr('aria-valuenow', bakeriesData);

            var magictData = districtData[arrondissement].magict;
            $('#magic-title').text(magictData);
        }
    }

    // Function to reset the highlight
    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    var districtData = {
        1: { parks: 50, rent: 70, price: 30, bakeries: 10, magict: "🌟 The Royal Heart of Paris! 🌟", bbox: [[48.8544964876219, 2.3219974007664], [48.8696563978365, 2.35071882846721]], imgurl: "img/paris_buildings_arrond_1.png"
},
        2: { parks: 60, rent: 80, price: 20, bakeries: 40, magict: "🎭 The Bustling Bourse Beat! 🎭", bbox: [[48.8635410814225, 2.32838325561702], [48.8718117697119, 2.35402104119585]], imgurl: "img/paris_buildings_arrond_2.png"
},
        3: { parks: 70, rent: 90, price: 32, bakeries: 30, magict: "🎨 Marais' Artistic Soul! 🎨", bbox: [[48.8558369344858, 2.35039289268962], [48.8691953854574, 2.3682704694032]], imgurl: "img/paris_buildings_arrond_3.png"
},
        4: { parks: 80, rent: 100, price: 42, bakeries: 40, magict: "🌉 Notre-Dame's Majestic Pride! 🌉", bbox: [[48.8471375303585, 2.3451376996171], [48.8618848545416, 2.36877965792309]], imgurl: "img/paris_buildings_arrond_4.png"
},
        5: { parks: 90, rent: 0, price: 53, bakeries: 50, magict: "📚 The Latin Quarter's Intellectual Charm! 📚", bbox: [[48.8369481817177, 2.33691839013067], [48.853561082124, 2.36402681232919]], imgurl: "img/paris_buildings_arrond_5.png"
},
        6: { parks: 100, rent: 10, price: 34, bakeries: 20, magict: "🌺 Saint-Germain's Bohemian Bliss! 🌺", bbox: [[48.8400209590806, 2.31716829454667], [48.858154697874, 2.34384536857085]], imgurl: "img/paris_buildings_arrond_6.png"
},
        7: { parks: 0, rent: 20, price: 65, bakeries: 11, magict: "🏛️ Eiffel Tower's Iconic Splendor! 🏛️", bbox: [[48.8460848951103, 2.29136021461977], [48.8631997898029, 2.33312557731641]], imgurl: "img/paris_buildings_arrond_7.png"
},
        8: { parks: 10, rent: 30, price: 12, bakeries: 3, magict: "🛍️ Chic Champs-Élysées Elegance! 🛍️", bbox: [[48.8642036512367, 2.29605565822841], [48.8831891287794, 2.32707842711394]], imgurl: "img/paris_buildings_arrond_8.png"
},
        9: { parks: 20, rent: 40, price: 13, bakeries: 43, magict: "🎶 Opéra Garnier's Grandeur! 🎶", bbox: [[48.8698075985289, 2.32600061683716], [48.884304387551, 2.34976397200663]], imgurl: "img/paris_buildings_arrond_9.png"
},
        10: { parks: 30, rent: 50, price: 14, bakeries: 23, magict: "🚂 Gare du Nord's Vibrant Gateway! 🚂", bbox: [[48.8678734068013, 2.34795855142418], [48.8843878195371, 2.3766447399718]], imgurl: "img/paris_buildings_arrond_10.png"
},
        11: { parks: 40, rent: 60, price: 15, bakeries: 43, magict: "🍷 Bastille's Lively Nights! 🍷", bbox: [[48.8482761919547, 2.36471517161306], [48.8718229971207, 2.39894682157117]], imgurl: "img/paris_buildings_arrond_11.png"
},
        12: { parks: 50, rent: 80, price: 26, bakeries: 53, magict: "🌳 Bercy Park's Green Serenity! 🌳", bbox: [[48.8175559998113, 2.36554860226397], [48.8530778848313, 2.46829613828093]], imgurl: "img/paris_buildings_arrond_12.png"
},
        13: { parks: 60, rent: 70, price: 36, bakeries: 63, magict: "🌐 Chinatown's Cultural Fusion! 🌐", bbox: [[48.8162768164948, 2.3412563586433], [48.8436940144525, 2.38938276138559]], imgurl: "img/paris_buildings_arrond_13.png"
},
        14: { parks: 70, rent: 60, price: 56, bakeries: 23, magict: "🌄 Montparnasse's Artistic Heights! 🌄", bbox: [[48.8167782533203, 2.30192066307136], [48.8434571094714, 2.34426171096733]], imgurl: "img/paris_buildings_arrond_14.png"
},
        15: { parks: 80, rent: 50, price: 45, bakeries: 15, magict: "🌌 Modernity Meets Tradition! 🌌", bbox: [[48.8258424153462, 2.26532658803363], [48.8562355876219, 2.32390692488045]], imgurl: "img/paris_buildings_arrond_15.png"
},
        16: { parks: 90, rent: 40, price: 55, bakeries: 12, magict: "🏞️ Passy's Prestigious Calm! 🏞️", bbox: [[48.8341194315702, 2.22559377661025], [48.8802784056235, 2.30077566872987]], imgurl: "img/paris_buildings_arrond_16.png"
},
        17: { parks: 10, rent: 30, price: 44, bakeries: 10, magict: "🏰 Batignolles' Hidden Gem! 🏰", bbox: [[48.8745841907157, 2.28055672181358], [48.9002820338506, 2.32962668030668]], imgurl: "img/paris_buildings_arrond_17.png"
},
        18: { parks: 20, rent: 15, price: 33, bakeries: 4, magict: "🎨 Montmartre's Bohemian Rhapsody! 🎨", bbox: [[48.8822328474197, 2.32574886157473], [48.9017426626005, 2.3707653806439]], imgurl: "img/paris_buildings_arrond_18.png"
},
        19: { parks: 30, rent: 12, price: 11, bakeries: 2, magict: "🎡 La Villette's Innovative Spirit! 🎡", bbox: [[48.8724397585582, 2.36498488923525], [48.9020979989263, 2.41042774544742]], imgurl: "img/paris_buildings_arrond_19.png"},
        20: { parks: 40, rent: 11, price: 20, bakeries: 45, magict: "🎉 Belleville's Multicultural Mosaic! 🎉", bbox: [[48.8467647696628, 2.37729324745446], [48.8782196376912, 2.41588302161785]], imgurl: "img/paris_buildings_arrond_20.png"}
    };


    function onFeatureClick(e) {
        var layer = e.target;
        var arrondissement = layer.feature.properties.c_ar; 
        $('#overlay-text').text("Names of places: " + arrondissement + " Arrondissement");

        if (districtData[arrondissement]) {
            // Update parks card
            var parksData = districtData[arrondissement].parks;
            $('#parks-number').text(parksData + '%');
            $('#parks-progress').css('width', parksData + '%').attr('aria-valuenow', parksData);

            var rentData = districtData[arrondissement].rent;
            $('#rent-number').text(rentData + '%');
            $('#rent-progress').css('width', rentData + '%').attr('aria-valuenow', rentData);

            var priceData = districtData[arrondissement].price;
            $('#price-number').text(priceData + '%');
            $('#price-progress').css('width', priceData + '%').attr('aria-valuenow', priceData);

            var bakeriesData = districtData[arrondissement].bakeries;
            $('#bakeries-number').text(bakeriesData + '%');
            $('#bakeries-progress').css('width', bakeriesData + '%').attr('aria-valuenow', bakeriesData);

            var magictData = districtData[arrondissement].magict;
            $('#magic-title').text(magictData);

            var ArrData = districtData[arrondissement]
            var centroid = e.target.getBounds().getCenter();
            map.setView(centroid, 14);
            map.removeLayer(rasterLayer);
            rasterLayer = L.imageOverlay(ArrData.imgurl, ArrData.bbox).addTo(map);
            
            // Change of zoom regiment
            flag_zoom_regiment = 1
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
            map.touchZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            map.dragging.enable();
        }
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

























