var express = require("express");
var mongoose = require("mongoose");
var News = require("../models/news");

var router = express.Router();

router.get("/comments/:link", function(req, res) {
	var link = mongoose.Types.ObjectId(req.params.link);
	News.findOne({link: link}, function(err, article) {
		console.log(article);
		res.json(article);
	})
})

router.post("/comments", function(req, res) {
	var id = mongoose.Types.ObjectId(req.body.id);
	var comment = req.body.commnent;
	
})