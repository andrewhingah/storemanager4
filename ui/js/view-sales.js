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




window.onload=function viewSales(){
  fetch('https://hingastores.herokuapp.com/api/v2/sales', {
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
                <th style="width:10%;">Quantity</th>
                <th style="width:10%;">Price/Unit</th>
              </tr>
           `

      table.innerHTML=header


    data['Sales'].forEach(function(sale){
      console.log(sale.id)
      table.innerHTML += '<tr>'+
      '<td>'+sale.id +'</td>'+
      '<td>'+ sale.name +'</td>'+
      '<td>'+ sale.quantity + '</td>'+
      '<td>'+ sale.price + '</td>'+
      '</tr>';

    });
  })
}
