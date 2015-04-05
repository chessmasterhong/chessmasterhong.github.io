require([
    'jquery'
], function($) {
    'use strict';

    $(document).ready(function() {
        $('.showcase-thumbnail img.lazy').show().unveil();

        $('.portfolio-item img.lazy').show().unveil();
    });
});
