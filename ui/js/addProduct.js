const token = localStorage.getItem("token")
const access_token = "Bearer " + token

document.getElementById('add-product').addEventListener('submit', createProduct)

function createProduct(e) {
	e.preventDefault();

	let url = "https://hingastores.herokuapp.com/api/v2/products";

	let data = {
		category: document.getElementById('category').value,
		name: document.getElementById('name').value,
		quantity: document.getElementById('quantity').value,
		price: document.getElementById('price').value
	};

	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json',
			'Authorization': access_token
		},
		body: JSON.stringify(data)
	})
	.then((res) => res.json())
	.then((data) => console.log(data))
}