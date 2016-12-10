var express = require("express");
var mongoose = require("mongoose");
var News = require("../models/news");

var router = express.Router();

router.get("/:id", function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);
	News.findById(id, "comments", function(err, article) {
		res.json(article);
	})
})

router.post("/:id", function(req, res) {
	var id = mongoose.Types.ObjectId(req.params.id);
	var comment = req.body.comment;
	News.findByIdAndUpdate(id, {$push: {comments : {comment: comment}}}, {new: true},  function(err, doc) {
		if(err) throw err;
		res.send(doc.comments[doc.comments.length-1]);
	});
})

router.post("/remove/:articleID/:commentID", function(req, res) {
	var articleID = mongoose.Types.ObjectId(req.params.articleID);
	var commentID = mongoose.Types.ObjectId(req.params.commentID);
	News.findByIdAndUpdate(articleID, {$pull: {comments : {_id: commentID}}}, function(err, doc) {
		if(err) throw err;
		res.sendStatus(200);
	});
})

module.exports = router;