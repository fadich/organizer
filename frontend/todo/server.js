var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request-promise');

var io = require('socket.io')(http);

app.use( bodyParser.urlencoded({ extended: true }) );
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

app.get("/get-items", function(req, res) {
    request.get(getUrl(), {
        json: true
    }).then(function (body) {
        res.send(body);
    }).catch(function (error) {
        console.log(error);
    });
});

io.on('connection', function(socket) {
    var username = "Username";

    io.emit('hello', { msg: "Welcome, " + username + "!" });

    socket.on('new-item', function(data) {
        newItem(data.item, function (res) {
            io.emit('new-item', {
                msg: "New item!",
                item: res.item,
                client: data.client
            });
        });
    });

    socket.on('delete-item', function(data) {
        editItem(data.item, 1, function (res) {
            io.emit('delete-item', {
                msg: "Item deleted.",
                item: res.item,
                client: data.client
            });
        });
    });

    socket.on('postpone-item', function(data) {
        editItem(data.item, 3, function (res) {
            io.emit('postpone-item', {
                msg: "Item postponed.",
                item: res.item,
                client: data.client
            });
        });
    });

    socket.on('restore-item', function(data) {
        editItem(data.item, 4, function (res) {
            io.emit('restore-item', {
                msg: "Item restored.",
                item: res.item,
                client: data.client
            });
        });
    });

    socket.on('done-item', function(data) {
        editItem(data.item, 2, function (res) {
            io.emit('done-item', {
                msg: "Item done.",
                item: res.item,
                client: data.client
            });
        });
    });

    socket.on('edit-item', function(data) {
        editItem(data.item, data.item.status, function (res) {
            io.emit('edit-item', {
                msg: "Item updated.",
                item: res.item,
                client: data.client
            });
        });
    });
});

function newItem(item, onSuccess) {
    var result = false;
    var form = {
        "title": item.title,
        "content": item.content,
        "status": 4
    };

    request.post(getUrl(), {
        json: true,
        form: form
    }).then(function (body) {
        result = body;
        onSuccess(body);
    }).catch(function (error) {
        console.error("Error!");
        // console.error("Body: ", error.message);
        console.error("Code: ", error.statusCode);

        result = error;
    });

    return result;
}

function editItem(item, status, onSuccess) {
    status = arguments.length < 2 ? item.status : status;

    var result = false;
    var form = {
        "content": item.content,
        "title": item.title,
        "status": status
    };

    request.post(getUrl(item.id), {
        json: true,
        form: form
    }).then(function (body) {
        result = body;
        onSuccess(body);
    }).catch(function (error) {
        console.log(error.statusCode);
        console.log(error.message);

        result = error;
    });

    return result;
}

function getUrl(route) {
    route = route || "";

    return "http://org.royallib.pw/royal/todo/list/" + route;
}
