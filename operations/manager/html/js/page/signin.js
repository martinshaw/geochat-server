var SigninPage = {
	action: {},
	variables: {}
}


SigninPage.action.submit = () => {

	$.ajax({
		method: "GET",
		url: "http://" + $("form.signin-form").find("input[name='host']").val() + "/api/v0.1/auth/signin", 
		dataType: 'json',
		data: { email_address: $("form.signin-form").find("input[name='email_address']").val(), password: $("form.signin-form").find("input[name='password']").val()},
		always: function( data ) {
			console.log( data );
		}
	});

};




$(document).ready(() => {

	$(".signin-form-submit").click(SigninPage.action.submit);

	$("form.signin-form").find("input[name='host']").val(document.location.host);

})

