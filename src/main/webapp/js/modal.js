$(function(){
	
	detailModal = function(item) {
	    
		var fade = $('<div/>', { class : "modal fade detailBox ", id: item.id, "tabindex":"-1"});
		var content = $('<div/>', { class : "modal-content container-fluid"});
		var dialog = $('<div/>', { class : "modal-dialog"});
		var header = $('<div/>', { class : "modal-header"});
		var body = $('<div/>', { class : "modal-body row"});
//		var bodyLeft = $('<div/>', { class : "modal-body-up col-md-12 ch-carousel ch-carousel-mask"});
//		var bodyLeft = $('<div/>', { class : "modal-body-up col-md-12"});
//		var bodyRight = $('<div/>', { class : "modal-body-down col-md-12"});
		var bodyLeft = $('<div/>', { class : "modal-body-up"});
		var bodyRight = $('<div/>', { class : "modal-body-down"});
		var footer = $('<div/>', { class : "modal-footer"});
		
		var bodyContent = $('<img/>');
		
		body.append(bodyLeft);
		bodyContent.appendTo(bodyRight);
		body.append(bodyRight);
		
		var purchaseButton = $("<div />", {class:"btn-group btn-group-sm"}).append(
				$('<button/>', { 
			class : "btn btn-primary",
			"type": "button", 
			text: "Comprar"			
		}));
		
		purchaseButton.appendTo(footer);
		
		var closeButton = $("<div />", {class:"btn-group btn-group-sm"}).append(
				$('<button/>', { 
			class : "btn btn-defaut back",
			"type": "button", 
			"data-dismiss": "modal",
			"aria-hidden":"true",
			text: "Volver"			
		}));
		
//		var headerButton = $('<button/>', { 
//			class : "close",
//			"type": "button", 
//			"data-dismiss": "modal",
//			"aria-hidden":"true",
//			text: "x"			
//		});
//		headerButton.appendTo(header);
		
		var headerTitle = $('<h4/>', { 
			class : "modal-title item-title-box",
			text: item.items[0].title
		});
		
		breadcrumb(item.name, header);
		headerTitle.appendTo(header);
		
		var container = $("<div />", {class: "buttons"});
		container.append(closeButton);
		container.append(purchaseButton);
		container.appendTo(header);
		
		header.appendTo(content);
		body.appendTo(content);
		footer.appendTo(content);
		

		content.appendTo(dialog);
		dialog.appendTo(fade);
		
		return fade;
	};
	
	turnOnModal = function(e, item, index){
		
		e.preventDefault();
		if ($(e.target).is('.likeButton')) {
			console.log("false");
			return false;
		} 
		
		var modalSelector = '#' + item.id + " .detailBox"; 
		var modal = $(modalSelector);

		modal.on('shown.bs.modal', function() {
		
			if($.inArray(index, modalRendered) == -1) {
				console.log("missing... building");
				
				buildCarousel(item, modalSelector);
				
//				var carouselBox = $("<ul />", {class: "ch-carousel-content ch-carousel-list"});
				
//				$.each(item.items[0].images, function(index, image) {
//					var img = $("<li />", {class: "ch-carousel-item"}).append(
//							$("<img />", {
//						src: image
//					})
//				);
//					img.appendTo($(modalSelector + " .modal-body-up"));
//					img.appendTo(carouselBox);
//					if(index == 0) {
//						img.addClass("first");
//						$(modalSelector + " .modal-body-down img").attr("src", image);
//						$(modalSelector + " .modal-body-up .first").css("border", "5px solid #999");
//						
////						$(modalSelector + " .modal-body-down").empty();
////						$(modalSelector + " .modal-body-down").append(zoom(image));
//					}
//				});
//				$(modalSelector + " .modal-body-up img")
//				.on("mouseenter", function(e){
//					$(modalSelector + " .modal-body-down img").attr("src", e.target.src);
//					// reset all
//					$(modalSelector + " .modal-body-up img").css("border", "1px solid #ddd");
//					// edit selected
//					$(e.target).css("border", "5px solid #999");
//				});
				
//				$(modalSelector + " .modal-body-up").append(carouselBox);
//				$(modalSelector + " .modal-body-up").carousel({
//						"pagination": true,
//						"maxItems": 3,
//						"arrows": "outside"});
////				carouselBox.carousel({'fx': false})
////				.on('itemsadd', function ($items) {console.log($items);});
				
				modalRendered.push(index);
			} else {
				console.log("not missing... skip building");
			}
		});
		modal.modal('show', {keyboard: true});
	};
});