$(function(){
	modal = function(itemId) {
	    
		var fade = jQuery('<div/>', { class : "modal fade detailBox", id: itemId});
		var content = jQuery('<div/>', { class : "modal-content"});
		var dialog = jQuery('<div/>', { class : "modal-dialog"});
		var header = jQuery('<div/>', { class : "modal-header"});
		var body = jQuery('<div/>', { class : "modal-body"});
		var footer = jQuery('<div/>', { class : "modal-footer"});
		
		var bodyContent = jQuery('<p/>', { text : "modal-body content demo"});
		
		bodyContent.appendTo(body);
		
		var purchaseButton = jQuery('<button/>', { 
			class : "btn btn-primary",
			"type": "button", 
			text: "Comprar"			
		});
		
		purchaseButton.appendTo(footer);
		
		var headerButton = jQuery('<button/>', { 
			class : "close",
			"type": "button", 
			"data-dismiss": "modal",
			"aria-hidden":"true",
			text: "x"			
		});
		var headerTitle = jQuery('<h4/>', { 
			class : "modal-title",
			text: "Modal title"
		});
		
		headerButton.appendTo(headerTitle);
		headerTitle.appendTo(header);
		
		
		header.appendTo(content);
		body.appendTo(content);
		footer.appendTo(content);

		content.appendTo(dialog);
		dialog.appendTo(fade);
		
		return fade;
	};
});