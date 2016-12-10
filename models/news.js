var mongoose = require("mongoose");
var Comment = require("./comments");

var newsSchema = new mongoose.Schema({
	headline: {type: String, required: true},
	link: {type: String, required: true},
	comments: [Comment],
	createdAt: {type: Date, default: Date.now}
});

var News = mongoose.model("News", newsSchema);

module.exports = News;