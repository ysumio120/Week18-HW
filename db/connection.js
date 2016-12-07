var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/news_scraper", function(err) {
	if(err) throw err;
	console.log('database connected');
});
