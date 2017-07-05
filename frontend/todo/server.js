var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request-promise');

var io = require('socket.io')(http);

app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() );       // to support JSON-encoded bodies

http.listen("3000", function () {
    console.log("Listening on *:3000");
});

app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/index.html"));
});

app.get("/src/:type/:file", function(req, res) {
    var type = req.params.type;
    var file = req.params.file;
    var possibleTypes = [
        'style',
        'script',
        'img'
    ];

    if (~possibleTypes.indexOf(type)) {
        res.sendFile(path.resolve(__dirname + "/src/" + type + "/" + file));

        return;
    }

    res.send('Bad request', 400);
});

app.get("/template/:name", function(req, res) {
    var name = req.params.name;

    res.sendFile(path.resolve(__dirname + "/templates/" + name + ".html"));
});

io.on('connection', function(socket) {
    var username = "Username";

    io.emit('hello', { msg: "Welcome, " + username + "!" });

    socket.on('new-item', function(data) {
        newItem(data.item, function (res) {
            io.emit('new-item', { msg: "New item!", item: res.item });
        });
    });
});

function newItem(item, onSuccess) {
    var result = false;
    var form = {
        "royal_todobundle_item[title]": item.title,
        "royal_todobundle_item[content]": item.body,
        "royal_todobundle_item[status]": 4
    };

    request.post(getUrl('new'), {
        json: true,
        form: form
    }).then(function (body) {
        result = body;
        onSuccess(body);
    }).catch(function (error) {
        console.log(error);

        result = error;
    });

    return result;
}

function getUrl(route) {
    return "http://org.loc/royal/todo/item/" + route;
}
