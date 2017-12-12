/**
 * Admui-basic v1.0.0 (http://www.admui.com/)
 * Copyright 2015-2017 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function (document, window, $) {
    'use strict';

    $(function () {
        $('body').scrollspy({
            target: '#articleAffix'
        });

        $('#articleAffix').affix({
            offset: {
                top: 210
            }
        });
    });

})(document, window, jQuery);
