// event listener waits for a click on submit button
document.getElementById('login').addEventListener('submit', login)

// this function is called when the listener responds to a submit event
function login(e){
	// prevent default behaviour
	e.preventDefault();

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
			"Content-Type": "application/json",
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Request-Method': 'POST'
		},
		body: JSON.stringify(data)
	};

	fetch(url, loginData)
	.then ((res) => res.json())
	.then ((data) => {
		localStorage.setItem('token', data.token)
		if(data.message === "Logged in successfully!"){
			window.location.href = 'ui/products.html';
		} else{
			let error_message = document.getElementById('errorMessage')
			if (errorMessage){
				errorMessage.innerHTML = data.message
			}
		}
	})
	.catch((err) => console.log(err))
}