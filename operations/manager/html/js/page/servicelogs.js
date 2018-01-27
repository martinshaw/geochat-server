var tick = 1;

$(() => {

	tick = setInterval(() => {

		console.log("tick");

		// Console log
		$.get("/getLogContents/console.log", {}, (d) => {
			$('#console_log').text(d);
		});

		// Errors log
		$.get("/getLogContents/errors.log", {}, (d) => {
			$('#errors_log').text(d);
		});

	}, 1000);


});