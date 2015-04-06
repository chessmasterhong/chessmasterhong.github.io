require(['jquery'], function($) {
    'use strict';

    $(document).ready(function() {
        // ---------- Showcase items ----------
        $('#showcase .row-odd .showcase-thumbnail img.lazy')
            .css('opacity', 0)
            .css('left', '-40px');

        $('#showcase .row-even .showcase-thumbnail img.lazy')
            .css('opacity', 0)
            .css('right', '-40px');

        $('#showcase .showcase-thumbnail img.lazy')
            .show()
            .unveil(0, function() {
                $(this).load(function() {
                    var parent = $(this).parents();

                    if(parent.hasClass('row-odd')) {
                        $(this).animate({ opacity: 1, left: 0 }, 'slow');
                    }
                    else if(parent.hasClass('row-even')) {
                        $(this).animate({ opacity: 1, right: 0 }, 'slow');
                    }
                });
            });

        // ---------- Portfolio items ----------
        $('#portfolio .portfolio-item .panel .item-img-wrapper img.lazy')
            .show()
            .unveil(0, function() {
                $(this).load(function() {
                    $(this).animate({ opacity: 1 }, 'slow');
                });
            });
    });
});
