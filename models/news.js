var mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({
	headline: {type: String, required: true},
	link: {type: String, required: true},
	comments: [{type: String}],
	createdAt: {type: Date, default: Date.now}
});

var News = mongoose.model("News", newsSchema);

module.exports = News;