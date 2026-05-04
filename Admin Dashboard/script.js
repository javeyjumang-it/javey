// Mock Data
const mockOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', date: '2024-01-15', amount: '$129.99', status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch Pro', date: '2024-01-14', amount: '$299.99', status: 'processing' },
    { id: '#ORD-003', customer: 'Bob Johnson', product: 'Laptop Stand', date: '2024-01-14', amount: '$49.99', status: 'pending' },
    { id: '#ORD-004', customer: 'Alice Brown', product: 'USB-C Hub', date: '2024-01-13', amount: '$79.99', status: 'completed' },
    { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Mechanical Keyboard', date: '2024-01-13', amount: '$159.99', status: 'cancelled' },
    { id: '#ORD-006', customer: 'Diana Prince', product: 'Webcam 4K', date: '2024-01-12', amount: '$89.99', status: 'completed' },
    { id: '#ORD-007', customer: 'Eve Davis', product: 'Monitor Light Bar', date: '2024-01-12', amount: '$45.99', status: 'processing' },
    { id: '#ORD-008', customer: 'Frank Miller', product: 'Desk Mat', date: '2024-01-11', amount: '$24.99', status: 'pending' },
];

const topProducts = [
    { name: 'Wireless Headphones', category: 'Electronics', sales: 1234, icon: '🎧' },
    { name: 'Smart Watch Pro', category: 'Wearables', sales: 987, icon: '⌚' },
    { name: 'Mechanical Keyboard', category: 'Accessories', sales: 856, icon: '⌨️' },
    { name: 'USB-C Hub', category: 'Accessories', sales: 743, icon: '🔌' },
    { name: 'Webcam 4K', category: 'Electronics', sales: 621, icon: '📷' },
];

const activities = [
    { text: 'New order received from John Doe', time: '2 minutes ago', icon: 'fa-shopping-bag', color: 'success' },
    { text: 'Product "Wireless Headphones" updated', time: '15 minutes ago', icon: 'fa-edit', color: 'info' },
    { text: 'New user registered: Jane Smith', time: '1 hour ago', icon: 'fa-user-plus', color: 'primary' },
    { text: 'Order #ORD-003 marked as pending', time: '2 hours ago', icon: 'fa-clock', color: 'warning' },
    { text: 'Payment received for Order #ORD-001', time: '3 hours ago', icon: 'fa-check', color: 'success' },
];

// Additional Mock Data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'active', joined: '2024-01-10', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'active', joined: '2024-01-08', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'inactive', joined: '2024-01-05', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', joined: '2024-01-03', avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=8b5cf6&color=fff' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Customer', status: 'active', joined: '2023-12-28', avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson&background=ef4444&color=fff' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joined: '2023-12-20', avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=3b82f6&color=fff' },
];

const mockProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$129.99', stock: 45, status: 'in-stock', icon: '🎧' },
    { id: 2, name: 'Smart Watch Pro', category: 'Wearables', price: '$299.99', stock: 12, status: 'low-stock', icon: '⌚' },
    { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: '$159.99', stock: 78, status: 'in-stock', icon: '⌨️' },
    { id: 4, name: 'USB-C Hub', category: 'Accessories', price: '$79.99', stock: 0, status: 'out-of-stock', icon: '🔌' },
    { id: 5, name: 'Webcam 4K', category: 'Electronics', price: '$89.99', stock: 23, status: 'in-stock', icon: '📷' },
    { id: 6, name: 'Monitor Light Bar', category: 'Accessories', price: '$45.99', stock: 5, status: 'low-stock', icon: '💡' },
];

