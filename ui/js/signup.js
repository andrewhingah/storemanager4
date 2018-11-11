// event listener waits for a click on submit button
document.getElementById('signup').addEventListener('submit', signup)

// this function is called when the listener responds to a submit event
function signup(e){
	// prevent default behaviour
	e.preventDefault();

	// define url
	let url = "https://hingastores.herokuapp.com/api/v2/auth/signup"

	// get signup data from signup ui
	let data = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		password: document.getElementById('password').value,
		role: document.getElementById('role').value
	};

	let signupData = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	// use the fetch api
	fetch(url, signupData)
	.then(function(response) {return response.json()})
	.then(function(response){

		if (response.message === "User created!") {
			window.location.href = "products-att.html";
		}
	console.log(response.status)
	console.log(response.message)
	})
}