$(function(){
	detailModal = function(item) {
	    
		var fade = $('<div/>', { class : "modal fade detailBox ", id: item.id, "tabindex":"-1"});
//		var fade = $('<div/>', { class : "fade detailBox", id: item.id});
		var content = $('<div/>', { class : "modal-content container-fluid"});
		var dialog = $('<div/>', { class : "modal-dialog"});
		var header = $('<div/>', { class : "modal-header"});
		var body = $('<div/>', { class : "modal-body row"});
		var bodyLeft = $('<div/>', { class : "modal-body-left col-md-2"});
		var bodyRight = $('<div/>', { class : "modal-body-right col-md-10"});
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
		
		var headerTitle = $('<h4/>', { 
			class : "modal-title item-title-box",
			text: item.items[0].title
		});
		
//		headerButton.appendTo(header);
		breadcrumb(item.name, header);
		headerTitle.appendTo(header);
		
//		var container = $("<div />", {class: "container-fluid"});
		var container = $("<div />", {class: "buttons"});
//		var left = $("<div />", {class: "col-md-10"});
//		var right = $("<div />", {class: "col-md-1"}); 
//		container.append(left);
//		container.append(right);
//		left.append(headerTitle);
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
});