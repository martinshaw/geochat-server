var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var origin_map = "";
var recipient_map = "";


// var getAndDisplayMessagesData = () => {

// 	var settings = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": `http://${in_host}/api/v0.1/messages?_skey=${in_skey}`,
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

// 			$(".gc-messagescont").removeClass("loading");


// 			for (var i = 0; i < response.data.length; i++){
// 				let message = (response.data[i]);
			
// 				let template = `
// 					<tr>
// 						<td class="collapsing">
// 							<div class="ui">
// 								${(message.active==1)?'<button class="ui button " onclick="delete(\''+message.id+'\');">Delete</button>':''}
// 							</div>
// 						</td>
// 						<td>${message.id}</td>
// 						<td><a href="globe.html?lat=${message.origin_lat}&long=${message.origin_long}">${message.origin_lat}, ${message.origin_long}</a></td>
// 						<td><a href="globe.html?lat=${message.recipient_lat}&long=${message.recipient_long}">${message.recipient_lat}, ${message.recipient_long}</a></td>
// 						<td>${message.user_id}</td>
// 						<td>${message.session_id}</td>
// 						<td>${(message.is_anonymaus==1)?'yes':'no'}</td>
// 						<td>${message.message_type}</td>
// 						<td>"${message.contents}"</td>
// 						<td>"${message.contents_extra}"</td>
// 						<td>${message.created_at.replace("T", " ").replace(".000Z","")}</td>
// 						<td>${message.updated_at.replace("T", " ").replace(".000Z","")}</td>
// 						<td>${(message.active==1)?'yes':'no'}</td>
// 					</tr>`
// 				;

// 				$(".gc-messagescont").find("tbody").append(template);
// 			}


// 		} else {

// 			let error_msg = response.error_msg;
// 			alert(error_msg);
// 			document.location.reload();

// 		}

// 	});

// }


// // var delete = (session_key) => {

// // 	var settings = {
// // 		"async": true,
// // 		"crossDomain": true,
// // 		"url": `http://${in_host}/api/v0.1/auth/signout?_skey=${session_key}`,
// // 		"method": "GET",
// // 		"headers": {},	
// // 		"data": {},	
// // 		"error": function (xhr, ajaxOptions, thrownError){
// // 			alert("404 - Specified host cannot be found!");
// // 		},
// // 		"timeout": 2500
// // 	}

// // 	$.ajax(settings).done(function (response) {

// // 		// Load server status data
// // 		if (response.error_msg == null) {


// // 			document.location.reload();
// // 			document.location = document.location;


// // 		} else {

// // 			let error_msg = response.error_msg;
// // 			alert(error_msg);
// // 			document.location.reload();

// // 		}

// // 	});

// // }



var doOriginLocationSearch = (e) => {

	$ele = $(e.target);

	GMaps.geocode({
		address: $ele.val(),
		callback: function(results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				origin_map.setCenter(latlng.lat(), latlng.lng());

				$("input[name='origin_lat']").val(latlng.lat());
				$("input[name='origin_long']").val(latlng.lng());
			}
		}
	});

}

var doRecipientLocationSearch = (e) => {
	
	$ele = $(e.target);

	GMaps.geocode({
		address: $ele.val(),
		callback: function(results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				recipient_map.setCenter(latlng.lat(), latlng.lng());

				$("input[name='recipient_lat']").val(latlng.lat());
				$("input[name='recipient_long']").val(latlng.lng());
			}
		}
	});

}





var updateOriginMapTextboxes = (e) => {
	$("input[name='origin_lat']").val(e.latLng.lat());
	$("input[name='origin_long']").val(e.latLng.lng());
}

var updateRecipientMapTextboxes = (e) => {
	$("input[name='recipient_lat']").val(e.latLng.lat());
	$("input[name='recipient_long']").val(e.latLng.lng());
}





$(document).ready(() => {
	 
	origin_map = new GMaps({
		div: '#map_origin',
		lat: 53.4807593,
		lng: -2.2426305,
		click: updateOriginMapTextboxes
	}); 

	recipient_map = new GMaps({
		div: '#map_recipient',
		lat: 53.4807593,
		lng: -2.2426305,
		click: updateRecipientMapTextboxes
	});


	$("input[name='origin_search']").keyup(doOriginLocationSearch);
	$("input[name='recipient_search']").keyup(doRecipientLocationSearch);

})