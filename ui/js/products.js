// retrieve tocken
const token = localStorage.getItem("token");
const access_token = "Bearer " + token;

if (token === null){
  alert('Please login');
}

// this is a filter box
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}




window.onload=function viewProducts(){
  fetch('https://hingastores.herokuapp.com/api/v2/products', {
    'method': 'GET',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': access_token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'GET',
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let table=document.getElementById("myTable");

    header=`
          <tr class="header">
                <th style="width:5%;">ID</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Category</th>
                <th style="width:5%;">Quantity</th>
                <th style="width:5%;">Price/Unit</th>
                <th style="width:5%;">Action</th>
                <th style="width:5%;">Action</th>
              </tr>
           `;

      table.innerHTML=header;


    data['products'].forEach(function(product){
      let item=JSON.stringify(product);
      item="  "+ item +"  ";
    

      table.innerHTML += '<tr>'+
      '<td>'+product.id +'</td>'+
      '<td>'+ product.name +'</td>'+
      '<td>'+ product.category + '</td>'+
      '<td>'+ product.quantity + '</td>'+
      '<td>'+ product.price + '</td>'+
      '<td>'+ `<button onclick='setEditForm(${item})'>update</button>` + '</td>'+
      '<td>'+ `<button onclick='deleteProd(${item})'>delete</button>` + '</td>'+
      '</tr>';

    });
  });
};



function setEditForm(product){

document.getElementById('id').value=product.id;
document.getElementById('category').value=product.category;
document.getElementById('name').value=product.name;
document.getElementById('quantity').value=product.quantity;
document.getElementById('price').value=product.price;

  console.log(product);


}


function deleteProd(product) {

  if (confirm("are you sure you want to delete?")) {
      url = 'https://hingastores.herokuapp.com/api/v2/products/' + product.id;
      console.log(url)
      fetch(url, {
              method: 'DELETE',
              headers: {
                  'accept': 'application/json',
                  'Content-type': 'application/json',
                  'Authorization': access_token,
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Request-Method': 'DELETE',
              },
          })
          
          .then(response => response.json().then(
              payload => ({ status: response.status, body: payload })
          ))
          .then(payload => {
              let message = payload.body.message;
              if (payload.status === 200) {
                  //notify success message
                  document.getElementById('notification').innerHTML = message;
                  document.getElementById('notification').className = "success";

                  setTimeout(() => {
                      document.getElementById('notification').removeAttribute("class");
                      document.getElementById('notification').innerHTML = "";
                  }, 2500);

              } else {
                  // notify  errors 
                  document.getElementById('notification').innerHTML = message;
                  document.getElementById('notification').className = "error";
                  setTimeout(() => {
                      document.getElementById('notification').removeAttribute("class");
                      document.getElementById('notification').innerHTML = "";
                  }, 2500);
              }

          });
  }
}