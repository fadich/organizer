var express    = require('express');
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

    if (type === 'style') {
        res.sendFile(path.resolve(__dirname + "/src/" + type + "/" + file));
    }
});

app.listen("3000", function () {
    console.log("Listening on *:3000");
});

