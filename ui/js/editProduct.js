document.getElementById("submit").addEventListener("click",updateProduct)

function updateProduct(e){
e.preventDefault()
  let product = {
    id: document.getElementById('id').value,
    category: document.getElementById('category').value,
    name: document.getElementById('name').value,
    quantity: document.getElementById('quantity').value,
    price: document.getElementById('price').value
  };

  let url='https://hingastores.herokuapp.com/api/v2/products/'+product.id
  fetch(url,{
      'method':'PUT',
      'headers':{
        'Authorization':access_token,
        'Content-type':'application/json'
      },
      body:JSON.stringify(product)
  })
  .then((res) => res.json())
  .then((data) => console.log(data))

}