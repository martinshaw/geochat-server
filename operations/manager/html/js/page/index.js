
var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var getAndDisplayServerStatus = () => {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/status?_skey=${in_skey}`,
		"method": "GET",
		"headers": {},
		"data": {},	
		"error": function (xhr, ajaxOptions, thrownError){
			alert("404 - Specified host cannot be found!");
		},
		"timeout": 2500
	}

	$.ajax(settings).done(function (response) {

		// Load server status data
		if (response.error_msg == null) {

			$(".gc-serverstatus").removeClass("loading");

			$(".gc-ss-i-host").find(".value").text(response.system.hostname);
			$(".gc-ss-i-host").find(".label").text("Host Name");

			$(".gc-ss-i-freeMemory").find(".value").text(response.system.freeMemory);
			$(".gc-ss-i-freeMemory").find(".label").text("System Free Memory");

			$(".gc-ss-i-nodememusage").find(".value").html(response.node.memoryUsage);
			$(".gc-ss-i-nodememusage").find(".label").text("Server Memory Usage");

			$(".gc-ss-i-uptime").find(".value").text(response.server.uptime + " Secs");
			$(".gc-ss-i-uptime").find(".label").text("Uptime");

			$(".gc-ss-i-startedat").find(".value").html(response.server.started_at.replace("Z", "").replace("T", "&nbsp;&nbsp;-&nbsp;&nbsp;"));
			$(".gc-ss-i-startedat").find(".label").text("Started At");

			$(".gc-ss-i-version").find(".value").html(response.server.version);
			$(".gc-ss-i-version").find(".label").text("Server Version");

			$(".gc-ss-i-requests-total").find(".value").html(response.server.requests.total);
			$(".gc-ss-i-requests-total").find(".label").text("Requests (total)");

			$(".gc-ss-i-requests-lastminute").find(".value").html(response.server.requests.last_minute);
			$(".gc-ss-i-requests-lastminute").find(".label").text("Requests (last minute)");

			$(".gc-ss-i-requests-last5mnavg").find(".value").html(response.server.requests.last_5mn_avg);
			$(".gc-ss-i-requests-last5mnavg").find(".label").text("Requests (last 5 mins avg.)");

			$(".gc-ss-i-requests-last15mnavg").find(".value").html(response.server.requests.last_15mn_avg);
			$(".gc-ss-i-requests-last15mnavg").find(".label").text("Requests (last 15 mins avg.)");

		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}

	});

}





$(document).ready(() => {

	var tick = setInterval (getAndDisplayServerStatus, 4000);

})