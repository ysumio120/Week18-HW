var express = require("express");
var bodyParser = require("body-parser");


var app = express();

require("./db/connection");

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.listen(port, function() {
	console.log("server connected");
});