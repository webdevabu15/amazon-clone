const token = localStorage.getItem('access_token'); 
if (!token) {
  window.location.href = '/login/index.html'; 
}

const productList = document.querySelector('#all-products');
const searchInput = document.querySelector('#search');
const searchForm = document.querySelector('#searchForm');
const cartCount = document.querySelector('#view-cart-btn');
const categoryButtons = document.querySelectorAll('.category-btn');

let allProducts = []; 
let selectedCategory = 'all';
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch('https://api.escuelajs.co/api/v1/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(data);
    updateCartCount();
  })
  .catch(err => console.error('API xatosi:', err));

function renderProducts(productsToRender) {
  productList.innerHTML = '';
  productsToRender.forEach((el,i) => {
    const product = document.createElement('div');
    product.setAttribute('data-id',el.id)
    product.className = 'product-card';
    product.innerHTML = `
      <img src='${el.images[0]}' alt='${el.title}'/>
      <h3 class='product-info'>${el.title}</h3>
      <p class='price'>${el.price.toLocaleString()} $</p>
      <button class='add-to-cart' onclick='addToCart(${el.id})'>Add to cart</button>
    `;
    productList.appendChild(product);
  });
}

function addToCart(productId) {
  const item = allProducts.find(el => el.id === productId);
  if (!cart.some(el => el.id === item.id)) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}


function searchProducts(event) {
  event.preventDefault();
  const searchVal = searchInput.value.trim().toLowerCase();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchVal) &&
    (selectedCategory === 'all' || product.category.name === selectedCategory)
  );
  renderProducts(filtered);
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.category-btn.active')?.classList.remove('active');
    button.classList.add('active');

    selectedCategory = button.dataset.category;
    filterProducts();
  });
});

function filterProducts() {
  const searchVal = searchInput.value.trim().toLowerCase();
  const filtered = allProducts.filter(product =>
    (selectedCategory === 'all' || product.category.name === selectedCategory) &&
    product.title.toLowerCase().includes(searchVal)
  );
  renderProducts(filtered);
}

productList.addEventListener('click', (e) => {
   if(e.target.closest('.product')){
     const id = e.target.closest('.product').dataset.id
     showProductDetail(+id)
   }
})

function showProductDetail(id) {
  const product = allProducts.find(el => el.id == id)
  const modal = document.querySelector('#product-modal')
  const modalBody = document.querySelector('#modal-body')

  modalBody.innerHTML = `
   <img src='${'./images/fake.png'}'/>
   <h3>${product.title}</h3>
   <p>${product.description}</p>
   <strong>${product.price.toLocaleString()} $</strong>
   <button onClick='addToCart(${product.id})'>Add to cart</button>
  `

  modal.classList.add('show')
}

document.getElementById('close-modal').addEventListener('click',() => {
  document.getElementById('product-modal').classList.remove('show')
})

searchForm.addEventListener('submit', searchProducts);

updateCartCount();
