// FoodShop Admin Script
let charts = {};

const demoMenu = [
    { id: 1, name: 'Adobo', image: '../KARENDERYA/images/adubo.png', price: 50, desc: 'Sa adobo pa lang, panalo ka na' },
    { id: 2, name: 'Humba', image: '../KARENDERYA/images/humba.png', price: 50, desc: 'Humba-licious goodness!' },
    { id: 3, name: 'Paklay', image: '../KARENDERYA/images/paklay.png', price: 40, desc: 'Paklay na, walang sablay!' },
    { id: 4, name: 'Menudo', image: '../KARENDERYA/images/menudo.png', price: 40, desc: 'Pag may menudo, may saya!' },
    { id: 5, name: 'Bisayang Manok', image: '../KARENDERYA/images/bisayang-manok.png', price: 55, desc: 'Hindi ito ordinaryong manok!' },
    { id: 6, name: 'Tinola', image: '../KARENDERYA/images/tinola.png', price: 60, desc: 'Galing dagat, diretso sa kusina.' }
];

const demoCustomers = [
    { id: 1, name: 'Juan Dela Cruz', email: 'juan@example.com', phone: '+639123456789', orders: 5 },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', phone: '+639987654321', orders: 3 },
    { id: 3, name: 'Pedro Reyes', email: 'pedro@example.com', phone: '+63955556666', orders: 8 }
];

const demoInventory = [
    { item: 'Pork', stock: 25, threshold: 10 },
    { item: 'Chicken', stock: 8, threshold: 10 },
    { item: 'Rice', stock: 100, threshold: 20 },
    { item: 'Vegetables', stock: 15, threshold: 10 }
];

document.addEventListener('DOMContentLoaded', function() {
    // Auth check
    if (localStorage.getItem('role') !== 'admin') {
        window.location.href = '../KARENDERYA/index.html';
        return;
    }

    // Back link handler
    document.querySelector('.back-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('role');
        window.location.href = '../KARENDERYA/index.html';
    });

    initNavigation();
    initStats();
    initData();
    initCharts();
    initModals();
    initSearch();
});

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(item.dataset.page).classList.add('active');
            
            if (item.dataset.page === 'orders') loadOrders();
            if (item.dataset.page === 'menu') loadMenu();
            if (item.dataset.page === 'customers') loadCustomers();
            if (item.dataset.page === 'inventory') loadInventory();
            if (item.dataset.page === 'analytics') updateCharts();
        });
    });

    document.getElementById('toggleSidebar').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

function initStats() {
    const animateValue = (el, start, end, duration) => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    setTimeout(() => {
        animateValue(document.getElementById('totalOrders'), 0, 124, 1500);
        animateValue(document.getElementById('revenue'), 0, 18450, 2000);
        animateValue(document.getElementById('customers'), 0, 156, 1800);
        animateValue(document.getElementById('itemsSold'), 0, 856, 1200);
    }, 500);
}

function initData() {
    if (!localStorage.getItem('menu')) localStorage.setItem('menu', JSON.stringify(demoMenu));
    if (!localStorage.getItem('customers')) localStorage.setItem('customers', JSON.stringify(demoCustomers));
    if (!localStorage.getItem('inventory')) localStorage.setItem('inventory', JSON.stringify(demoInventory));
    if (!localStorage.getItem('orders') || JSON.parse(localStorage.getItem('orders')).length === 0) {
        const demoOrders = [
            { id: '#001', customer: 'Juan Dela Cruz', items: 'Adobo x2, Tinola x1', date: '2024-01-15', total: '₱160', status: 'delivered' },
            { id: '#002', customer: 'Maria Santos', items: 'Humba x1', date: '2024-01-20', total: '₱50', status: 'preparing' },
            { id: '#003', customer: 'Pedro Reyes', items: 'Menudo x3', date: '2024-01-22', total: '₱120', status: 'delivered' }
        ];
        localStorage.setItem('orders', JSON.stringify(demoOrders));
    }

    loadDashboard();
}

