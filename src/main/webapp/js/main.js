$(function() {
	
	message = {};
	toRate = [];
	modalRendered = [];
	filters = ["baby", "girl", "female", "boy", "male"];
	url = "/service/gifter/recommendation";
	
//	$(".panel .checkbox input").on("change", function(e){
//		var filter = $(e.target).val(); 
//		if($(e.target).is(':checked')) {
//			filters.push(filter);
//		} else {
//			filters.splice(filters.indexOf(filter), 1);
//		}
//	});
	
	$(".filter").on("click", function(e){

		var elem = $( e.delegateTarget )
		var filter = $.trim(elem.attr("value"));
		if(elem.hasClass("btn-success")) {
			// disable
			elem.removeClass("btn-success");
			elem.addClass("btn-disabled");
			elem.children("span").removeClass("glyphicon-thumbs-up");
			elem.children("span").addClass("glyphicon-thumbs-down");
			
			filters.splice(filters.indexOf(filter), 1);
			
		} else {
			// enable
			elem.removeClass("btn-disabled");
			elem.addClass("btn-success");
			elem.children("span").removeClass("glyphicon-thumbs-down");
			elem.children("span").addClass("glyphicon-thumbs-up");
			
			filters.push(filter);
			
		}
		
		elem.blur();
//		console.log(filters)
	});
	
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
				
			// chico	
//			elem.append($("<input />", {
//				type: "button",
//				value: item,
//				class: "ch-btn-skin ch-btn-small breadcrumb-item"
//			}));
			
			// bootstrap
			var b = $("<button />", {
				type: "button",
				text: item,
				class: "btn btn-default btn-xs filter breadcrumb-item"
			});
			elem.append(b);
			
			}
		});
	};
	
	spinnerOn = function(){
		$("#spinner").fadeIn("fast");
		$(".filters").toggle();
		$("#more-button").toggle();
	};
	
	spinnerOff = function(){
		$("#spinner").fadeOut("fast");
		$(".filters").toggle();
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
							var box = $('<div/>', {
								id : item.id,
								// class: "col-xs-6 col-sm-4"
								class : "item-box col-md-4"
							});
							if(index == 1) {
								box.addClass("center");
							}
							box.appendTo('#mainBox');

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
		scores : [],
		filters : filters
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
				scores : message,
				filters : filters
			}));
			start(JSON.stringify({
				scores : message,
				filters : filters
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
			scores : message,
			filters : filters
		}));
	});
});