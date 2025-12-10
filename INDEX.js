// CART CLASS
class Cart {
  constructor() { this.items = JSON.parse(localStorage.getItem('jolliCart')) || []; }
  save(){ localStorage.setItem('jolliCart', JSON.stringify(this.items)); }
  addItem(id,name,qty,price){ const exist=this.items.find(i=>i.id===id); if(exist) exist.qty+=qty; else this.items.push({id,name,qty,price}); this.save(); }
  removeItem(id){ this.items=this.items.filter(i=>i.id!==id); this.save(); }
  clearCart(){ this.items=[]; this.save(); }
  getTotal(){ return this.items.reduce((sum,i)=>sum+i.price*i.qty,0); }
  getOrder(){ return this.items; }
  getItemCount() { return this.items.reduce((count, i) => count + i.qty, 0); }
}
const cart=new Cart();
const cartUI=document.getElementById('cart');
const cartTotal=document.getElementById('cart-total');
const cartItemCount=document.getElementById('cart-item-count');

// MENU ITEMS
const menuItems=[
  {id:'item1', name:'1-pc Chickenjoy Solo', price:85, category:'Chicken Meals', img:'image/1pc-chickenjoy3.jpg', badge:'Popular'},
  {id:'item2', name:'2-pc Chickenjoy', price:169, category:'Chicken Meals', img:'image/2pc-chickenjoy.jpg'},
  {id:'item3', name:'Jolly Spaghetti', price:69, category:'Pasta', img:'image/jolly spaghetti.jpg'},
  {id:'item4', name:'Burger Steak', price:77, category:'Steak Meals', img:'image/burger steak.jpg', badge:'Hot'},
  {id:'item5', name:'Yumburger', price:69, category:'Burgers', img:'image/yumburger.jpg'},
  {id:'item6', name:'6-pc Bucket', price:467, category:'Chicken Meals', img:'image/6pc chickenjoy.jpg', badge:'Best Seller'},
  {id:'item7', name:'Peach Mango Pie', price:45, category:'Dessert', img:'image/peach pie.png', badge:'Sweet'},
  {id:'item8', name:'Jolly Hotdog', price:75, category:'Burgers', img:'image/hotdog.png'},
  {id:'item9', name:'Jolly Hotdog', price:52, category:'Burgers', img:'image/Float.png'},
];
const menuGrid=document.getElementById('menu-grid');

// --- SLIDER LOGIC ---
const sliderImages = [
    { src: "image/Jollibee-Best-Fast-Food-Fried-Chicken.webp", alt: "Chickenjoy" },
    { src: "image/yumburger.jpg", alt: "Yumburger" },
    { src: "image/peach pie.png", alt: "Peach Mango Pie" },
];
let currentSlide = 0;

