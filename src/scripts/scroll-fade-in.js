(function() {
    'use strict';

    var panels = $('#portfolio .portfolio-item .panel')
                    .css('opacity', 0);

    var fadeIn = function() {
        panels.each(function(index) {
            var t = 50;
            var dt = parseInt(index * t);

            var a = $(this).offset().top + $(this).height() / 2;
            var b = $(window).scrollTop() + $(window).height();

            if(a < b) {
                $(this)
                    .delay(t + dt)
                    .animate({ opacity: 1 }, 'slow');
            }
        });
    };

    $(window).ready(function() {
        fadeIn();
    });

    $(window).scroll(function() {
        fadeIn();
    });
})();