function loadDashboard() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const recent = orders.slice(-5).reverse();
    
    document.getElementById('recentOrdersList').innerHTML = recent.map(o => `
        <div class="booking-item">
            <strong>${o.customer}</strong> - ${o.items} 
            <span class="status ${o.status}">${o.status.toUpperCase()}</span>
        </div>
    `).join('');
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const tbody = document.querySelector('#ordersTable tbody');
    tbody.innerHTML = orders.map(o => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.items}</td>
            <td>${o.date}</td>
            <td>${o.total}</td>
            <td><span class="status ${o.status}">${o.status.toUpperCase()}</span></td>
            <td>
                <button class="action-btn" onclick="updateOrderStatus('${o.id}', 'preparing')"><i class="fas fa-play"></i></button>
                <button class="action-btn" onclick="updateOrderStatus('${o.id}', 'delivered')"><i class="fas fa-check"></i></button>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(id, status) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
    }
}

function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const headers = ['ID', 'Customer', 'Items', 'Date', 'Total', 'Status'];
    const csv = [headers.join(','), ...orders.map(o => [o.id, o.customer, o.items, o.date, o.total, o.status].join(','))].join('\n');
    downloadCSV(csv, 'foodshop-orders.csv');
}

function loadMenu() {
    const menu = JSON.parse(localStorage.getItem('menu') || '[]');
    document.getElementById('menuList').innerHTML = menu.map(item => `
        <div class="menu-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <div class="menu-price">₱${item.price}</div>
            <p>${item.desc}</p>
            <div class="project-actions">
                <button class="btn-action edit" onclick="editMenu(${item.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteMenu(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customersList = document.getElementById('customersList');
    customersList.innerHTML = customers.map(c => `
        <div class="user-card" data-id="${c.id}">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="avatar">${c.name[0]}</div>
                <div>
                    <h4>${c.name}</h4>
                    <p>${c.email}</p>
                    <p>${c.phone}</p>
                </div>
            </div>
            <span>${c.orders || 0} orders</span>
        </div>
    `).join('');
}

function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = inventory.map(item => {
        const lowStock = item.stock <= item.threshold ? 'low-stock' : '';
        return `
            <tr class="${lowStock}">
                <td>${item.item}</td>
                <td>${item.stock}</td>
                <td>${item.threshold}</td>
                <td>
                    <button class="action-btn" onclick="updateStock('${item.item}', 10)"><i class="fas fa-plus"></i> +10</button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateStock(item, amount) {
    let inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const invItem = inventory.find(i => i.item === item);
    if (invItem) {
        invItem.stock += parseInt(amount);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventory();
    }
}

function initCharts() {
    const ordersCtx = document.getElementById('ordersChart')?.getContext('2d');
    if (ordersCtx) {
        charts.orders = new Chart(ordersCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Orders',
                    data: [22, 35, 28, 45, 52, 38],
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220,38,38,0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    const itemsCtx = document.getElementById('itemsChart')?.getContext('2d');
    if (itemsCtx) {
        charts.items = new Chart(itemsCtx, {
            type: 'bar',
            data: {
                labels: ['Adobo', 'Humba', 'Tinola', 'Menudo'],
                datasets: [{
                    label: 'Sold',
                    data: [85, 62, 48, 35],
                    backgroundColor: ['#dc2626', '#f97316', '#10b981', '#ef4444']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
    if (revenueCtx) {
        charts.revenue = new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['Food', 'Drinks', 'Others'],
                datasets: [{
                    data: [75, 20, 5],
                    backgroundColor: ['#dc2626', '#f97316', '#10b981']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function updateCharts() {
    Object.values(charts).forEach(chart => chart?.update());
}

// Menu CRUD
document.getElementById('addMenuBtn')?.addEventListener('click', () => {
    document.getElementById('menuModalTitle').textContent = 'Add Menu Item';
    document.getElementById('menuForm').reset();
    delete document.getElementById('menuForm').dataset.editId;
    document.getElementById('menuModal').classList.add('active');
});

document.getElementById('menuForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('menuName').value,
        price: parseFloat(document.getElementById('menuPrice').value),
        image: document.getElementById('menuImage').value,
        desc: document.getElementById('menuDesc').value
    };
    
    let menu = JSON.parse(localStorage.getItem('menu') || '[]');
    const editId = e.target.dataset.editId;
    
    if (editId) {
        menu = menu.map(m => m.id == editId ? { ...m, ...formData } : m);
    } else {
        formData.id = Math.max(...menu.map(m => m.id), 0) + 1;
        menu.push(formData);
    }
    
    localStorage.setItem('menu', JSON.stringify(menu));
    loadMenu();
    document.getElementById('menuModal').classList.remove('active');
});

function editMenu(id) {
    const menu = JSON.parse(localStorage.getItem('menu') || '[]');
    const item = menu.find(m => m.id === id);
    if (item) {
        document.getElementById('menuName').value = item.name;
        document.getElementById('menuPrice').value = item.price;
        document.getElementById('menuImage').value = item.image;
        document.getElementById('menuDesc').value = item.desc;
        document.getElementById('menuModalTitle').textContent = 'Edit Menu Item';
        document.getElementById('menuForm').dataset.editId = id;
        document.getElementById('menuModal').classList.add('active');
    }
}

function deleteMenu(id) {
    if (confirm('Delete this menu item?')) {
        let menu = JSON.parse(localStorage.getItem('menu') || '[]');
        menu = menu.filter(m => m.id !== id);
        localStorage.setItem('menu', JSON.stringify(menu));
        loadMenu();
    }
}

document.getElementById('cancelMenu')?.addEventListener('click', () => {
    document.getElementById('menuModal').classList.remove('active');
});

// Customer CRUD
document.getElementById('addCustomerBtn')?.addEventListener('click', () => {
    document.getElementById('customerModalTitle').textContent = 'Add Customer';
    document.getElementById('customerForm').reset();
    delete document.getElementById('customerForm').dataset.editId;
    document.getElementById('customerModal').classList.add('active');
});

document.getElementById('customerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value
    };
    
    let customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const editId = e.target.dataset.editId;
    
    if (editId) {
        customers = customers.map(c => c.id == editId ? { ...c, ...formData } : c);
    } else {
        formData.id = Math.max(...customers.map(c => c.id), 0) + 1;
        customers.push(formData);
    }
    
    localStorage.setItem('customers', JSON.stringify(customers));
    loadCustomers();
    document.getElementById('customerModal').classList.remove('active');
});

function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        let customers = JSON.parse(localStorage.getItem('customers') || '[]');
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomers();
    }
}

document.getElementById('cancelCustomer')?.addEventListener('click', () => {
    document.getElementById('customerModal').classList.remove('active');
});

function initSearch() {
    ['orderSearch', 'customerSearch', 'inventorySearch'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const pageId = id.replace('Search', 'sTable') || id.replace('Search', 'List') || id.replace('Search', 'Table');
                document.querySelectorAll(`#${pageId} tr, #${pageId} .user-card, #${pageId} .menu-card`).forEach(row => {
                    row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
                });
            });
        }
    });
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function logout() {
    localStorage.removeItem('role');
    window.location.href = '../KARENDERYA/index.html';
}

function clearDemoData() {
    if (confirm('Clear all demo data? This will reset everything.')) {
        localStorage.clear();
        location.reload();
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn');
        if (btn) {
            btn.classList.add('success');
            setTimeout(() => btn.classList.remove('success'), 2000);
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn')) {
        const el = document.getElementById(e.target.closest('.copy-btn').dataset.copy);
        copyToClipboard(el.textContent.trim());
    }
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

