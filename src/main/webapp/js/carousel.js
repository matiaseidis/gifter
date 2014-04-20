$(function(){
	
	$.carouselItem = function(from, to, images, modalSelector) {
		var item = $("<div />", {class:"item"});
		var itemInnerLeft = $("<div />", {class:"col-md-1"});
		var itemInnerCenter = $("<div />", {class:"col-md-10"});
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
	
	buildCarousel = function(item, modalSelector){
		var root = $("<div />", {
			class:"carousel slide", 
			"data-ride":"carousel",
			"data-interval": "false",
			id: "carousel-"+item.id });
		var body = $("<div />", {class:"carousel-inner"});

		var carouselItemSize = 4;
		
		if(item.items[0].images.length <= carouselItemSize) {
			console.log("A apending form " + 0 + " to " + item.items[0].images.length + " of " + item.items[0].images.length);
			body.append($.carouselItem(0, item.items[0].images.length, item.items[0].images, modalSelector));
		} else {
			var rest = Math.floor(item.items[0].images.length % carouselItemSize);
			var completeCarouselItems = Math.floor(item.items[0].images.length / carouselItemSize);
			
			console.log("completeCarouselItems: " + completeCarouselItems);
			
			for(var i = 0; i < completeCarouselItems; i++) {
				
				console.log("B apending form " + (i * carouselItemSize) + " to " + ((i * carouselItemSize) + carouselItemSize) +  " of " + item.items[0].images.length );
				
				body.append($.carouselItem(
						i * carouselItemSize, 
						(i * carouselItemSize) + carouselItemSize, 
						item.items[0].images, modalSelector));
			}
			
			if(rest != 0) {
			
				console.log("C apending form " +(item.items[0].images.length - rest) + " to " + item.items[0].images.length + " of " +item.items[0].images.length );
				
				body.append($.carouselItem(
						item.items[0].images.length - rest, 
						item.items[0].images.length, 
						item.items[0].images, modalSelector));
			}
		}
		
		$(modalSelector + " .modal-body-up img")
		.on("mouseenter", function(e){
			$(modalSelector + " .modal-body-down img").attr("src", e.target.src);
			// reset all
			$(modalSelector + " .modal-body-up img").css("border", "1px solid #ddd");
			// edit selected
			$(e.target).css("border", "5px solid #999");
		});
		
		root.append(body);
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
		$(modalSelector + " .modal-body-up").append(root);
//		$(".container").append(root);
//		$("#carousel-"+item.id).carousel(
//				{
//			"interval": false
//		}
//				);
	};
	
});
