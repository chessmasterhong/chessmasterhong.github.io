require(['jquery'], function($) {
    'use strict';

    $(document).ready(function() {
        $('.nav-collapse').click(function() {
            $('#nav .row .links').toggle();
        });

        $('#nav .row .links').click(function() {
            if($('.nav-collapse:visible')) {
                $(this).toggle();
            }
        });
    });
});
