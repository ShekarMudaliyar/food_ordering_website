items = JSON.parse(localStorage.getItem("cartitems"));

$(document).ready(function() {
  // console.log(items);
  var total = 0.0;
  items.map(element => {
    total += parseFloat(element.price);
  });
  // console.log(total);
  document.getElementById("table-body").innerHTML = `
  ${items
    .map(function(item) {
      return `
    <tr>
    <td class="col-sm-8 col-md-6">
    <div class="media">
        <a class="thumbnail pull-left" href=""><img class="media-object" src="${
          item.img
        }" style="width: 72px; height: 72px;"></a>
    </div>  
         
    <td class="col-sm-1 col-md-1"><div class="media-body">
            <h4 class="media-heading"><a href="#">${item.name}</a></h4>
        </div></td>
    <td class="col-sm-1 col-md-1 text-center"><strong>${
      item.price
    }</strong></td>
    <td class="col-sm-1 col-md-1">
    <button type="button" class="btn btn-danger" onclick="removeitem(${
      item.id
    })">
        <span class="glyphicon glyphicon-remove"></span> Remove
    </button></td>
</tr>`;
    })
    .join("")}
  
      `;
  document.getElementById("totalprice").innerHTML = `
  <h2>Total: ${total}</h2>
  `;
});

function clickbtn() {
  // console.log("heree");
  localStorage.removeItem("cartitems");
  location.reload();
}
var removeByAttr = function(arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      (arguments.length > 2 && arr[i][attr] === value)
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
function removeitem(id) {
  removeByAttr(items, "id", id);
  // console.log(items);
  localStorage.setItem("cartitems", JSON.stringify(items));
  location.reload();
}

function proceed() {
  // console.log(items);
  if (items == null || items.length == 0) {
    alert("cart is empty");
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getitems", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(items));
    window.location = "/proceed";
  }
}
