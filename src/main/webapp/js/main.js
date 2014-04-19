$(function() {
	
	message = {};
	toRate = [];
	modalRendered = [];
	url = "/service/gifter/recommendation";
	
	zoom = function(image){
		console.log("zoom for " + image);
		var a = $("<a />", {
			"href": image,
			"target": "_blank",
			class: "zoom ch-shownby-pointerenter ch-zoom-trigger",
			"aria-owns":"ch-zoom-33",
			"aria-haspopup":"true",
			"data-side":"right",
			"data-align":"top",
			"style":"width: 128px; height: 128px;"
		});
		var i = $("<img />", {
			src: image
		});
		var seeker = $("<div />", {
			class:"ch-zoom-seeker ch-hide",
			style:"width: 75px; height: 75px; left: 30.5px; top: 0px;"
		});
		i.appendTo(a);
		seeker.appendTo(a);
		new ch.Zoom(a);
		return a;
	};

	breadcrumb = function(title, elem) {
		var splitted = title.split(">");
		$.each(splitted, function(index, item) {
			if (index < splitted.length -1) {
			elem.append($("<input />", {
				type: "button",
				value: item,
				class: "ch-btn-skin ch-btn-small breadcrumb-item"
			}));
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
		modalRendered = [];
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
							if (item.items[0].images[0]) {
								image = item.items[0].images[0];
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

							$('<div/>', {class: "item-title-box"})
							.append($('<a />', {
								href : item.items[0].externalURL,
								text : item.items[0].title,
								class : "detail"
							}))
							.appendTo('#' + item.id);
							
							detailModal(item).appendTo('#' + item.id);
							
							$('<div/>', {class: "item-main-image-box"})
							.append(button("yes-" + item.id, "rateBoxElem", "ok"))
							.append($('<img/>', {
								src : image,
								alt : title,
								lowsrc: "../images/spinner.gif"
							}))
							.appendTo('#' + item.id)
							.on("click", function(e) { turnOnModal(e, item, index);});
							
							$('<div/>', { class : "rateBox" }).appendTo('#' + item.id);

							breadcrumb(title, itemCategoryBox);
							itemCategoryBox.appendTo('#' + item.id);
							
							$("#" + "yes-" + item.id).on("click", function(e) {
								console.log(e);
								console.log("in update rate");
								e.preventDefault();
								updateRate(e, item.id, index, true);
							});
							
							$('#' + item.id + " a.detail").on("click", function(e) { turnOnModal(e, item, index);});
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

		message[index].userScore = score;

		var button = $("#yes-" + itemId);
		var likeClass = "btn-success";
		var defaultClass = "btn-default";
		if(button.hasClass('btn-success')) {
			toRate.push(index);
			button.removeClass(likeClass).addClass(defaultClass);
		} else {
			toRate.splice(toRate.indexOf(index), 1);
			button.removeClass(defaultClass).addClass(likeClass);
		}

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
			class: "btn-default btn-lg " + clazz + " likeButton button-"+icon,
			"role": "button"
		});
		var img = $("<span />", {
			class: "glyphicon glyphicon-" + icon + " likeButton"
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