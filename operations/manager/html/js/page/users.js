
var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var getAndDisplayUsersData = () => {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/users`,
		"method": "GET",
		"headers": {'Geochat-Session-Key':in_skey},
		"data": {},	
		"error": function (xhr, ajaxOptions, thrownError){
			alert("404 - Specified host cannot be found!");
		},
		"timeout": 2500
	}

	$.ajax(settings).done(function (response) {

		// Load server status data
		if (response.error_msg == null) {

			$(".gc-userscont").removeClass("loading");


			for (var i = 0; i < response.data.length; i++){
				let user = (response.data[i]);
			
				let template = `
					<tr>
						<td class="collapsing">
							<div class="ui">
								${(user.active==1)?'<button class="ui button " onclick="delete(\''+user.id+'\');">Delete</button>':''}
							</div>
						</td>
						<td>${user.id}</td>
						<td>${user.first_name}</td>
						<td>${user.last_name}</td>
						<td>${user.email_address}</td>
						<td>${user.password}</td>
						<td>${user.created_at.replace("T", " ").replace(".000Z","")}</td>
						<td>${user.updated_at.replace("T", " ").replace(".000Z","")}</td>
						<td>${(user.active==1)?'yes':'no'}</td>
					</tr>`
				;

				$(".gc-userscont").find("tbody").append(template);
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

	getAndDisplayUsersData();

})