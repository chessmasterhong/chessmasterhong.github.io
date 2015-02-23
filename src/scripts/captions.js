$(document).ready(function() {
    'use strict';

    $('.portfolio-item').hover(
        function() {
            $(this).find('.item-caption').fadeIn(250);
        },
        function() {
            $(this).find('.item-caption').fadeOut(250);
        }
    );
});
