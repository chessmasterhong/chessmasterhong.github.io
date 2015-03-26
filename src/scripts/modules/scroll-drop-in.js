require(['jquery'], function($) {
    'use strict';

    var imgsLeft = $('#showcase .row-odd .showcase-thumbnail img')
                    .css('opacity', 0)
                    .css('left', '-40px');

    var imgsRight = $('#showcase .row-even .showcase-thumbnail img')
                    .css('opacity', 0)
                    .css('right', '-40px');

    var dropIn = function() {
        imgsLeft.each(function() {
            var a = $(this).offset().top + $(this).height() / 2;
            var b = $(window).scrollTop() + $(window).height();

            if(a < b) {
                $(this)
                    .animate({ opacity: 1, left: 0 }, 'slow');
            }
        });

        imgsRight.each(function() {
            var a = $(this).offset().top + $(this).height();
            var b = $(window).scrollTop() + $(window).height();

            if(a < b) {
                $(this)
                    .animate({ opacity: 1, right: 0 }, 'slow');
            }
        });
    };


    $(window).ready(function() {
        dropIn();
    });

    $(window).scroll(function() {
        dropIn();
    });
});
