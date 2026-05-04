// Tanduay Website JavaScript - Fixed & Complete Cart Functionality

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const productCards = document.querySelectorAll('.product-card');
const detailModal = document.querySelector('.detail-modal');
const cartModal = document.querySelector('.cart-modal');
const checkoutModal = document.querySelector('.checkout-modal');
const authModal = document.querySelector('.auth-modal');
const contactForm = document.getElementById('contact-form');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const checkoutForm = document.getElementById('checkout-form');

// Product Data - Fixed syntax
const products = [
  {
    name: 'Chicken Inasal',
    price: 175,
    img: 'images/chicken-inasal.png',
    desc: 'Char-grilled chicken marinated in calamansi and spices.',
    category: 'Main'
  },
  {
    name: 'Pork BBQ',
    price: 125,
    img: 'images/pork-bbq.png',
    desc: 'Sweet and savory grilled pork skewers.',
    category: 'Main'
  },
  {
    name: 'Halo-Halo',
    price: 99,
    img: 'images/halo-halo.png',
    desc: 'Refreshing shaved ice dessert with fruits and leche flan.',
    category: 'Dessert'
  },
  {
    name: 'Java Rice',
    price: 49,
    img: 'images/java-rice.png',
    desc: 'Garlic fried rice with BBQ flavors.',
    category: 'Side'
  }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('mangInasalCart')) || [];
let promoCode = '';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();
  setupScrollAnimations();
  setupEventListeners();
  smoothScrolling();
});

// Event Listeners
function setupEventListeners() {
  // Navbar toggle
  if (hamburger) {
    hamburger.addEventListener('click', toggleNavbar);
  }

  // Product cards click
  productCards.forEach((card, index) => {
    card.addEventListener('click', () => openProductModal(products[index]));
  });

  // Cart button (add to nav)
  const cartBtn = document.querySelector('.nav-cart-btn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  // Form submissions
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  // Close modals on outside click
  [detailModal, cartModal, checkoutModal, authModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Prevent modal close on content click
  document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', (e) => e.stopPropagation());
  });
}

// Navbar Toggle
function toggleNavbar() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

// Smooth Scrolling
function smoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        if (navMenu.classList.contains('active')) toggleNavbar();
      }
    });
  });
}

// Modal Controls
function openProductModal(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `₱${product.price}`;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-description').textContent = product.desc;
  
  const mainImg = document.getElementById('product-main-img');
  mainImg.src = product.img;
  mainImg.alt = product.name;
  
  const thumbs = document.getElementById('product-thumbs');
  thumbs.innerHTML = `
    <img src="${product.img}" alt="${product.name}" class="active thumb-img" onclick="changeMainImg(this.src)">
  `;
  
  document.getElementById('product-qty').value = 1;
  detailModal.style.display = 'flex';
}

function closeProductModal() {
  detailModal.style.display = 'none';
}

function changeMainImg(src) {
  document.getElementById('product-main-img').src = src;
  document.querySelectorAll('.thumb-img').forEach(img => img.classList.remove('active'));
  event.target.classList.add('active');
}

function changeProductQty(change) {
  const qtyInput = document.getElementById('product-qty');
  let newQty = parseInt(qtyInput.value) + change;
  if (newQty >= 1) qtyInput.value = newQty;
}

function addToCartFromDetail() {
  const name = document.getElementById('product-name').textContent;
  const priceStr = document.getElementById('product-price').textContent.replace('₱', '');
  const price = parseInt(priceStr);
  const qty = parseInt(document.getElementById('product-qty').value);
  addToCart(name, price, qty);
  closeProductModal();
}

// Cart Functions - Fixed
function addToCart(name, price, qty = 1) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ name, price, qty, img: getProductImg(name) });
  }
  localStorage.setItem('mangInasalCart', JSON.stringify(cart));
  updateCartUI();
  showNotification(`${qty} x ${name} added to cart!`, 'success');
}

