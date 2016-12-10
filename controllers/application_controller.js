var express = require("express");
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();

var News = require("../models/news");

router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/../index.html"));
});

router.get("/all", function(req, res) {
	var page = parseInt(req.query.page);
	var skip = page - 1;

	News.find({}, null, {sort: {createdAt: -1}, limit: 10, skip: (skip *10)}, function(err, records) {
		res.send(records);
	});
});

router.get("/scrape", function(req, res) {
	var obj = [];

	request("https://news.ycombinator.com", function(err, response, html) {
		if(err) throw err;
		var $ = cheerio.load(html);
		$(".title").each(function(i, element) {
	      var title = $(this).children("a:not(.morelink)").text();
	      var link = $(this).children("a:not(.morelink)").attr("href");

	      obj[i] = {
	      	headline: title,
	      	link: link
	      }

	      if(obj[i].headline && obj[i].link) {
		      News.findOne({$or: [{headline: obj[i].headline}, {link: obj[i].link}]}, function(err, newsRecord) {
		      	if(err) throw err;
		      	if(newsRecord == null) {
		      		News.create(obj[i], function(err, record) {
		      			if(err) throw err;
		      			console.log("Record Added");
		      		})
		      	}
		      });
	  	  }
		});
		res.send("Scraped");
	})
});



module.exports = router;