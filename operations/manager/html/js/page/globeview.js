var in_host = Cookies.get("gc-host");
var in_skey = Cookies.get("gc-skey");


var earth;

var testMessages = [
	{
		message: "Hello!",
		latlong: [51.5, -0.4],
		author: "Martin"
	},
	{
		message: "How are you?",
		latlong: [-100, -50],
		author: "Martin"
	},
	{
		message: "Message #1",
		latlong: [24, 50],
		author: "Martin"
	},
	{
		message: "Message #3",
		latlong: [103, 60],
		author: "Martin"
	},
	{
		message: "Message #2",
		latlong: [180, -0.4],
		author: "Martin"
	},
];



var getMessagesFromAPI = (next) => {

	var messages = [];

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/messages`,
		"method": "GET",
		"headers": {"Geochat-Session-Key": in_skey},
		"data": {},	
		"error": function (xhr, ajaxOptions, thrownError){
			alert("404 - Specified host cannot be found!");
		},
		"timeout": 2500
	}

	$.ajax(settings).done(function (response) {

		// Load server status data
		if (response.error_msg == null) {

			next(response.data);


		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}

	});

}




function initialize() {
	var options = { zoom: 1.0, position: [47.19537,8.524404] };
	earth = new WE.map('earth-cont', options); 
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);



	// for(var i = 0; i < testMessages.length; i++){
	// 	var marker = WE.marker(testMessages[i].latlong).addTo(earth)
	// 	marker.bindPopup('<b>'+testMessages[i].message+'</b> &nbsp <i>'+testMessages[i].author+'</i>');
	// }


	tick = setInterval(function (){
		getMessagesFromAPI(function(msgs) {
			for(var i = 0; i < msgs.length; i++){

				console.log(msgs[i]);

				let origin = [msgs[i].origin_lat, msgs[i].origin_long];
				let recipient = [msgs[i].recipient_lat, msgs[i].recipient_long];
				let name = msgs[i].user_id + " (" + msgs[i].first_name + " " + msgs[i].last_name + ")";

				let path_origin_recipient = WE.polygon([origin, recipient, origin], {
					weight: 5,
					opacity: 0.7		
				});
       			path_origin_recipient.addTo(earth);

				let marker = WE.marker(recipient).addTo(earth);
				marker.bindPopup('<b>'+msgs[i].contents+'</b> &nbsp <i>'+name+'</i><p>'+JSON.stringify(msgs[i])+'</p>');

			}
		});
	}, 5000);

	
	
}



