$(document).ready(function() {
    'use strict';

    $('.portfolio-items').mixItUp({
        animation: {
            effects: 'fade',
            easing: 'ease'
        },
        load: {
            filter: 'all'
        },
        selectors: {
            filter: '.portfolio-filter',
            sort: '',
            target: '.portfolio-item'
        }
    });
});
