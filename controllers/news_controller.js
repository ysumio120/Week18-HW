var express = require("express");
var mongoose = require("mongoose");
var News = require("../models/news");

var router = express.Router();

router.get("/comments/:id", function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);
	News.findOne({_id: id}, function(err, article) {
		console.log(article);
		res.json(article);
	})
})

router.post("/comments", function(req, res) {
	var id = mongoose.Types.ObjectId(req.body.id);
	var comment = req.body.commnent;
	
})