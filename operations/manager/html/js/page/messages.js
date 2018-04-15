
var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var messages = [];

var getAndDisplayMessagesData = () => {

	messages = {};

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/messages?_skey=${in_skey}`,
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

			$(".gc-messagescont").removeClass("loading");


			for (var i = 0; i < response.data.length; i++){
				let message = (response.data[i]);

				messages[messages.id] = message;
			
				let template = `
					<tr>
						<td class="collapsing">
							<div class="ui">
								${(message.active==1)?'<button class="ui button " onclick="delete(\''+message.id+'\');">Delete</button>':''}
							</div>
						</td>
						<td><a onclick="locateOnMap(${message.id});" href="#">${message.id}</a></td>
						<td><a href="globe.html?lat=${message.origin_lat}&long=${message.origin_long}">${message.origin_lat}, ${message.origin_long}</a></td>
						<td><a href="globe.html?lat=${message.recipient_lat}&long=${message.recipient_long}">${message.recipient_lat}, ${message.recipient_long}</a></td>
						<td>${message.user_id}</td>
						<td>${message.session_id}</td>
						<td>${(message.is_anonymaus==1)?'yes':'no'}</td>
						<td>${message.message_type}</td>
						<td>"${message.contents}"</td>
						<td>"${message.contents_extra}"</td>
						<td>${message.created_at.replace("T", " ").replace(".000Z","")}</td>
						<td>${message.updated_at.replace("T", " ").replace(".000Z","")}</td>
						<td>${(message.active==1)?'yes':'no'}</td>
					</tr>`
				;

				$(".gc-messagescont").find("tbody").append(template);
			}


		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}

	});

}


// var delete = (session_key) => {

// 	var settings = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": `http://${in_host}/api/v0.1/auth/signout?_skey=${session_key}`,
// 		"method": "GET",
// 		"headers": {},	
// 		"data": {},	
// 		"error": function (xhr, ajaxOptions, thrownError){
// 			alert("404 - Specified host cannot be found!");
// 		},
// 		"timeout": 2500
// 	}

// 	$.ajax(settings).done(function (response) {

// 		// Load server status data
// 		if (response.error_msg == null) {


// 			document.location.reload();
// 			document.location = document.location;


// 		} else {

// 			let error_msg = response.error_msg;
// 			alert(error_msg);
// 			document.location.reload();

// 		}

// 	});

// }





$(document).ready(() => {

	getAndDisplayMessagesData();

})