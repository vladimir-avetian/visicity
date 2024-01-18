$(document).ready(function() {

    $('.change-image').click(function() {
        var newImage = $(this).data('image');
        $('#interactive-image').attr('src', newImage);

        var arrText = "";
        switch(newImage) {
            case 'img/paris_buildings_arrond_1.png':
                arrText = "Names of places: 1 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_2.png':
                arrText = "Names of places: 2 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_3.png':
                arrText = "Names of places: 3 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_4.png':
                arrText = "Names of places: 4 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_5.png':
                arrText = "Names of places: 5 Arrondissement";
                break;               
            case 'img/paris_buildings_arrond_6.png':
                arrText = "Names of places: 6 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_7.png':
                arrText = "Names of places: 7 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_8.png':
                arrText = "Names of places: 8 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_9.png':
                arrText = "Names of places: 9 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_10.png':
                arrText = "Names of places: 10 Arrondissement";
                break;
            case 'img/paris_buildings_arrond_11.png':
                arrText = "Names of places: 11 Arrondissement";
                break;                                                                                               
            case 'img/paris_buildings_arrond_12.png':
                arrText = "Names of places: 12 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_13.png':
                arrText = "Names of places: 13 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_14.png':
                arrText = "Names of places: 14 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_15.png':
                arrText = "Names of places: 15 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_16.png':
                arrText = "Names of places: 16 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_17.png':
                arrText = "Names of places: 17 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_18.png':
                arrText = "Names of places: 18 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_19.png':
                arrText = "Names of places: 19 Arrondissement";
                break;                                 
            case 'img/paris_buildings_arrond_20.png':
                arrText = "Names of places: 20 Arrondissement";
                break;                                                                                                                                                                                                                                 
            default:
                arrText = "Names of places: Paris";
        }
        $('#overlay-text').text(arrText);
    });
});