const mockMessages = [
    { id: 1, name: 'John Doe', subject: 'Order Inquiry', preview: 'Hi, I wanted to check on my recent order...', body: 'Hi, I wanted to check on my recent order #ORD-001. It has been 3 days and I haven\'t received any shipping update. Could you please look into this? Thanks!', time: '10:30 AM', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff', unread: true },
    { id: 2, name: 'Jane Smith', subject: 'Product Question', preview: 'Does the Smart Watch Pro support iOS?', body: 'Hello, I\'m interested in purchasing the Smart Watch Pro but I use an iPhone. Does it fully support iOS notifications and health sync? Thanks in advance!', time: 'Yesterday', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff', unread: true },
    { id: 3, name: 'Bob Johnson', subject: 'Refund Request', preview: 'I would like to request a refund for...', body: 'I would like to request a refund for my order #ORD-003. The product arrived damaged and I\'d prefer to get my money back rather than a replacement. Please let me know the next steps.', time: 'Yesterday', avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff', unread: false },
    { id: 4, name: 'Alice Brown', subject: 'Partnership Proposal', preview: 'We are interested in partnering with...', body: 'We are interested in partnering with your store to sell our eco-friendly accessories. Would you be open to a discussion about wholesale pricing and terms? Looking forward to hearing from you.', time: 'Jan 15', avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=8b5cf6&color=fff', unread: false },
    { id: 5, name: 'Charlie Wilson', subject: 'Shipping Address Update', preview: 'Can I update my shipping address for...', body: 'Can I update my shipping address for order #ORD-005? I recently moved and the old address is no longer valid. The new address is 123 New Street, Cityville. Please confirm if this is possible.', time: 'Jan 14', avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson&background=ef4444&color=fff', unread: false },
];

const topPages = [
    { name: '/products', views: 12450, change: '+12%' },
    { name: '/dashboard', views: 8320, change: '+5%' },
    { name: '/orders', views: 6100, change: '+8%' },
    { name: '/analytics', views: 4200, change: '-2%' },
    { name: '/settings', views: 3100, change: '+3%' },
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const themeToggle = document.getElementById('themeToggle');
const notifBtn = document.getElementById('notifBtn');
const notifDropdown = document.getElementById('notifDropdown');
const searchInput = document.getElementById('searchInput');
const ordersTableBody = document.getElementById('ordersTableBody');
const topProductsList = document.getElementById('topProducts');
const activityList = document.getElementById('activityList');

// Additional DOM Elements
const usersTableBody = document.getElementById('usersTableBody');
const productsTableBody = document.getElementById('productsTableBody');
const allOrdersTableBody = document.getElementById('allOrdersTableBody');
const orderFilter = document.getElementById('orderFilter');
const messagesList = document.getElementById('messagesList');
const messagesEmpty = document.getElementById('messagesEmpty');
const messagesDetail = document.getElementById('messagesDetail');
const msgDetailAvatar = document.getElementById('msgDetailAvatar');
const msgDetailName = document.getElementById('msgDetailName');
const msgDetailSubject = document.getElementById('msgDetailSubject');
const msgDetailTime = document.getElementById('msgDetailTime');
const msgDetailBody = document.getElementById('msgDetailBody');
const msgReplyText = document.getElementById('msgReplyText');
const msgReplyBtn = document.getElementById('msgReplyBtn');
const messageSearch = document.getElementById('messageSearch');
const topPagesList = document.getElementById('topPages');

// Initialize
let revenueChartInstance = null;
let categoryChartInstance = null;

function init() {
    renderOrders(mockOrders);
    renderTopProducts();
    renderActivities();
    initCharts();
    setupEventListeners();
    animateCounters();
    renderUsers();
    renderProducts();
    renderAllOrders(mockOrders);
    renderMessages();
    renderTopPages();
    initAnalyticsCharts();
}

// Render Users Table
function renderUsers() {
    if (!usersTableBody) return;
    usersTableBody.innerHTML = mockUsers.map(user => `
        <tr>
            <td>
                <div class="user-cell">
                    <img src="${user.avatar}" alt="${user.name}">
                    <div>
                        <div style="font-weight: 600;">${user.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="status ${user.role === 'Admin' ? 'completed' : user.role === 'Editor' ? 'processing' : 'pending'}">${user.role}</span></td>
            <td><span class="status ${user.status === 'active' ? 'completed' : 'cancelled'}">${user.status}</span></td>
            <td>${user.joined}</td>
            <td>
                <div class="action-btns">
                    <button title="View"><i class="fas fa-eye"></i></button>
                    <button title="Edit"><i class="fas fa-edit"></i></button>
                    <button title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render Products Table
function renderProducts() {
    if (!productsTableBody) return;
    productsTableBody.innerHTML = mockProducts.map(product => `
        <tr>
            <td>
                <div class="product-cell">
                    <div class="product-thumb">${product.icon}</div>
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><span class="status ${product.status === 'in-stock' ? 'completed' : product.status === 'low-stock' ? 'warning' : 'cancelled'}">${product.status.replace('-', ' ')}</span></td>
            <td>
                <div class="action-btns">
                    <button title="View"><i class="fas fa-eye"></i></button>
                    <button title="Edit"><i class="fas fa-edit"></i></button>
                    <button title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render All Orders Table
function renderAllOrders(orders) {
    if (!allOrdersTableBody) return;
    allOrdersTableBody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.date}</td>
            <td>${order.amount}</td>
            <td><span class="status ${order.status}">${order.status}</span></td>
            <td>
                <div class="action-btns">
                    <button title="View"><i class="fas fa-eye"></i></button>
                    <button title="Edit"><i class="fas fa-edit"></i></button>
                    <button title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    
    const showingText = document.getElementById('allOrdersShowingText');
    if (showingText) {
        showingText.textContent = `Showing ${orders.length} of ${mockOrders.length} entries`;
    }
}

// Render Messages List
function renderMessages(filter = '') {
    if (!messagesList) return;
    
    const filtered = filter 
        ? mockMessages.filter(m => m.name.toLowerCase().includes(filter.toLowerCase()) || m.subject.toLowerCase().includes(filter.toLowerCase()))
        : mockMessages;
    
    messagesList.innerHTML = filtered.map(msg => `
        <div class="message-item ${msg.unread ? 'unread' : ''}" data-id="${msg.id}">
            <img src="${msg.avatar}" alt="${msg.name}">
            <div class="message-preview">
                <h4>${msg.name} <span>${msg.time}</span></h4>
                <p><strong>${msg.subject}:</strong> ${msg.preview}</p>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    messagesList.querySelectorAll('.message-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.getAttribute('data-id'));
            showMessageDetail(id);
            messagesList.querySelectorAll('.message-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            item.classList.remove('unread');
        });
    });
}

// Show Message Detail
function showMessageDetail(id) {
    const msg = mockMessages.find(m => m.id === id);
    if (!msg || !messagesDetail) return;
    
    messagesEmpty.style.display = 'none';
    messagesDetail.style.display = 'flex';
    
    msgDetailAvatar.src = msg.avatar;
    msgDetailName.textContent = msg.name;
    msgDetailSubject.textContent = msg.subject;
    msgDetailTime.textContent = msg.time;
    msgDetailBody.textContent = msg.body;
}

// Render Top Pages (Analytics)
function renderTopPages() {
    if (!topPagesList) return;
    topPagesList.innerHTML = topPages.map((page, index) => `
        <div class="product-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s forwards; opacity: 0;">
            <div class="product-details">
                <h4>${page.name}</h4>
                <p>Page views</p>
            </div>
            <div class="product-sales">
                <h4>${page.views.toLocaleString()}</h4>
                <p style="color: ${page.change.startsWith('+') ? 'var(--success-color)' : 'var(--danger-color)'};">${page.change}</p>
            </div>
        </div>
    `).join('');
}

// Analytics Charts
let trafficChartInstance = null;
let sourcesChartInstance = null;
let devicesChartInstance = null;

function initAnalyticsCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        trafficChartInstance = new Chart(trafficCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Visitors',
                    data: [4200, 5100, 4800, 6200, 7500, 8900, 7100],
                    backgroundColor: '#6366f1',
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor } },
                    y: { grid: { color: gridColor }, ticks: { color: textColor } }
                }
            }
        });
    }
    
    // Sources Chart
    const sourcesCtx = document.getElementById('sourcesChart');
    if (sourcesCtx) {
        sourcesChartInstance = new Chart(sourcesCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Direct', 'Social', 'Organic', 'Referral'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: textColor, padding: 15, usePointStyle: true, pointStyle: 'circle' }
                    }
                }
            }
        });
    }
    
    // Devices Chart
    const devicesCtx = document.getElementById('devicesChart');
    if (devicesCtx) {
        devicesChartInstance = new Chart(devicesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, padding: 15, usePointStyle: true, pointStyle: 'circle' }
                    }
                },
                cutout: '60%'
            }
        });
    }
}

// Sidebar navigation - section switching
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        
        // Update active state
        document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
        this.parentElement.classList.add('active');
        
        // Show target section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            closeSidebarFunc();
        }
    });
});

// Event Listeners
function setupEventListeners() {
    // Sidebar toggle
    menuBtn.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFunc);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Notifications
    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
            notifDropdown.classList.remove('active');
        }
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = mockOrders.filter(order => 
            order.customer.toLowerCase().includes(query) ||
            order.product.toLowerCase().includes(query) ||
            order.id.toLowerCase().includes(query)
        );
        renderOrders(filtered);
    });

    // Mark all as read
    document.querySelector('.mark-read').addEventListener('click', () => {
        document.querySelectorAll('.notif-item').forEach(item => {
            item.classList.remove('unread');
        });
        document.querySelector('.badge').style.display = 'none';
    });

    // Chart period buttons
    document.querySelectorAll('.chart-actions button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-actions button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateRevenueChart(this.textContent.toLowerCase());
        });
    });

    // Order filter
    if (orderFilter) {
        orderFilter.addEventListener('change', (e) => {
            const value = e.target.value;
            const filtered = value === 'all' ? mockOrders : mockOrders.filter(o => o.status === value);
            renderAllOrders(filtered);
        });
    }

    // Message search
    if (messageSearch) {
        messageSearch.addEventListener('input', (e) => {
            renderMessages(e.target.value);
        });
    }

    // Message reply
    if (msgReplyBtn) {
        msgReplyBtn.addEventListener('click', () => {
            const text = msgReplyText.value.trim();
            if (text) {
                alert('Reply sent successfully!');
                msgReplyText.value = '';
            }
        });
    }

    // Add User button
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            alert('Add User modal would open here');
        });
    }

    // Add Product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            alert('Add Product modal would open here');
        });
    }

    // Settings forms
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Profile settings saved!');
        });
    }

    const prefsForm = document.getElementById('prefsForm');
    if (prefsForm) {
        prefsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Preferences saved!');
        });
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Password updated!');
        });
    }
}

// Sidebar Functions
function openSidebar() {
    sidebar.classList.add('active');
    createOverlay();
}

function closeSidebarFunc() {
    sidebar.classList.remove('active');
    removeOverlay();
}

function createOverlay() {
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
            closeSidebarFunc();
        });
    }
    setTimeout(() => overlay.classList.add('active'), 10);
}

function removeOverlay() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Update charts for theme
    updateChartTheme();
}

// Render Orders Table
function renderOrders(orders) {
    ordersTableBody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.date}</td>
            <td>${order.amount}</td>
            <td><span class="status ${order.status}">${order.status}</span></td>
            <td>
                <div class="action-btns">
                    <button title="View"><i class="fas fa-eye"></i></button>
                    <button title="Edit"><i class="fas fa-edit"></i></button>
                    <button title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('showingText').textContent = `Showing ${orders.length} of ${mockOrders.length} entries`;
}

// Render Top Products
function renderTopProducts() {
    topProductsList.innerHTML = topProducts.map((product, index) => `
        <div class="product-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s forwards; opacity: 0;">
            <div class="product-img">${product.icon}</div>
            <div class="product-details">
                <h4>${product.name}</h4>
                <p>${product.category}</p>
            </div>
            <div class="product-sales">
                <h4>${product.sales.toLocaleString()}</h4>
                <p>sales</p>
            </div>
        </div>
    `).join('');
}

// Render Activities
function renderActivities() {
    const colorMap = {
        primary: 'rgba(99, 102, 241, 0.1)',
        success: 'rgba(16, 185, 129, 0.1)',
        warning: 'rgba(245, 158, 11, 0.1)',
        info: 'rgba(59, 130, 246, 0.1)',
        danger: 'rgba(239, 68, 68, 0.1)'
    };
    
    const iconColorMap = {
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6',
        danger: '#ef4444'
    };
    
    activityList.innerHTML = activities.map((activity, index) => `
        <div class="activity-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s forwards; opacity: 0;">
            <div class="activity-icon" style="background-color: ${colorMap[activity.color]}; color: ${iconColorMap[activity.color]};">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span>${activity.time}</span>
            </div>
        </div>
    `).join('');
}

// Charts
function initCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChartInstance = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [4200, 3800, 5100, 4800, 6200, 5500, 7100],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: textColor }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { 
                        color: textColor,
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChartInstance = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Wearables', 'Accessories', 'Others'],
            datasets: [{
                data: [35, 25, 30, 10],
                backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function updateRevenueChart(period) {
    const dataMap = {
        weekly: [4200, 3800, 5100, 4800, 6200, 5500, 7100],
        monthly: [18000, 22000, 19500, 24000, 21000, 28000, 25000, 30000, 27000, 32000, 29000, 35000],
        yearly: [150000, 180000, 210000, 240000, 220000, 260000, 280000, 300000, 270000, 320000, 350000, 380000, 360000, 400000, 420000]
    };
    
    const labelsMap = {
        weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        yearly: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
    };
    
    revenueChartInstance.data.labels = labelsMap[period] || labelsMap.weekly;
    revenueChartInstance.data.datasets[0].data = dataMap[period] || dataMap.weekly;
    revenueChartInstance.update();
}

function updateChartTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    if (revenueChartInstance) {
        revenueChartInstance.options.scales.x.ticks.color = textColor;
        revenueChartInstance.options.scales.y.ticks.color = textColor;
        revenueChartInstance.options.scales.y.grid.color = gridColor;
        revenueChartInstance.update();
    }
    
    if (categoryChartInstance) {
        categoryChartInstance.options.plugins.legend.labels.color = textColor;
        categoryChartInstance.update();
    }
}

// Counter Animation
function animateCounters() {
    const counters = [
        { element: document.getElementById('totalUsers'), target: 12345, prefix: '' },
        { element: document.getElementById('totalRevenue'), target: 48295, prefix: '$' },
        { element: document.getElementById('totalOrders'), target: 1482, prefix: '' },
        { element: document.getElementById('conversionRate'), target: 3.24, prefix: '', suffix: '%' }
    ];
    
    counters.forEach(counter => {
        if (!counter.element) return;
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        const isDecimal = counter.target % 1 !== 0;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (counter.target - start) * easeOut;
            
            if (isDecimal) {
                counter.element.textContent = counter.prefix + current.toFixed(2) + (counter.suffix || '');
            } else {
                counter.element.textContent = counter.prefix + Math.floor(current).toLocaleString() + (counter.suffix || '');
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', init);

