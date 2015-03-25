$(document).ready(function() {
    'use strict';

    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();

        if($(this.hash).offset()) {
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 500);
        }
    });
});
