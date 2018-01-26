var earth;

var messages = [
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

function initialize() {
	var options = { zoom: 1.0, position: [47.19537,8.524404] };
	earth = new WE.map('earth-cont', options); 
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);



	for(var i = 0; i < messages.length; i++){
		var marker = WE.marker(messages[i].latlong).addTo(earth)
		marker.bindPopup('<b>'+messages[i].message+'</b> &nbsp <i>'+messages[i].author+'</i>');
	}

}

