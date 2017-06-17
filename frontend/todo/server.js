var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/templates/index.html"));
    // res.send("Hello World!");
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

app.listen("3000", function () {
    console.log("Listening on *:3000");
});

