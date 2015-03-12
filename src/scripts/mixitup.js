$(document).ready(function() {
    'use strict';

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
        }
    });
});