function getProductImg(name) {
  const product = products.find(p => p.name === name);
  return product ? product.img : 'images/humba.png';
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('mangInasalCart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartItemsList = document.getElementById('cart-items-list');
  const cartItemCount = document.getElementById('cart-item-count-modal');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total-modal');
  const checkoutTotal = document.getElementById('checkout-total-amount');
  const cartBadge = document.querySelector('.cart-badge');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const total = subtotal * (promoCode === 'WELCOME20' ? 0.8 : 1);

  // Update cart badge
  if (cartBadge) cartBadge.textContent = totalItems || '';

  // Cart item count
  if (cartItemCount) cartItemCount.textContent = `(${totalItems})`;

  // Cart items list
  if (cartItemsList) {
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">₱${item.price} x <span class="qty">${item.qty}</span></div>
          </div>
          <div style="margin-left: auto;">
            <strong>₱${(item.price * item.qty).toLocaleString()}</strong>
            <br><button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Totals
  if (cartSubtotal) cartSubtotal.textContent = `₱${subtotal.toLocaleString()}`;
  if (cartTotalEl) cartTotalEl.textContent = `₱${total.toLocaleString()}`;
  if (checkoutTotal) checkoutTotal.textContent = total.toLocaleString();
}

function openCart() {
  updateCartUI();
  cartModal.style.display = 'flex';
}

function closeCart() {
  cartModal.style.display = 'none';
}

function openCheckout() {
  updateCartUI();
  closeCart();
  checkoutModal.style.display = 'flex';
}

function closeCheckout() {
  checkoutModal.style.display = 'none';
}

// Promo Code - Fixed cartManager reference
function applyPromo() {
  const promoInput = document.getElementById('checkout-promo');
  const resultEl = document.getElementById('promo-result');
  
  if (promoInput.value.toUpperCase() === 'INASAL20') {
    promoCode = 'INASAL20';
    resultEl.textContent = 'Promo applied! 20% off ✅';
    resultEl.style.color = 'green';
  } else {
    promoCode = '';
    resultEl.textContent = 'Invalid promo code ❌';
    resultEl.style.color = 'red';
  }
  updateCartUI();
}

// Auth Functions
function switchAuth(type) {
  const tabs = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  forms.forEach(form => form.style.display = 'none');
  document.getElementById(type === 'login' ? 'login-form' : 'register-form').style.display = 'flex';
}

function openAuthModal() {
  switchAuth('login');
  authModal.style.display = 'flex';
}

function closeAuthModal() {
  authModal.style.display = 'none';
}

function handleLogin(e) {
  e.preventDefault();
  showNotification('Logged in successfully! 🎉', 'success');
  closeAuthModal();
}

function handleRegister(e) {
  e.preventDefault();
  showNotification('Account created! Welcome to Mang Inasal! 🎉', 'success');
  closeAuthModal();
}

// Contact Form
function handleContactSubmit(e) {
  e.preventDefault();
  showNotification('Message sent! We\'ll get back to you soon. 📧', 'success');
  contactForm.reset();
}

// Checkout
function handleCheckout(e) {
  e.preventDefault();
  if (cart.length === 0) {
    showNotification('Cart is empty!', 'error');
    return;
  }
  
  // Simulate order processing
  setTimeout(() => {
    showNotification('Order placed successfully! Thank you! 🎊', 'success');
    cart = [];
    localStorage.removeItem('mangInasalCart');
    promoCode = '';
    closeCheckout();
    updateCartUI();
  }, 1500);
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-in, .animate-slide-up, .product-card, .contact-item, .hero-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// Utility Functions
function closeModal(modal) {
  modal.style.display = 'none';
}

function showNotification(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    border-radius: 10px;
    z-index: 3000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.style.transform = 'translateX(0)', 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Close navbar on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
    toggleNavbar();
  }
  document.body.classList.toggle('no-scroll', navMenu?.classList.contains('active'));
});

console.log('Mang Inasal Website JS Loaded! 🍗🛒');

