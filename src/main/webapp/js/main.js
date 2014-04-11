$(function() {
	
	message = {};
	toRate = [];
	url = "/service/gifter/recommendation";
	
	start = function(r) {
		$("#spinner").show();
		$.ajax(
				{
					type : "POST",
					url : url,
					data : r,
					contentType : "application/json",
					success : function(data, textStatus, jqXHR) {
						
						$("#mainBox").empty();
						message = data;
						$.each(data, function(index, item) {
							var title = item.name;
							var image = item.imageURL;
							if (item.items[0].image) {
								image = item.items[0].image;
							}
							toRate.push(index);
							jQuery('<div/>', {
								id : item.id,
								// class: "col-xs-6 col-sm-4"
								class : "col-md-4"
							}).appendTo('#mainBox');
							jQuery('<div/>', {
								text : title
							}).appendTo('#' + item.id);

							$('<div/>').append($('<a />', {
								href : item.items[0].externalURL,
								text : item.items[0].title,
								class : "detail"
							})).appendTo('#' + item.id);
							
							$('#' + item.id + " a.detail").on("click", function(e){
								e.preventDefault();
								$('#' + item.id + " .detailBox").modal('show');
							});

							jQuery('<img/>', {
								src : image,
								alt : title,
								height : "20"
							}).appendTo('#' + item.id);

							jQuery('<div/>', {
								class : "rateBox"
							}).appendTo('#' + item.id);
							
							modal(item.id).appendTo('#' + item.id);

							$('#' + item.id + " .rateBox").append(button("yes-" + item.id, "rateBoxElem", "ok"));
									
							$(".rateBox button#" + "yes-" + item.id).on("click", function(e) {
										e.preventDefault();
										updateRate(e, item.id, index, true);
									});

							$('#' + item.id + " .rateBox").append(button("no-" + item.id, "rateBoxElem", "remove"));
							$(".rateBox button#" + "no-" + item.id).on("click", function(e) {
										e.preventDefault();
										updateRate(e, item.id, index, false);
									});
						});
					},
					dataType : "json"
				}).fail(function(err) {
					console.log("errores");
					console.log(err);
				}).always(function(){
					$("#spinner").hide();
				});
	};

	start(JSON.stringify({
		scores : []
	}));

	updateRate = function(event, itemId, index, score) {

		if ($.inArray(index, toRate) > -1) {
			toRate.splice(toRate.indexOf(index), 1);
		}
		message[index].userScore = score;

		var color = score ? "success" : "danger";
		var otherColor = score ? "danger" : "success";
		$(event.delegateTarget).addClass("btn-" + color);

		var otherButton = score ? "no" : "yes";
		$("#" + otherButton + "-" + itemId).removeClass("btn-" + otherColor)
				.addClass("btn-default");

		if (toRate.length === 0) {
			console.log(JSON.stringify({
				scores : message
			}));
			start(JSON.stringify({
				scores : message
			}));
		}
	};

	button = function(id, clazz, icon) {
		return "<button id=\"" + id
				+ "\" type=\"button\" class=\"btn btn-default " + clazz
				+ "\"><span class=\"glyphicon glyphicon-" + icon
				+ "\"></span></button>";
	}

});