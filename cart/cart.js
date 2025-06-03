const token = localStorage.getItem('access_token'); 
if (!token) {
  window.location.href = '/login/index.html'; 
}
const cartItems = document.querySelector("#cart-items");
let totalPrice = document.querySelector("#total-price");
const clearBtn = document.querySelector("#clear-cart-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Cart is empty</p>";
    totalPrice.textContent = 0;
    return;
  }

  cart.forEach((el, i) => {
    let product = document.createElement("div");
    product.className="cart-item";
    product.innerHTML = `
        <img src="${el.images[0]}" alt="${el.name}" />
          <div>
            <h3>${el.name}</h3>
            <p>${el.price.toLocaleString()} $</p>
            <button onclick="removeItems(${i})">O'chirish</button>
          </div>
        `;
    cartItems.appendChild(product);
    total += el.price;
  });

  totalPrice.textContent = total.toLocaleString();
}

function removeItems(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

clearBtn.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

renderCart();
