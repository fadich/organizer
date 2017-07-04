$(function () {
    var socket = io();

    socket.on('hello', function(log) {
        console.log(log);
    });
});
