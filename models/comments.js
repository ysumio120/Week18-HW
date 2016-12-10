var mongoose = require("mongoose");

var commentsSchema = new mongoose.Schema({
	comment: {type: String},
	createdAt: {type: Date, default: Date.now}
});


module.exports = commentsSchema;