// event listener waits for a click on submit button
document.getElementById('login').addEventListener('submit', login)

// this function is called when the listener responds to a submit event
function login(e){
	// prevent default behaviour
	event.preventDefault();

	// define url
	let url = "https://hingastores.herokuapp.com/api/v2/auth/login"

	// get login data from login ui
	let data = {
		email: document.getElementById('email').value,
		password: document.getElementById('password').value
	};

	let loginData = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	// use the fetch api
	fetch(url, loginData)
	.then(function(response) {return response.json()})
	.then(function(response){

		if (response.message === "Logged in successfully!") {
			window.location.href = "ui/products-att.html";
		}
	console.log(response.status)
	console.log(response.message)
	})
}