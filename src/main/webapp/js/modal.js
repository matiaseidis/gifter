$(function(){
	
	detailModal = function(item) {
	    
		var fade = $('<div/>', { class : "modal fade detailBox ", id: item.id, "tabindex":"-1"});
		var content = $('<div/>', { class : "modal-content container-fluid"});
		var dialog = $('<div/>', { class : "modal-dialog"});
		var header = $('<div/>', { class : "modal-header"});
		var body = $('<div/>', { class : "modal-body row"});
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
				modalRendered.push(index);

			} else {
				console.log("not missing... skip building");
			}
		});
		modal.modal('show', {keyboard: true});
	};
});