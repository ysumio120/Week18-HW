var currentPage = 1;

$(document).ready(function(){
	$.get("/all", function(response) {
		console.log("display");
		//console.log(response);
		displayArticles(response);
	})
})

$(".next, .prev").click(function() {
	var buttonPressed = this;
	$.get("/all?page=" + currentPage, function(response) {
		displayArticles(response);
		if($(buttonPressed).hasClass("next")) {
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
	});


	console.log(currentPage);
})

function displayArticles(records) {
	$(".articles").empty();
	records.forEach(function(element, index) {
		var article = $("<div>").addClass("col-lg-12");
		var a = $("<a>").attr("href", element.link).attr("target", "_blank");
		a.text(element.headline);
		article.append(a);
		$(".articles").append(article);
	});
}

