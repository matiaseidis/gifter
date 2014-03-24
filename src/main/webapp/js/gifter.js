$(function() {
			message = {}
			toRate = []
			url = "/service/gifter/recommendation"
			
			start = function(r){
				$.ajax({
					type : "POST",
					url : url,
					data : r,
					contentType : "application/json",
					success : function(data, textStatus, jqXHR) {
						$("#mainBox").empty();
						message=data
						$.each(data, function(index, item) {
						toRate.push(index)
							jQuery('<div/>', {
								id : item.id,
//								class: "col-xs-6 col-sm-4"
								class: "col-md-4"
							}).appendTo('#mainBox')
							jQuery('<div/>', {
								text : item.name
							}).appendTo('#' + item.id)
							jQuery('<img/>', {
								src : item.imageURL,
								alt : item.name,
								height : "140"
							}).appendTo('#' + item.id)
							jQuery('<div/>', {
								class : "rateBox"
							}).appendTo('#' + item.id)
							
							$('#' + item.id + " .rateBox").append(button("yes-" + item.id, "rateBoxElem", "ok"))
							$(".rateBox button#"+"yes-" + item.id).on("click", function(e) {
								e.preventDefault()
								updateRate(e, index, true)
							});

							$('#' + item.id + " .rateBox").append(button("no-" + item.id, "rateBoxElem", "remove"))
							$(".rateBox button#"+"no-" + item.id).on("click", function(e) {
								e.preventDefault()
								updateRate(e, index, false)
							});
						});
					}, dataType: "json"
				}).fail(function(err) {
					console.log("errores");
					console.log(err);
				});
			}

			start(JSON.stringify({scores : []}));
			
			updateRate = function(event, index, score) {
				toRate.splice(toRate.indexOf(index),1);
				message[index].userScore=score
//				console.log($(event.delegateTarget))
				
				var color = score ? "success" : "danger"
				$(event.delegateTarget).addClass("btn-"+color)
				
				if(toRate.length === 0) {
					console.log(JSON.stringify({scores : message}))
					start(JSON.stringify({scores : message}));
				}
			}
			
			button = function(id, clazz, icon) {
				return "<button id=\""+id+"\" type=\"button\" class=\"btn btn-default "+clazz+"\"><span class=\"glyphicon glyphicon-"+icon+"\"></span></button>";
			}
			
		});