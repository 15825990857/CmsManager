/**
 * Admui-basic v1.0.0 (http://www.admui.com/)
 * Copyright 2015-2017 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
(function () {
    'use strict';

    var btn = document.getElementById('closeTab');

    btn.innerHTML = '退回上一页';

    btn.onclick = function () {
        history.go(-1);
    };
})();


