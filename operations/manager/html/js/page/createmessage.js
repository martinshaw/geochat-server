var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");

var origin_map = "";
var recipient_map = "";


var sendMessage = (e) => {

	e.preventDefault();

	// "data": {
	// 		origin_lat: 43.51557697461821,
	// 		origin_long: 0.40359170839838043,
	// 		recipient_lat: 55.75034105019281,
	// 		recipient_long: 37.614317283575474,
	// 		user_id: 11,
	// 		session_id: 93,
	// 		is_anonymaus: 0,
	// 		message_type: "TEXT",
	// 		contents: "testing!!!",
	// 		contents_extra: "",
	// 		_skey: in_skey
	// 	},	

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/messages`,
		"method": "POST",
		"headers": {},
		"data": {
			origin_lat:$("input[name='origin_lat']").val(),
			origin_long:$("input[name='origin_long']").val(),
			recipient_lat:$("input[name='recipient_lat']").val(),
			recipient_long:$("input[name='recipient_long']").val(),
			user_id:$("input[name='user_id']").val(),
			session_id:$("input[name='session_id']").val(),
			is_anonymaus:$("input[name='is_anonymaus']").val(),
			message_type:$("input[name='message_type']").val(),
			contents:$("textarea[name='contents']").val(),
			contents_extra:$("textarea[name='contents_extra']").val(),
			_skey: in_skey
		},	
		"error": function (xhr, ajaxOptions, thrownError){
			alert("404 - Specified host cannot be found!");
		},
		"timeout": 2500
	}

	$.ajax(settings).done(function (response) {

		// Load server status data
		if (response.error_msg == null) {

			alert("ok, sent!");


		} else {

			let error_msg = response.error_msg;
			console.error(error_msg);
			alert(error_msg);
			// document.location.reload();

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

	$('.ui.checkbox').checkbox();
	$('.ui.dropdown').dropdown();

	$(".sendMessage").click(sendMessage);


})