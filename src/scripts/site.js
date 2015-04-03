// jshint ignore:start
/*!
 *  http://chessmasterhong.github.io
 *
 *  @copyright Copyright (c) 2015 Kevin Chan
 *  @author    Kevin Chan (chessmasterhong)
 *  @link      http://chessmasterhong.github.io
 *
 *  @license   MIT (http://opensource.org/licenses/MIT)
 *
 *  @see       https://github.com/chessmasterhong/chessmasterhong.github.io for additional details
 */
// jshint ignore:end

require.config({
    baseUrl: './',
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        lazyload: 'vendor/jquery.lazyload/jquery.lazyload',
        mixitup: 'vendor/mixitup2/build/jquery.mixitup.min',

        modules: 'scripts/modules'
    }
});

require([
    'jquery',
    'lazyload',
    'mixitup',
    'modules/top-bar',
    'modules/smooth-scroll',
    'modules/scroll-to-top',
    //'modules/scroll-fade-in',
    //'modules/scroll-drop-in',
    'modules/lazyload',
    'modules/mixitup'
], function() {});
