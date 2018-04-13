
var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var getAndDisplaySessionsData = () => {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/sessions?_skey=${in_skey}`,
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

			$(".gc-sessionscont").removeClass("loading");


			for (var i = 0; i < response.data.length; i++){
				let session = (response.data[i]);

				let template = `
<tr>
	<td class="collapsing">
		<div class="ui">
			${(session.active==1)?'<button class="ui button " onclick="signout(\''+session.session_key+'\');">Sign out</button>':''}
		</div>
	</td>
	<td>${session.user_id}</td>
	<td>${session.session_key}</td>
	<td>${session.next}</td>
	<td>${session.timeout}</td>
	<td>${new Date(session.timeout*1000).toString().split(" (")[0]}</td>
	<td>${session.created_at.replace("T", " ").replace(".000Z","")}</td>
	<td>${(session.active==1)?'yes':'no'}</td>
</tr>`
				;

				$(".gc-sessionscont").find("tbody").append(template);
			}


		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}

	});

}


var signout = (session_key) => {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/auth/signout?_skey=${session_key}`,
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


			document.location.reload();
			document.location = document.location;


		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}

	});

}





$(document).ready(() => {

	getAndDisplaySessionsData();

})