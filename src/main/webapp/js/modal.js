$(function(){
	modal = function(item) {
	    
		var fade = $('<div/>', { class : "modal fade detailBox", id: item.id});
		var content = $('<div/>', { class : "modal-content"});
		var dialog = $('<div/>', { class : "modal-dialog"});
		var header = $('<div/>', { class : "modal-header"});
		var body = $('<div/>', { class : "modal-body"});
		var footer = $('<div/>', { class : "modal-footer"});
		
		var bodyContent = $('<p/>', { text : "modal-body content demo"});
		
		bodyContent.appendTo(body);
		
		var purchaseButton = $('<button/>', { 
			class : "btn btn-primary",
			"type": "button", 
			text: "Comprar"			
		});
		
		purchaseButton.appendTo(footer);
		
		var headerButton = $('<button/>', { 
			class : "close",
			"type": "button", 
			"data-dismiss": "modal",
			"aria-hidden":"true",
			text: "x"			
		});
		
		var headerTitle = $('<h4/>', { 
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