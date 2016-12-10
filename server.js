var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var application_controller = require("./controllers/application_controller");
var comments_controller = require("./controllers/comments_controller");


var app = express();

require("./db/connection");

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.join(__dirname + "/public")));
app.use("/", application_controller);
app.use("/comments", comments_controller);

app.listen(port, function() {
	console.log("server connected");
});