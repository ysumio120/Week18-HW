var currentPage = 1;

$.get("/scrape", function() {

})

$(document).ready(function(){
	$.get("/all?page=1", function(response) {
		displayArticles(response);
	})
})

// Pagination (max 10 articles per page)
$(".next, .prev").click(function() {
	if($(this).hasClass("next")) {
		currentPage++;
		$(".prev").css("visibility", "visible");
	}
	else {
		currentPage--;
		if(currentPage == 1) {
			$(".prev").css("visibility", "hidden");
		}
		else {
			$(".prev").css("visibility", "visible");
		}	
	}
	$(".page").text(currentPage);
	$.get("/all?page=" + currentPage, function(response) {
		displayArticles(response);
		
	});
	console.log(currentPage);
})

// Dropdown list of existing comments (load from database)
$(document).on("click", ".commentDropBtn", function() {
	var articleDiv = $(this).closest(".article");
	var id = articleDiv.attr("data-id");
	console.log(id);
	var index = $(this).attr("value");
	var commentsDiv = $(".commentsDiv[data-index="+ index + "]");
	var commentsList = commentsDiv.children(".commentsList");
	if($(this).data("open") == false) {
		$(this).data("open", true);
		$(this).text("Close Comments");
		commentsDiv.slideDown();
		displayComments(id, commentsList);
	}
	else {
		$(this).data("open", false);
		$(this).text("Open Comments");
		commentsDiv.slideUp(function() {
			commentsDiv.children(".commentsList").empty();
		});
	}
})

// Adds new comment to database and displays comment
$(document).on("click", ".submit", function() {
	var commentsList = $(this).prevAll(".commentsList");
	var input = $(this).prev("input");
	var comment = $(input).val().trim();
	$(input).val("");
	console.log(comment);
	if(comment != "") {
		var id = $(this).closest(".article").attr("data-id");
		console.log(id);
		$.post("/comments/" + id, {comment: comment}, function(comment) {
			console.log(comment);
			var commentString = comment.comment;
			var commentID = comment._id;
			var commentDiv = $("<div>").addClass("commentDiv");
			var comment = $("<div>").text(commentString);
			var trash = $("<span class='pull-right glyphicon glyphicon-trash' aria-hidden='true'></span>");
			trash.attr("data-articleID", id);
			trash.attr("data-commentID", commentID);
			commentDiv.append(comment);
			commentDiv.append(trash);
			commentsList.append(commentDiv);
		})
	}
})

// Removes comment from database and list
$(document).on("click", ".glyphicon-trash", function() {

})


function displayArticles(records) {
	$(".articles").empty();
	records.forEach(function(element, index) {
		var article = $("<div>").addClass("col-lg-12 article").attr("data-id", element._id);
		var a = $("<a>").attr("href", element.link).attr("target", "_blank").addClass("col-lg-6");
		a.text(element.headline);
		article.append(a);

		var commentsDropdown = $("<div>").addClass("col-lg-6");
		var commentsDropdownBtn = $("<button>").text("Open Comments").attr("value", index).addClass("commentDropBtn");
		commentsDropdownBtn.data("open", false);
		commentsDropdown.append(commentsDropdownBtn);
		article.append(commentsDropdown);

		var commentsDiv = $("<div>").addClass("col-lg-12 commentsDiv").attr("data-index", index);

		var commentsList = $("<div>").addClass("commentsList");
		commentsDiv.append(commentsList);

		var commentInput = $("<input>");
		commentInput.attr("placeholder", "Leave Comment");
		commentsDiv.append(commentInput);
		var commentSubmit = $("<button>").text("Submit").addClass("submit");
		commentsDiv.append(commentSubmit);
		article.append(commentsDiv);
		
		$(".articles").append(article);
	});
}


function displayComments(id, commentsList) {
	$.get("/comments/" + id, function(response) {
		response.comments.forEach(function(element, index) {
			var commentDiv = $("<div>").addClass("commentDiv");
			var comment = $("<div>").text(element.comment);
			var trash = $("<span class='pull-right glyphicon glyphicon-trash' aria-hidden='true'></span>");
			trash.attr("data-articleID", id);
			trash.attr("data-commentID", element._id);
			commentDiv.append(comment);
			commentDiv.append(trash);
			commentsList.append(commentDiv);
		});
	})
}

