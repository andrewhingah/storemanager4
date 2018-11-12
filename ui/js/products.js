// retrieve tocken
const token = localStorage.getItem("token")
const access_token = "Bearer " + token

if (token === null){
  alert('Please login')
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
    headers: {
      'method': 'GET',
      'Content-Type': 'application/json',
      'Authorization': access_token
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

    let table=document.getElementById("myTable");

    header=`
          <tr class="header">
                <th style="width:10%;">ID</th>
                <th style="width:10%;">Name</th>
                <th style="width:10%;">Category</th>
                <th style="width:10%;">Quantity</th>
                <th style="width:10%;">Price/Unit</th>
                <th style="width:10%;">Update</th>
              </tr>
           `

      table.innerHTML=header


    data['products'].forEach(function(product){
      console.log(product.price)
      table.innerHTML += '<tr>'+
      '<td>'+product.id +'</td>'+
      '<td>'+ product.name +'</td>'+
      '<td>'+ product.category + '</td>'+
      '<td>'+ product.quantity + '</td>'+
      '<td>'+ product.price + '</td>'+
      '</tr>';

    });
  })
}
