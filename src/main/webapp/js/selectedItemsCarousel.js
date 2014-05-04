$(function(){

max = 5;

appendToSelectedItemsCarousel = function(item) {
 var lastCarouselItem = $("#selected-items-carousel .carousel-inner .item .item-elements").last();
 var lastCarouselItemItems = parseInt(lastCarouselItem.children(".selected-item-box").length);

 if(lastCarouselItemItems == max) {
    console.log("NEW CAROUSEL ITEM")
    var newCarouselItem = $.newCarouselItem();
    newCarouselItem.children(".item-elements").append(selectedItemsCarouselItem(item));
    $("#selected-items-carousel .carousel-inner").append(newCarouselItem);
 } else {
    console.log("append item to current carousel item");
    lastCarouselItem.append(selectedItemsCarouselItem(item));
 }

 // $("#selected-items-carousel")
};

$.newCarouselItem = function() {
		var item = $("<div />", {class:"item"});
		var itemInnerLeft = $("<div />", {class:"col-md-1"});
		var itemInnerCenter = $("<div />", {class:"item-elements col-md-10"});
		var itemInnerRight = $("<div />", {class:"col-md-1"});
		item.append(itemInnerLeft);
		item.append(itemInnerCenter);
		item.append(itemInnerRight);
		return item;
};

selectedItemsCarouselItem = function(item) {
        var selectedItemBox = $("<div />", {class:"selected-item-box col-md-2", id: "selected-item-"+item.id});
        var selectedItem = $("<div />", {class:"selected-item"});
        selectedItemBox.append(selectedItem);
        selectedItem.append($("<a />", {href:"#", class:"selected-item-title", "text": item.items[0].title}));
        selectedItem.append($('<img/>', { "src" : item.items[0].images[0], alt : item.items[0].title }));
        return selectedItemBox;
};
	/*
	selectedItemsCarouselItem = function(from, to, images, modalSelector) {
		var item = $("<div />", {class:"item"});
		var itemInnerLeft = $("<div />", {class:"col-md-1"});
		var itemInnerCenter = $("<div />", {class:"item-elements col-md-10"});
		var itemInnerRight = $("<div />", {class:"col-md-1"});
		
		if(from == 0) {
			item.addClass("active");
		}
		for(var i = from; i<to; i++) {
			var img = $("<img />", {src:images[i]});
			if(i == 0) {
				img.addClass("first");
				$(modalSelector + " .modal-body-down img").attr("src", images[i]);
				$(modalSelector + " .modal-body-up .first").css("border", "5px solid #999");
			}
			itemInnerCenter.append(img);
		};
		item.append(itemInnerLeft);
		item.append(itemInnerCenter);
		item.append(itemInnerRight);
		return item;
	};
	
	buildSelectedItemsCarousel = function(item, modalSelector){
		var root = $("<div />", {
			class:"carousel slide", 
			"data-ride":"carousel",
			"data-interval": "false",
			id: "selected-items-carousel" });
		var body = $("<div />", {class:"carousel-inner"});

		var carouselItemSize = 5;
		// TODO img existenetes en carousel mas la que estoy queriendo crear...
		var availableImages = $(modalSelector+ " .selected-item-box").length + 1;
		// var availableImages = 1;
		// var needCarousel = availableImages > carouselItemSize;
		var needCarousel = true;
		
		var rest = Math.floor(availableImages % carouselItemSize);
		var completeCarouselItems = Math.floor(availableImages / carouselItemSize);
		
		console.log("completeCarouselItems: " + completeCarouselItems);
		
		for(var i = 0; i < completeCarouselItems; i++) {
			
			console.log("B apending from " + (i * carouselItemSize) + " to " + ((i * carouselItemSize) + carouselItemSize) +  " of " + availableImages );
			
			body.append(selectedItemsCarouselItem(
					i * carouselItemSize, 
					(i * carouselItemSize) + carouselItemSize, 
					item.items[0].image[0], modalSelector));
		}
		
		if(rest != 0) {
		
			console.log("C apending from " +(item.items[0].images.length - rest) + " to " + availableImages + " of " + availableImages );
			
			body.append(selectedItemsCarouselItem(
					item.items[0].images.length - rest, 
					item.items[0].images.length, 
					item.items[0].images, modalSelector));
		}
		
		root.append(body);
		
		if(needCarousel) {
			var left = $("<a />", {
				class:"left carousel-control",
				"data-slide":"prev",
				href: "#carousel-"+item.id})
				.append($("<span />", {class:"glyphicon glyphicon-chevron-left"}));
			
			var right = $("<a />", {
				class:"right carousel-control",
				"data-slide":"next",
				href: "#carousel-"+item.id})
				.append($("<span />", {class:"glyphicon glyphicon-chevron-right"}));
			
			root.append(left);
			root.append(right);
		}
		
		$(modalSelector + " .modal-body-up").append(root);
		
		$(modalSelector + " .modal-body-up .item")
		.on("mouseenter", "img", function(e){
			$(modalSelector + " .modal-body-down img").attr("src", e.target.src);
			// reset all
			$(modalSelector + " .modal-body-up img").css("border", "1px solid #ddd");
			// edit selected
			$(e.target).css("border", "1px solid #999");
		});
	};
	*/
});
