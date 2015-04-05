require(['jquery'], function($) {
    'use strict';

    $(function() {
        $('.showcase-thumbnail img.lazy').show().lazyload({
            effect: 'fadeIn'
        });

        $('.portfolio-item img.lazy').show().lazyload({
            effect: 'fadeIn'
        });
    });
});
