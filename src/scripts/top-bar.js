$(document).ready(function() {
    'use strict';

    // Toggle navigation links on small-screen
    $('.nav-collapse').click(function() {
        $('#nav .row .links').toggle();
    });

    // Auto-collapse navigation links on click
    $('#nav .row .links').click(function() {
        if($('.nav-collapse:visible')) {
            $(this).toggle();
        }
    });
});
