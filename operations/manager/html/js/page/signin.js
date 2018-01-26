var SigninPage = {
	action: {},
	variables: {}
}


SigninPage.action.submit = () => {


	//make request
	//add cookie
	//then redirect
	document.location="/index.html";
};




$(document).ready(() => {

	$(".signin-form-submit").click(SigninPage.action.submit);

})

