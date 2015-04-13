require(['jquery'], function($) {
    'use strict';

    $(document).ready(function() {
        $('a[href^="/#"]').click(function() {
            if($(this.hash).offset()) {
                // Scroll to target hash top location
                // Account additional offset for nav-collapse bar
                $('html, body').animate({
                    scrollTop: $(this.hash).offset().top
                        - ($(window).width() < 640 ? 43 : 0)
                }, 500);
            }
        });
    });
});
