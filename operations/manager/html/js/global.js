$(document).ready (() =>{

	// Avoid white flash
	$('body').addClass("ready");

	$('.ui.menu .ui.dropdown').dropdown({
		on: 'hover'
	});

	$('.ui.menu a.item').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});




	// Redirect to Sign-In screen
	if (document.location.pathname != "/signin.html" && Cookies.get('gc-session_key') == undefined){
		document.location = "/signin.html";
	}

	
})