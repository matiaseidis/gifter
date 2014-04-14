$(function() {
	
	message = {};
	toRate = [];
	url = "/service/gifter/recommendation";
	
	breadcrumb = function(title, elem) {
		var splitted = title.split(">");
		$.each(splitted, function(index, item) {
//			elem.append($("<h5 />").append($("<span/>", {
//				class: "label label-info ",
//				text: item
//			})));
			
			elem.append(
					$("<h6 />").append(
							$("<span/>", {
//				class: "label label-info ",
				text: item
			}))
			)
			;
			
			if(index < splitted.length -2) {
				elem.append($("<h5 />").append($("<span/>", {
					class: "label label-white",
					text: ">>"
				})));
			}
		});
	};
	
	spinnerOn = function(){
		$("#spinner").show();
		$("#more-button").toggle();
	};
	
	spinnerOff = function(){
		$("#spinner").hide();
		$("#more-button").toggle();
	};
	
	start = function(r) {
		spinnerOn();
		toRate = [];
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
							$('<div/>', {
								id : item.id,
								// class: "col-xs-6 col-sm-4"
								class : "item-box col-md-4"
							}).appendTo('#mainBox');

							var itemCategoryBox = $('<div/>', {
								class: "item-category-box"
							});
							breadcrumb(title, itemCategoryBox);
							itemCategoryBox.appendTo('#' + item.id);

							$('<div/>', {class: "category-title-separator"}).appendTo('#' + item.id);
							
							$('<div/>', {class: "item-title-box"})
							.append($('<a />', {
								href : item.items[0].externalURL,
								text : item.items[0].title,
								class : "detail"
							}))
							.appendTo('#' + item.id);
							
							$('#' + item.id + " a.detail").on("click", function(e){
								e.preventDefault();
								$('#' + item.id + " .detailBox").modal('show');
							});

							$('<div/>', {class: "item-main-image-box"}).append($('<img/>', {
								src : image,
								alt : title,
								lowsrc: "../images/spinner.gif"
							})).appendTo('#' + item.id);
							
							$('<div/>', { class : "rateBox" }).appendTo('#' + item.id);

							modal(item).appendTo('#' + item.id);
							
							var goodRecommendationButton = button("yes-" + item.id, "rateBoxElem", "ok"); 
									
//							var badRecommendationButton = button("no-" + item.id, "rateBoxElem", "remove");

							$('#' + item.id + " .rateBox").append(goodRecommendationButton);
//							$('#' + item.id + " .rateBox").append(badRecommendationButton);
							
							$("#" + "yes-" + item.id).on("click", function(e) {
								e.preventDefault();
								updateRate(e, item.id, index, true);
							});
							
//							$("#" + "no-" + item.id).on("click", function(e) {
//								e.preventDefault();
//								updateRate(e, item.id, index, false);
//							});
						});
					},
					dataType : "json"
				}).fail(function(err) {
					console.log("errores");
					console.log(err);
				}).always(function(){
					spinnerOff();
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
		console.log($(event.delegateTarget));
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
		var b = $("<a />", {
			id: id,
			class: "btn-default btn-lg " + clazz + " button-"+icon,
			"role": "button"
		});
		var img = $("<span />", {
			class: "glyphicon glyphicon-" + icon
		});
		b.append(img);
		return b;
	};
	
	$("#more-button").on("click", function(){
		start(JSON.stringify({
			scores : message
		}));
	});

});