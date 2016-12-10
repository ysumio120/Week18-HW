var mongoose = require("mongoose");

// Local database
// mongoose.connect("mongodb://localhost:27017/news_scraper", function(err) {
// 	if(err) throw err;
// 	console.log('database connected');
// });

// mLab database
mongoose.connect("mongodb://heroku_h8wn5m54:q9uhgn7ejhj91em7c7hjkplr2b@ds129038.mlab.com:29038/heroku_h8wn5m54", function(err) {
	if(err) throw err;
	console.log('database connected');
})