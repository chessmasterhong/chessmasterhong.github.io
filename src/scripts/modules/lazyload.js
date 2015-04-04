require(['jquery'], function($) {
    'use strict';

    $(function() {
        $('.portfolio-item img.lazy').lazyload({
            effect: 'fadeIn'
        });

        $('.showcase-thumbnail img.lazy').lazyload({
            effect: 'fadeIn'
        });
    });
});