function renderSlider() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;
    slider.innerHTML = ''; 

    sliderImages.forEach((img, index) => {
        const div = document.createElement('div');
        div.classList.add('slide');
        if (index === 0) {
            div.classList.add('active');
        }
        div.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        slider.appendChild(div);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
// Run slider every 10 seconds as requested
setInterval(nextSlide, 10000); 

// --- MENU AND CART FUNCTIONS ---

function loadMenu(list=menuItems){
  menuGrid.innerHTML='';
  list.forEach((item)=>{
    // Use item.id to ensure quantity input IDs are unique and stable
    const div=document.createElement('div'); div.classList.add('item');
    div.innerHTML=`
      ${item.badge?`<div class="badge">${item.badge}</div>`:''}
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₱${item.price} pesos</p>
      <div class="store-controls">
        <button onclick="changeQty('qty_${item.id}',-1)">-</button>
        <input id="qty_${item.id}" value="1" readonly>
        <button onclick="changeQty('qty_${item.id}',1)">+</button>
      </div>
      <button onclick="addToCart('${item.id}','${item.name}',${item.price},'qty_${item.id}')">Add to Cart</button>
    `;
    menuGrid.appendChild(div);
  });
}

// SEARCH & CATEGORY
function filterMenu(){ 
    const q=document.getElementById('search-bar').value.toLowerCase(); 
    loadMenu(menuItems.filter(i=>i.name.toLowerCase().includes(q))); 
}
function filterCategory(cat){ 
    document.querySelectorAll('#category-buttons button').forEach(btn=>btn.classList.remove('active')); 
    // Find the button that was clicked and add the active class
    const clickedButton = Array.from(document.querySelectorAll('#category-buttons button')).find(btn => btn.dataset.category === cat);
    if (clickedButton) clickedButton.classList.add('active');

    if(cat==='all') loadMenu(menuItems); 
    else loadMenu(menuItems.filter(i=>i.category===cat)); 
}

// CART FUNCTIONS
function changeQty(id,delta){ 
    const input=document.getElementById(id); 
    let qty=parseInt(input.value)+delta; 
    if(qty<1) qty=1; input.value=qty; 
}
function addToCart(id,name,price,qtyId){ 
    const qty=parseInt(document.getElementById(qtyId).value); 
    cart.addItem(id,name,qty,price); 
    renderCart(); 
}
function renderCart(){ 
    cartUI.innerHTML=''; 
    cart.getOrder().forEach(item=>{ 
        const li=document.createElement('li'); 
        li.innerHTML=`
            <span>${item.name} x ${item.qty}</span>
            <span>₱${item.price*item.qty} 
            <button onclick="cart.removeItem('${item.id}'); renderCart();">X</button></span>
        `; 
        cartUI.appendChild(li); 
    }); 
    cartTotal.textContent=`Total: ₱${cart.getTotal()} pesos`; 
    cartItemCount.textContent=cart.getItemCount(); 
}

// SCROLL
function scrollToMenu(){ 
    document.getElementById('Menu').scrollIntoView({behavior:'smooth'}); 
    closeAllOffCanvas();
}

// --- OFF-CANVAS / MODAL FUNCTIONS ---
const overlay = document.getElementById('overlay');
const expandedMenu = document.getElementById('expanded-menu');
const cartSidebar = document.getElementById('cart-sidebar');

function toggleExpandedMenu(){ 
    expandedMenu.classList.toggle('open'); 
    overlay.style.display = expandedMenu.classList.contains('open') ? 'block' : 'none';
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
    }
}

function toggleCartSidebar(){
    cartSidebar.classList.toggle('open');
    overlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
    if (expandedMenu.classList.contains('open')) {
        expandedMenu.classList.remove('open');
    }
}

function closeAllOffCanvas() {
    expandedMenu.classList.remove('open');
    cartSidebar.classList.remove('open');
    overlay.style.display = 'none';
}

function openSetting(type){ 
    // This is the functional mock for the new integrated setting links
    alert(`Navigating to ${type} settings... (A dedicated settings page would load here)`);
    // Close the expanded menu after clicking a link
    toggleExpandedMenu();
}

function openAuthModal(tab){ 
    document.getElementById('auth-modal').style.display='flex'; 
    switchAuthTab(tab); 
    closeAllOffCanvas(); // Close side menu when opening the modal
}
function closeAuthModal(){ 
    document.getElementById('auth-modal').style.display='none'; 
}
function switchAuthTab(tab){ 
    document.getElementById('login-form').style.display=(tab==='login')?'block':'none'; 
    document.getElementById('signup-form').style.display=(tab==='signup')?'block':'none'; 
    document.getElementById('login-tab').classList.toggle('active', tab === 'login');
    document.getElementById('signup-tab').classList.toggle('active', tab === 'signup');
}
function loginUser(e){ e.preventDefault(); alert("Logged in"); closeAuthModal(); }
function signupUser(e){ e.preventDefault(); alert("Signed up"); closeAuthModal(); }

// --- DARK MODE ---
const darkToggle=document.getElementById('dark-toggle');
const DARK_MODE_KEY = 'jollibee-dark';

function toggleDarkLightMode() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(DARK_MODE_KEY, isDark);
}

// Initial Dark Mode Check
if(localStorage.getItem(DARK_MODE_KEY) === 'true') {
    document.body.classList.add('dark');
}

darkToggle.onclick = toggleDarkLightMode;


// ORDER SUBMISSION Mock
document.getElementById('submit-order').addEventListener('click', () => {
    if (cart.getItemCount() > 0) {
        alert(`Order Submitted! Total: ₱${cart.getTotal()} pesos. Thank you!`);
        cart.clearCart();
        renderCart();
        closeAllOffCanvas();
    } else {
         alert('Your cart is empty. Please add items.');
    }
});

// INITIALIZATION
document.addEventListener('DOMContentLoaded', ()=>{
    renderSlider();
    loadMenu();
    renderCart();
    
    // Dynamically create category buttons
    const categories = ['all', ...new Set(menuItems.map(item => item.category))];
    const categoryContainer = document.getElementById('category-buttons');
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.dataset.category = category; // Store the category value
        button.onclick = () => filterCategory(category);
        if (category === 'all') {
            button.classList.add('active');
        }
        categoryContainer.appendChild(button);
    });
    
    // Make sure the initial render for dark mode is correct after JS loads
    if(localStorage.getItem(DARK_MODE_KEY) === 'true') {
        document.body.classList.add('dark');
    }
});