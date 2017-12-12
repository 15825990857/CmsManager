var start = function () {
    //  var inc = document.getElementById('incomming');
    var wsImpl = window.WebSocket || window.MozWebSocket;
    //  var form = document.getElementById('sendForm');
    //  var input = document.getElementById('sendText');

    // inc.innerHTML += "connecting to server ..<br/>";

    // create a new websocket and connect
    host = window.location.host.split(':')[0];

    window.ws = new wsImpl('ws://' + host + ':7181/');
    //// when data is comming from the server, this metod is called
    ws.onmessage = function (evt) {
        if (evt.data == "JumpLogin") {
            window.location.href = "/Login/Error?str=您的账号在别的地方登录吗，您已被迫下线，是否重新登录！";
        }
    };

    //// when the connection is established, this method is called
    //ws.onopen = function () {
    //    inc.innerHTML += '.. connection open<br/>';

    //};

    //// when the connection is closed, this method is called
    //ws.onclose = function () {
    //    inc.innerHTML += '.. connection closed<br/>';
    //}

    //form.addEventListener('submit', function (e) {
    //    e.preventDefault();
    //    var val = input.value;
    //    ws.send(val);
    //    input.value = "";
    //});

}
window.onload = start;

