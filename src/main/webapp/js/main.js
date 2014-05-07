$(function() {
	
	message = {};
	toRate = [];
	modalRendered = [];
	// filters = ["baby", "girl", "female", "boy", "male"];
	url = "/service/gifter/recommendation";
	selectedItemsInitialLeft = $("#selectedItemsBox").css('left');
	priceRange = {}

    var customToolTip = function(c) {
        return $.Link({
            target: '-tooltip-<div class="tooltip"></div>',
            method: function ( value ) {

                // The tooltip HTML is 'this', so additional
                // markup can be inserted here.
                $(this).html(
                    '<strong>'+c+' </strong>' +
                    '<span>$' + value + '</span>'
                );
            }
        });
    }

    priceSliderStep = 20;
    $("#pricesSlider").noUiSlider({
        start: [priceSliderStep, 50],
        connect: true,
        margin: 340,
        step: priceSliderStep,
        orientation: "vertical",
        range: {
            'min': priceSliderStep,
            'max': 2000
        },
        serialization: {
        		format: {
        			decimals: 0
        		},
        		lower: [ customToolTip("Desde") ],
        		upper: [ customToolTip("Hasta") ]
        	}
    });
	/*
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
	});
	*/

	/*
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
	*/

	breadcrumb = function(title, elem) {
		var splitted = title.split(">");
		$.each(splitted, function(index, item) {
			if (index < splitted.length -1) {

			var b = $("<button />", {
				type: "button",
				text: item,
				class: "btn btn-info btn-xs filter breadcrumb-item"
			});
			elem.append(b);
			
			}
		});
	};
	
	spinnerOn = function(){
		$("#spinner").fadeIn("fast");
		// $(".filters").toggle();
		// $("#more-button").toggle();
		$(".navbar .container").toggle();

	};
	
	spinnerOff = function(){
		$("#spinner").fadeOut("fast");
		// $(".filters").toggle();
		// $("#more-button").toggle();
		$(".navbar .container").toggle();
	};

	$.selectedItem = function(id) {
    	var selectedItem = $("<div />", {
    	class: "selectedItem",
    	id: $.selectedItemElemId(id),
    	text: id});
    	return selectedItem;
   	};

   	$.selectedItemElemId = function(id) {
   	return "selected-item-" + id;
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


						var mainBox = $("#mainBox .reccomendations")
						mainBox.empty();
						message = data;
						$.each(data, function(index, item) {
							var title = item.name;
							var image = item.imageURL;

							if(item.items.length == 0) {
							    console.log("ML unreachable...");
							    return;
							}

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
							mainBox.append(box);

							$('<div/>', {class: "item-title-box"})
							.append($('<a />', {
								href : item.items[0].externalURL,
								text : item.items[0].title,
								class : "detail"
							}))
							.append(buttons(item.id))
//							.append(button("yes-" + item.id, "rateBoxElem", "ok"))
							.appendTo('#' + item.id);
							
							detailModal(item).appendTo('#' + item.id);
							
							$('<div/>', {class: "item-main-image-box"})
							
							.append($('<img/>', {
								src : image,
								alt : title
							}))
							.appendTo('#' + item.id)
							.on("click", function(e) { turnOnModal(e, item, index);});
							
							$('<div/>', { class : "rateBox" }).appendTo('#' + item.id);

							var itemCategoryBox = $('<div/>', {class: "item-category-box"});
							breadcrumb(title, itemCategoryBox);
							itemCategoryBox.appendTo('#' + item.id);
							
							$("#yes-" + item.id).on("click", function(e) {
								e.preventDefault();
								updateRate(e, item, index, true, true);
							});

							$("#already-have-"+ item.id).on("click", function(e) {
                                e.preventDefault();
                                updateRate(e, item, index, true, false);
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

	$.priceRange = function() {

	    return {
	    "from": $("#pricesSlider").val()[0],
	    "to": $("#pricesSlider").val()[1]
	    }
	}

	start(JSON.stringify({
		scores : [],
		priceRange: $.priceRange()
		// ,
		// filters : filters
	}));

	updateRate = function(event, item, index, score, like) {

		message[index].userScore = score;

		var likeButton = $("#yes-" + item.id);
		var alreadyHaveButton = $("#already-have-"+ item.id);

		var likeClick = event.target.id.indexOf("yes") >= 0;

        var thisButton  =  likeClick ? likeButton : alreadyHaveButton;
        var otherButton = !likeClick ? likeButton : alreadyHaveButton;

		var green = 'btn-success';
		var white = 'btn-default';

		if(thisButton.hasClass(green)) {
		    // lo volvemos a agregar a la lista de toRate
		    toRate.push(index);
		    thisButton.removeClass(green).addClass(white);
		    // lo quitamos de selected items
		    $("#"+$.selectedItemElemId(item.id)).remove();

		} else {

        	// si otherButton estaba green, hacemos el switch
        	if(otherButton.hasClass(green)) {
        	    otherButton.removeClass(green).addClass(white);
        	} else {
        	    // lo quitamos de la lista de toRate
                toRate.splice(toRate.indexOf(index), 1);
                // lo agregamos a selected items
                addToSelectedItems(item);
                // $("#selectedItemsBox").append($.selectedItem(item.id));
        	}

        	thisButton.removeClass(white).addClass(green);
		}

		if (toRate.length === 0) {
			console.log(JSON.stringify({
				scores : message

				/* ,
				filters : filters
				*/
			}));
			start(JSON.stringify({
				scores : message,
                priceRange: $.priceRange()
				/* ,
				filters : filters
				*/
			}));
		}
	};

	addToSelectedItems = function(item) {

	    // appendToSelectedItemsCarousel(item);

	    var lineItems = 6;
	    var lastLine = $("#selectedItemsBox .selectedItemsLine").last();
	    var lastLineChildren = lastLine.children(".selected-item-box");
        var targetLine

        if( lastLineChildren.length == lineItems ) {
            targetLine = $("<div />", {class: "selectedItemsLine col-md-12"});
            $("#selectedItemsBox").append(targetLine);
        } else {
            targetLine = lastLine;
        }

        var selectedItemBox = $("<div />", {class:"selected-item-box col-md-"+parseInt(12/lineItems), id: "selected-item-"+item.id});
        var selectedItem = $("<div />", {class:"selected-item"});
        selectedItemBox.append(selectedItem);
        var title = $("<div />", {class:"selected-item-title-box"});

        var excludeButton = $("<a />", {href:"#", class:"selected-item-exclude", "title": "Desechar recomendación"});
        excludeButton.append($("<span />", {class: "glyphicon glyphicon-remove-circle"}));
        title.append(excludeButton);
        title.append($("<a />", {href:"#", class:"selected-item-title", "text": item.items[0].title}));
        selectedItem.append(title);
        selectedItem.append($('<img/>', { "src" : item.items[0].images[0], alt : item.items[0].title }));
        targetLine.append(selectedItemBox);
	};
	
	buttons = function(id) {
		var b = $("<div />", {class: "btn-group"})
		.append($("<button />", {
			"type": "button", 
			class:"btn btn-default btn-xs",
			"text":"lo tiene",
			id: "already-have-"+id}))
		.append($("<button />", {
			"type": "button", 
//			likeButton button-ok rateBoxElem
			class:"btn btn-default btn-xs",
			"text":"me gusta",
			id: "yes-"+id}));
		var box = $("<div />", {class: "ok-buttons"})
        box.append(b);
		return box;
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
			priceRange: $.priceRange()
			/* ,
			filters : filters
			*/
		}));
	});

	$("#selectedItemsButton").on("click", function(e){

        if ( $("#selectedItemsBox").is(":visible") ) {
            $("#selectedItemsBox").slideUp(function() {
                $("#selectedItemsBox").hide();
            });
        } else {
            $("#selectedItemsBox").slideDown();
        }

	});

});