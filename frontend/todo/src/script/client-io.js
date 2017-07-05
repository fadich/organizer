$(function () {
    var socket = io();

    socket.on('hello', function(hello) {
        console.log(hello);
    });
});
