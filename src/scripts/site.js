require.config({
    baseUrl: './',
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        mixitup: 'vendor/mixitup2/build/jquery.mixitup.min',

        modules: 'scripts/modules'
    }
});

require([
    'jquery',
    'mixitup',
    'modules/top-bar',
    'modules/smooth-scroll',
    'modules/scroll-to-top',
    'modules/scroll-fade-in',
    'modules/scroll-drop-in',
    'modules/mixitup'
], function() {});
