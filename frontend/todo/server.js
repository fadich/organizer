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

app.listen("3000", function () {
    console.log("Listening on *:3000");
});

