$(function() {
	message = {}
	toRate = []
	url = "/service/gifter/recommendation"

	start = function(r) {
		$.ajax(
				{
					type : "POST",
					url : url,
					data : r,
					contentType : "application/json",
					success : function(data, textStatus, jqXHR) {
						$("#mainBox").empty();
						message = data
						$.each(data, function(index, item) {
							toRate.push(index)
							jQuery('<div/>', {
								id : item.id,
								// class: "col-xs-6 col-sm-4"
								class : "col-md-4"
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

							$.each(item.items, function(b, a) {

								$('<a />', {
									href : a.externalURL
								}).append($('<img/>', {
									src : a.image,
									alt : a.title,
									height : "140"
								})).appendTo('#' + item.id)
							})

							$('#' + item.id + " .rateBox").append(
									button("yes-" + item.id, "rateBoxElem",
											"ok"))
							$(".rateBox button#" + "yes-" + item.id).on(
									"click", function(e) {
										e.preventDefault()
										updateRate(e, item.id, index, true)
									});

							$('#' + item.id + " .rateBox").append(
									button("no-" + item.id, "rateBoxElem",
											"remove"))
							$(".rateBox button#" + "no-" + item.id).on("click",
									function(e) {
										e.preventDefault()
										updateRate(e, item.id, index, false)
									});
						});
					},
					dataType : "json"
				}).fail(function(err) {
			console.log("errores");
			console.log(err);
		});
	}

	start(JSON.stringify({
		scores : []
	}));

	updateRate = function(event, itemId, index, score) {

		if ($.inArray(index, toRate) > -1) {
			toRate.splice(toRate.indexOf(index), 1);
		}
		message[index].userScore = score

		var color = score ? "success" : "danger"
		var otherColor = score ? "danger" : "success"
		$(event.delegateTarget).addClass("btn-" + color)

		var otherButton = score ? "no" : "yes"
		$("#" + otherButton + "-" + itemId).removeClass("btn-" + otherColor)
				.addClass("btn-default")

		if (toRate.length === 0) {
			console.log(JSON.stringify({
				scores : message
			}))
			start(JSON.stringify({
				scores : message
			}));
		}
	}

	button = function(id, clazz, icon) {
		return "<button id=\"" + id
				+ "\" type=\"button\" class=\"btn btn-default " + clazz
				+ "\"><span class=\"glyphicon glyphicon-" + icon
				+ "\"></span></button>";
	}

});