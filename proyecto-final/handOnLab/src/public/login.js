const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  console.log("haciendo login...");
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      console.log("creando carrito...");
      fetch("/api/carts", {
        method: "POST",
        body: JSON.stringify({ products: [] }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((cart) => {
          console.log("guardando cartId y redirigiendo...");
          localStorage.setItem("cartId", cart._id);
          window.location.href = "/products";
        });
    }
  });
});
