$(function(){
	
	buildCarousel = function(item, modalSelector){
		var root = $("<div />", {class:"carousel slide", "data-ride":"carousel"
				});
		var body = $("<div />", {class:"carousel-inner"});

		
		var carouselItem = $("<div />", {class:"item, active"});
		$.each(item.items[0].images, function(index, image) {
			
			
			
				
			
			console.log(item.items[0].images.length)
			console.log(item.items[0].images)			
			
			var img = $("<img />", {src:image});
				if(index == 0) {
					img.addClass("first");
						$(modalSelector + " .modal-body-down img").attr("src", image);
					$(modalSelector + " .modal-body-up .first").css("border", "5px solid #999");
				}
				if(index != 0 && index+1 % 4 == 0) {
					console.log("last item")
					carouselItem = $("<div />", {class:"item"});
				}
				console.log("add to item")
				// carouselItem.append(img);
				img.appendTo(carouselItem);
				if(index != 0 &&  index+1 % 4 == 0 || index == item.items[0].images.length -1) {
					console.log("add to body - last or 4 modulo")
					body.append(carouselItem);
				}
		
		});
		
		
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
			"data-slide":"prev"})
			.append($("<span />", {class:"glyphicon glyphicon-chevron-left"}));
		
		var right = $("<a />", {
			class:"right carousel-control",
			"data-slide":"next"})
			.append($("<span />", {class:"glyphicon glyphicon-chevron-right"}));
		
		root.append(left);
		root.append(right);
		$(modalSelector + " .modal-body-up").append(root);
		root.carousel({
			"interval": false
		});
	};
	
});
