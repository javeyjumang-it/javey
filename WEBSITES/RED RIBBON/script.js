// Red Ribbon Complete E-Commerce - Tanduay JS Clone (6 Cakes, Full Cart/Modals/Promo)

// Products Array - 6 Signature Cakes
const products = [
  { name: 'Black Forest', price: 850, imgs: ['images/black-forest.jpg', 'images/black-forest.jpg'], desc: 'Rich chocolate sponge with cherries and fresh cream.', category: 'Chocolate' },
  { name: 'Choco Indulgence', price: 750, imgs: ['images/choco-indulgence.jpg', 'images/choco-indulgence.jpg'], desc: 'Decadent chocolate layers with silky ganache.', category: 'Chocolate' },
  { name: 'Mango Supreme', price: 900, imgs: ['images/mango-supreme.jpg', 'images/mango-supreme.jpg'], desc: 'Fresh mango slices with white chocolate mousse.', category: 'Fruit' },
  { name: 'Ube Macapuno', price: 800, imgs: ['images/ube-macapuno.jpg', 'images/ube-macapuno.jpg'], desc: 'Purple yam cake with coconut strings.', category: 'Ube' },
  { name: 'Red Velvet', price: 950, imgs: ['images/red-velvet.jpg', 'images/red-velvet.jpg'], desc: 'Velvety red cake with cream cheese frosting.', category: 'Red Velvet' },
  { name: 'Sans Rival', price: 700, imgs: ['images/sansrival.jpg', 'images/sansrival.jpg'], desc: 'Crunchy meringue layers with buttercream.', category: 'Meringue' }
];


// Cart - Red Ribbon specific localStorage
let cart = JSON.parse(localStorage.getItem('redribbon_cart')) || [];
let promoCode = '';

// DOM Elements
let detailModal = document.querySelector('.detail-modal');
let cartModal = document.getElementById('cartModal');
let checkoutModal = document.querySelector('.checkout-modal');
let authModal = document.querySelector('.auth-modal');
let hamburger = document.querySelector('.hamburger');
let navMenu = document.querySelector('.nav-menu');
let contactForm = document.getElementById('contact-form');
let checkoutForm = document.getElementById('checkout-form');
let loginForm = document.getElementById('login-form');
let registerForm = document.getElementById('register-form');

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setupEventListeners();
  setupScrollAnimations();
  smoothScrolling();
});

// Event Listeners
function setupEventListeners() {
  if (hamburger) hamburger.addEventListener('click', toggleNavbar);
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn')) return;
      openProductModal(products[index]);
    });
  });
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  [detailModal, cartModal, checkoutModal, authModal].forEach(modal => {
    modal.addEventListener('click', e => e.target === modal && closeModal(modal));
  });
}

// Navbar Mobile
function toggleNavbar() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Smooth Scroll
function smoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      navMenu.classList.remove('active');
    });
  });
}

// Product Modal
function openProductModal(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `₱${product.price}`;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-description').textContent = product.desc;
  document.getElementById('product-main-img').src = product.imgs[0];
  let thumbsHtml = product.imgs.map((img, i) => `<img src="${img}" onclick="changeMainImg(this.src)" ${i===0 ? 'class="active"' : ''}>`).join('');
  document.getElementById('product-thumbs').innerHTML = thumbsHtml;
  document.getElementById('product-qty').value = 1;
  detailModal.style.display = 'flex';
}

function closeProductModal() { detailModal.style.display = 'none'; }

function changeMainImg(src) {
  document.getElementById('product-main-img').src = src;
  document.querySelectorAll('.product-thumbs img').forEach(img => img.classList.remove('active'));
  event.target.classList.add('active');
}

function changeProductQty(change) {
  let qty = parseInt(document.getElementById('product-qty').value) + change;
  if (qty >= 1) document.getElementById('product-qty').value = qty;
}

