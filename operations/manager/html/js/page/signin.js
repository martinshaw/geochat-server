var SigninPage = {
	action: {},
	variables: {}
}


SigninPage.action.submit = () => {

	let in_host = $("form.signin-form").find("input[name='host']").val();
	let in_email = $("form.signin-form").find("input[name='email_address']").val();
	let in_pass = $("form.signin-form").find("input[name='password']").val();

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `http://${in_host}/api/v0.1/auth/signin?email_address=${in_email}&password=${in_pass}`,
		"method": "GET",
		"headers": {},
		"data": {},
		"error": function (xhr, ajaxOptions, thrownError){
			alert("404 - Specified host cannot be found!");
		},
		"timeout": 2500
	}

	$.ajax(settings).done(function (response) {

		// User has successfully signed in and we have received a session key. Proceed to overview page...
		if (response.error_msg == null) {

			Cookies.set('gc-host', $("form.signin-form").find("input[name='host']").val());
			Cookies.set('gc-skey', response.data.session.session_key);

			document.location = "/index.html"

		} else {

			let error_msg = response.error_msg;
			alert(error_msg);
			document.location.reload();

		}
	});

};




$(document).ready(() => {

	$(".signin-form-submit").click(SigninPage.action.submit);

	$("form.signin-form").find("input[name='host']").val(document.location.hostname + ":8001");

})

