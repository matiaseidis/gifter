$(function() {

	message = {};
	toRate = [];
	modalRendered = [];
	// filters = ["baby", "girl", "female", "boy", "male"];
	url = "/service/gifter/recommendation";
	selectedItemsInitialLeft = $("#selectedItemsBox").css('left');
	priceRange = {};
	toggleClassName = "hidden";
	
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
    };

    priceSliderStep = 20;
    $("#pricesSlider").noUiSlider({
        start: [priceSliderStep, 200],
        connect: true,
        margin: priceSliderStep,
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
		console.log("show spinner")
		$("#spinner").removeClass(toggleClassName);
//		show();
		$("#recommendations").addClass(toggleClassName);
//		hide();
	};
	
//	toggleSpinner = function() {
//		console.log(11)
//		
//		console.log(12)
//	};
//	
	spinnerOff = function(){
		console.log("hide spinner")
		$("#recommendations").removeClass(toggleClassName);
//		.show();
		$("#spinner").addClass(toggleClassName);
//		hide();
//		$("#recommendations").toggleClass(toggleClassName);
//		$("#spinner").toggleClass(toggleClassName);
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

	updateRate = function(event, item, index, score, like) {

		message[index].userScore = score;

		var likeButton = $("#yes-" + item.id);
		var alreadyHaveButton = $("#already-have-"+ item.id);
        // console.log("event id: " + event.delegateTarget.id);
		var likeClick = event.delegateTarget.id.indexOf("yes") >= 0;

        var thisButton  =  likeClick ? likeButton : alreadyHaveButton;
        var otherButton = !likeClick ? likeButton : alreadyHaveButton;

		var green = 'green';
		var white = 'white';

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
                if(likeClick) {
                    addToSelectedItems(item);
                }
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
			/*
		.append($("<button />", {
			"type": "button", 
			class:"btn btn-default btn-xs",
			"text":"me gusta",
			id: "yes-"+id}))
			*/
			;
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
	
	$("#selectedItemsButton").on("click", function(e){

	 // document.querySelector(".flip-container").classList.toggle("flip");

        var selectedItemsBox = $("#selectedItemsBox");
        var recommendationsBox = $("#recommendations");

        var toHide = selectedItemsBox;
        var toShow = recommendationsBox;
        var mode = "fast";

        if ( recommendationsBox.is(":visible") ) {
            console.log("visible");
            toHide = recommendationsBox;
            toShow = selectedItemsBox;
        }


        $(toHide).fadeOut(mode, function(){
        	console.log("epa")
            $(toShow).fadeIn(mode);
        });
	});
	
	var w = $("#flip-container").width();
	var h = $("#pricesSlider").height();
	
	console.log("w: " + w +" h: " + h);
	
	$(".flip-container").css("width", w);
	$(".flip-container").css("height", h);
	$(".front").css("width", w);
	$(".front").css("height", h);
	$(".back").css("width", w);
	$(".back").css("height", h);
	
	
	start = function(r) {
		spinnerOn();
		var mainBox = $("#recommendations");
		mainBox.empty();
		toRate = [];
		modalRendered = [];
		$.ajax(
				{
					type : "POST",
					url : url,
					async: false,
					data : r,
					contentType : "application/json",
					success : function(data, textStatus, jqXHR) {



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
							.appendTo('#' + item.id);
							
							detailModal(item).appendTo('#' + item.id);

							var okButton = $("<div />", {
							    class: "okButton white okButtonElem",
							    id: "yes-"+item.id,
							    href:"#"
                            });
							okButton.append($("<span />", {
                                class: "glyphicon glyphicon-ok-circle okButtonElem"
							}));

							$('<div/>', {class: "item-main-image-box"})
							.append(okButton)
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
	
	$("#more-button").on("click", function(){
		start(JSON.stringify({
			scores : message,
			priceRange: $.priceRange()
		}));
	});
	
	$.priceRange = function() {
		var state = $("#pricesSlider").val();
	    return {
	    "from": state[0],
	    "to": state[1]
	    };
	};
	
	start(JSON.stringify({
		scores : [],
		priceRange: $.priceRange()
	}));

});