$(function() {
  const cartBtn = document.querySelectorAll(".btn-add");
  if (localStorage.getItem("cartitems") === null) {
    var items = [];
    var id = 0;
  } else {
    var items = JSON.parse(localStorage.getItem("cartitems"));
    var id = JSON.parse(localStorage.getItem("cartid"));
  }

  cartBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      // console.log(items);
      //   console.dir(event.target);
      if (event.target.parentElement.classList.contains("btn-add")) {
        // console.log(
        //   event.target.parentElement.parentElement.parentElement
        //     .previousElementSibling.children[0].children[0].src
        // );
        let fullpath =
          event.target.parentElement.parentElement.parentElement
            .previousElementSibling.children[0].children[0].src;
        let pos = fullpath.indexOf("images") + 6;
        let partPath = fullpath.slice(pos);

        let name =
          event.target.parentElement.parentElement.previousElementSibling
            .children[0].children[0].textContent;
        let price =
          event.target.parentElement.parentElement.previousElementSibling
            .children[0].children[1].textContent;
        let finalPrice = price.slice(3);
        // console.log(finalPrice);
        const item = {};
        item.id = id;
        item.img = `images${partPath}`;
        item.name = name;
        item.price = finalPrice;
        items.push(item);
        // console.log(item);
        // console.log(items);
        localStorage.setItem("cartitems", JSON.stringify(items));
        localStorage.setItem("cartid", JSON.stringify(id));
        id++;
        alert("added to cart");
      }
    });
  });
});
