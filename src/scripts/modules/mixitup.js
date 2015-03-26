require(['jquery'], function($) {
    'use strict';

    $(document).ready(function() {
        $('.portfolio-items').mixItUp({
            animation: {
                effects: 'fade',
                easing: 'cubic-bezier(0, 1, 0.5, 1)'
            },
            load: {
                filter: 'all'
            },
            selectors: {
                filter: '.portfolio-filter',
                sort: '',
                target: '.portfolio-item'
            },
            callbacks: {
                onMixLoad: function() {
                    $('#portfolio .portfolio-filter')
                        .css('display', 'inline-block');

                    $('#portfolio .portfolio-item')
                        .addClass('mix');
                }
            }
        });
    });
});
