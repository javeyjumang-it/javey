// Karenderya E-commerce Script - Full Functionality

const menuData = [
  { id: 0, name: 'Adubo', price: 50, img: 'images/adubo.png', desc: 'Sa adobo pa lang, panalo ka na' },
  { id: 1, name: 'Humba', price: 50, img: 'images/humba.png', desc: 'Humba-licious goodness!' },
  { id: 2, name: 'Paklay', price: 40, img: 'images/paklay.png', desc: 'Paklay na, walang sablay!' },
  { id: 3, name: 'Menudo', price: 40, img: 'images/menudo.png', desc: 'Pag may menudo, may saya!' },
  { id: 4, name: 'Bisayang Manok', price: 55, img: 'images/bisayang-manok.png', desc: 'Hindi ito ordinaryong manok!' },
  { id: 5, name: 'Tinola', price: 60, img: 'images/tinola.png', desc: 'Galing dagat, diretso sa kusina.' }
];

let cart = JSON.parse(localStorage.getItem('karenderyaCart')) || [];

class CartManager {
  addToCart(id, qty = 1) {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.qty += qty;
    } else {
      cart.push({ ...menuData[id], qty });
    }
    this.updateCartUI();
    localStorage.setItem('karenderyaCart', JSON.stringify(cart));
    this.showNotification('Added to cart!');
  }

  removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    this.updateCartUI();
    localStorage.setItem('karenderyaCart', JSON.stringify(cart));
  }

  changeQty(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.qty += change;
      if (item.qty <= 0) {
        this.removeFromCart(id);
      } else {
        this.updateCartUI();
        localStorage.setItem('karenderyaCart', JSON.stringify(cart));
      }
    }
  }

  getTotal() {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  updateCartUI() {
    const badge = document.querySelector('.cart-badge');
    const count = document.getElementById('cart-item-count-modal');
    const subtotal = document.getElementById('cart-subtotal');
    const total = document.getElementById('cart-total-modal');
    const checkoutTotal = document.getElementById('checkout-total-amount');

    badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    count.textContent = ` (${cart.reduce((sum, item) => sum + item.qty, 0)} items)`;
    subtotal.textContent = `₱${this.getTotal().toFixed(2)}`;
    total.textContent = `₱${this.getTotal().toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = this.getTotal().toFixed(2);
  }

  renderCartItems(container) {
    container.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₱${item.price.toFixed(2)} x 
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="cartManager.changeQty(${item.id}, -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="cartManager.changeQty(${item.id}, 1)">+</button>
            </div>
          </p>
          <strong>₱${(item.price * item.qty).toFixed(2)}</strong>
          <button class="remove-cart-item" onclick="cartManager.removeFromCart(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      container.appendChild(div);
    });
  }

  applyPromo() {
    const promoInput = document.getElementById('checkout-promo');
    const result = document.getElementById('promo-result');
    const code = promoInput.value.toUpperCase();
    
    if (code === 'WELCOME10') {
      // Promo logic here - could modify total with discount
      result.textContent = '10% OFF applied!';
      result.style.color = 'var(--success)';
    } else {
      result.textContent = 'Invalid promo code';
      result.style.color = 'var(--danger)';
    }
  }

  clearCart() {
    cart = [];
    this.updateCartUI();
    localStorage.removeItem('karenderyaCart');
  }

  showNotification(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; top: 100px; right: 20px; background: var(--success); 
      color: white; padding: 1rem 2rem; border-radius: var(--radius); 
      z-index: 3000; transform: translateX(400px); transition: var(--transition);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

const cartManager = new CartManager();

// Init
document.addEventListener('DOMContentLoaded', () => {
  cartManager.updateCartUI();
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
  });

  // Checkout form
  document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for your purchase.');
    cartManager.clearCart();
    closeCheckout();
  });

  // Auth forms
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in successfully!');
    closeAuthModal();
  });

  document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Registered successfully! Please login.');
    switchAuth('login');
  });
});

// Modal functions
function openCart() {
  cartManager.renderCartItems(document.getElementById('cart-items-list'));
  document.querySelector('.cart-modal').style.display = 'flex';
}

function closeCart() {
  document.querySelector('.cart-modal').style.display = 'none';
}

function openCheckout() {
  closeCart();
  document.querySelector('.checkout-modal').style.display = 'flex';
  document.getElementById('checkout-total-amount').textContent = cartManager.getTotal().toFixed(2);
}

function closeCheckout() {
  document.querySelector('.checkout-modal').style.display = 'none';
}

function closeAuthModal() {
  document.querySelector('.auth-modal').style.display = 'none';
}

function switchAuth(type) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabs = document.querySelectorAll('.tab-btn');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  if (type === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

function addtocartfromcard(id) {
  cartManager.addToCart(id);
}

// Product detail modal functions (basic)
function openProductModal(id) {
  const item = menuData[id];
  document.getElementById('product-name').textContent = item.name;
  document.getElementById('product-price').textContent = `₱${item.price}`;
  document.getElementById('product-description').textContent = item.desc;
  document.getElementById('product-main-img').src = item.img;
  document.querySelector('.detail-modal').style.display = 'flex';
}

function closeProductModal() {
  document.querySelector('.detail-modal').style.display = 'none';
}

function changeProductQty(change) {
  const qtyInput = document.getElementById('product-qty');
  let qty = parseInt(qtyInput.value) + change;
  if (qty < 1) qty = 1;
  qtyInput.value = qty;
}

function addToCartFromDetail() {
  const id = parseInt(document.querySelector('.detail-modal .menucard')?.dataset.id || 0);
  const qty = parseInt(document.getElementById('product-qty').value);
  cartManager.addToCart(id, qty);
  closeProductModal();
}

// Close modals on outside click
window.onclick = function(event) {
  const modals = document.querySelectorAll('.detail-modal, .cart-modal, .checkout-modal, .auth-modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Hamburger menu toggle
document.querySelector('.humberger').onclick = () => {
  document.querySelector('.nav-container').classList.toggle('active');
};
