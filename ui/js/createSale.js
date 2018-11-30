const token = localStorage.getItem("token")
const access_token = "Bearer " + token

document.getElementById('add-sale').addEventListener('submit', createSale)

function createSale(e) {
	e.preventDefault();

	let url = "https://hingastores.herokuapp.com/api/v2/sales";

	let data = {
		product_id: document.getElementById('id').value,
		quantity: document.getElementById('quantity').value
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