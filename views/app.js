(function() {
  const cartBtn = document.querySelectorAll(".btn-add");
  cartBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      console.dir(event.target);
    });
  });
})();
