$(document).ready (() =>{

	// Avoid white flash
	$('body').addClass("ready");

	$('.ui.menu .ui.dropdown').dropdown({
		on: 'hover'
	});

	$('.ui.menu a.item').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});


	
})