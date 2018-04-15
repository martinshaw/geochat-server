var tick = 1;

$(() => {

	tick = setInterval(() => {

		console.log("tick");

		// Console log
		$.get("/getLogContents/console.log", {}, (d) => {

			$("#console_log").html("");

			for (var i = 0; i < d.split("\n").length; i++) {
				let _ele = $(`<li>${d.split("\n")[i]}</li>`);
				$('#console_log').append(_ele);
			}

			if (document.getElementById('console_scroll').checked == true){
				document.getElementById("console_log").scrollTop = document.getElementById("console_log").scrollHeight;
			}

		});

		// Errors log
		$.get("/getLogContents/errors.log", {}, (d) => {

			$("#errors_log").html("");

			for (var i = 0; i < d.split("\n").length; i++) {
				let _ele = $(`<li>${d.split("\n")[i]}</li>`);
				$('#errors_log').append(_ele);
			}

			if (document.getElementById('errors_scroll').checked == true){
				document.getElementById("errors_log").scrollTop = document.getElementById("errors_log").scrollHeight;
			}

		});

	}, 5000);


	$('#console_clear').click(()=>{

		$.get("/getLogContents/console.log/clear", {}, (d) => {
			document.reload();
		});

	});

	$('#errors_clear').click(()=>{

		$.get("/getLogContents/errors.log/clear", {}, (d) => {
			document.reload();
		});

	});


});