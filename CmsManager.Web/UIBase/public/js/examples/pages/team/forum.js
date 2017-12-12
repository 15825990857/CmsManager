/**
 * Admui-basic v1.0.0 (http://www.admui.com/)
 * Copyright 2015-2017 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function ($) {
    'use strict';

    App.extend({
        run: function () {
            $('.markdown-edit').markdown({
                language: 'zh',
                iconlibrary: 'fa'
            });
        }
    });

    $(function () {
       App.run();
    });
    
})(jQuery);