function addToCartFromDetail() {
  const name = document.getElementById('product-name').textContent;
  const price = parseInt(document.getElementById('product-price').textContent.replace('₱', ''));
  const qty = parseInt(document.getElementById('product-qty').value);
  addToCart(name, price, qty);
  closeProductModal();
  showNotification('Added to cart!', 'success');
}

// Quick Add from Card
function addToCartFromCard(id) {
  const product = products[id];
  addToCart(product.name, product.price, 1);
}

// Cart Functions
function addToCart(name, price, qty = 1) {
  const item = cart.find(item => item.name === name);
  if (item) item.qty += qty;
  else cart.push({ name, price: price, qty, img: products.find(p => p.name === name)?.imgs[0] });

  localStorage.setItem('redribbon_cart', JSON.stringify(cart));
  updateCartBadge();
  showNotification(`${name} added!`, 'success');
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('redribbon_cart', JSON.stringify(cart));
  updateCartUI();
  updateCartBadge();
}

function clearCart() {
  cart = [];
  localStorage.removeItem('redribbon_cart');
  updateCartUI();
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0) || 0;
}

function openCart() {
  updateCartUI();
  cartModal.style.display = 'flex';
}

function closeCart() {
  cartModal.style.display = 'none';
}

function updateCartUI() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal * (promoCode === 'LOVE20' ? 0.8 : 1);
  document.getElementById('cart-subtotal').textContent = `₱${subtotal.toLocaleString()}`;
  document.getElementById('cartTotal').textContent = `₱${total.toLocaleString()}`;
  document.getElementById('cartItems').innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <div>₱${item.price} x ${item.qty} = ₱${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    </div>
  `).join('') : '<p style="text-align:center;color:#666;padding:2rem">Your cart is empty</p>';
}

function openCheckout() {
  closeCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal * (promoCode === 'LOVE20' ? 0.8 : 1);
  document.getElementById('checkout-total').textContent = `₱${total.toLocaleString()}`;
  checkoutModal.style.display = 'flex';
}

function closeCheckout() {
  checkoutModal.style.display = 'none';
}

function closeAuth() {
  authModal.style.display = 'none';
}

function switchTab(tab) {
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Promo & Checkout
function applyPromo() {
  const code = document.getElementById('checkout-promo')?.value.toUpperCase();
  promoCode = code === 'LOVE20' ? 'LOVE20' : '';
  document.getElementById('promo-result') && (document.getElementById('promo-result').textContent = promoCode ? '20% OFF applied!' : 'Invalid code');
  if (promoCode) updateCartUI();
}

function handleCheckout(e) {
  e.preventDefault();
  if (!cart.length) return showNotification('Cart empty!', 'error');
  setTimeout(() => {
    showNotification('Order placed! Thank you ❤️', 'success');
    cart = [];
    localStorage.removeItem('redribbon_cart');
    promoCode = '';
    closeCheckout();
    updateCartBadge();
  }, 1500);
}

// Forms
function handleContactSubmit(e) {
  e.preventDefault();
  showNotification('Message sent!', 'success');
  e.target.reset();
}

function handleLogin(e) {
  e.preventDefault();
  showNotification('Logged in!', 'success');
  closeModal(authModal);
}

function handleRegister(e) {
  e.preventDefault();
  showNotification('Registered!', 'success');
  closeModal(authModal);
}

// Utils
function closeModal(modal) { modal.style.display = 'none'; }

function showNotification(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;top:100px;right:20px;z-index:9999;padding:1rem 1.5rem;background:${type==='success'?'#28a745':'#dc3545'};color:white;border-radius:10px;transform:translateX(300px);transition:all .3s;font-family:Arial`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.transform = 'translateX(0)', 10);
  setTimeout(() => toast.remove(), 3000);
}

// Scroll Animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
  document.querySelectorAll('.animate-fade-in, .product-card, .contact-item, .hero-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all .8s ease';
    observer.observe(el);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu?.classList.contains('active')) toggleNavbar();
});
