// TravelVista Admin Script
let charts = {};

const demoTours = [
    { id: 1, name: 'Beach Paradise', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', price: 999, duration: 7, desc: 'Relax on pristine beaches' },
    { id: 2, name: 'Mountain Trek', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', price: 1499, duration: 10, desc: 'Conquer peaks' },
    { id: 3, name: 'City Escape', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', price: 799, duration: 5, desc: 'Cultural landmarks' },
    { id: 4, name: 'Wild Safari', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957', price: 2199, duration: 12, desc: 'Wildlife adventure' }
];

const demoCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', bookings: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', bookings: 1 },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', bookings: 3 }
];

document.addEventListener('DOMContentLoaded', function() {
    // Auth check
    if (localStorage.getItem('role') !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    // Back link handler
    document.querySelector('.back-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    });

    initNavigation();
    initStats();
    initData();
    initCharts();
    initModals();
    initSearch();
});

// Navigation
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(item.dataset.page).classList.add('active');
            
            // Refresh data for active page
            if (item.dataset.page === 'bookings') loadBookings();
            if (item.dataset.page === 'tours') loadTours();
            if (item.dataset.page === 'customers') loadCustomers();
            if (item.dataset.page === 'analytics') updateCharts();
        });
    });

    document.getElementById('toggleSidebar').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

// Stats Animation
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
        animateValue(document.getElementById('totalBookings'), 0, 24, 1500);
        animateValue(document.getElementById('revenue'), 0, 18450, 2000);
        animateValue(document.getElementById('customers'), 0, 156, 1800);
        animateValue(document.getElementById('tours'), 0, 8, 1200);
    }, 500);
}

// Data Management
function initData() {
    // Seed demo data if empty
    if (!localStorage.getItem('tours')) localStorage.setItem('tours', JSON.stringify(demoTours));
    if (!localStorage.getItem('customers')) localStorage.setItem('customers', JSON.stringify(demoCustomers));
    if (!localStorage.getItem('bookings') || JSON.parse(localStorage.getItem('bookings')).length === 0) {
        const demoBookings = [
            { name: 'Sarah Johnson', tour: 'Beach Paradise', date: '2024-01-15', email: 'sarah@email.com', status: 'confirmed' },
            { name: 'Mike Chen', tour: 'Mountain Trek', date: '2024-01-20', email: 'mike@email.com', status: 'pending' }
        ];
        localStorage.setItem('bookings', JSON.stringify(demoBookings));
    }

    loadDashboard();
}

function loadDashboard() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const recent = bookings.slice(-5).reverse();
    
    document.getElementById('recentBookingsList').innerHTML = recent.map(b => `
        <div class="booking-item">
            <strong>${b.name}</strong> - ${b.tour} 
            <span class="status ${b.status}">${b.status.toUpperCase()}</span>
        </div>
    `).join('');
}

function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const tbody = document.querySelector('#bookingsTable tbody');
    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td>${b.name}</td>
            <td>${b.tour}</td>
            <td>${b.date || 'N/A'}</td>
            <td>${b.email}</td>
            <td><span class="status ${b.status || 'pending'}">${b.status?.toUpperCase() || 'PENDING'}</span></td>
            <td>
                <button class="action-btn" onclick="updateStatus('${b.timestamp}', 'confirmed')"><i class="fas fa-check"></i></button>
                <button class="action-btn" onclick="updateStatus('${b.timestamp}', 'cancelled')"><i class="fas fa-times"></i></button>
            </td>
        </tr>
    `).join('');
}

function updateStatus(timestamp, status) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.timestamp === timestamp);
    if (booking) {
        booking.status = status;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
}

function exportBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const headers = ['Name', 'Tour', 'Date', 'Email', 'Status'];
    const csv = [headers.join(','), ...bookings.map(b => [b.name, b.tour, b.date, b.email, b.status].join(','))].join('\n');
    downloadCSV(csv, 'travel-bookings.csv');
}

function loadTours() {
    const tours = JSON.parse(localStorage.getItem('tours') || '[]');
    document.getElementById('toursList').innerHTML = tours.map(tour => `
        <div class="tour-card" data-id="${tour.id}">
            <img src="${tour.image}" alt="${tour.name}">
            <h4>${tour.name}</h4>
            <div class="tour-price">$${tour.price}</div>
            <span class="duration">${tour.duration} days</span>
            <p>${tour.desc}</p>
            <div class="project-actions">
                <button class="btn-action edit" onclick="editTour(${tour.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteTour(${tour.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customersList = document.getElementById('customersList');
    customersList.innerHTML = customers.map(c => `
        <div class="user-card" data-id="${c.id}">
            <div class="user-info">
                <div class="avatar">${c.name[0]}</div>
                <h4>${c.name}</h4>
                <p>${c.email}</p>
            </div>
            <span>${c.bookings} bookings</span>
            <div class="project-actions">
                <button class="btn-action edit" onclick="editCustomer(${c.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteCustomer(${c.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

// Charts
function initCharts() {
    const bookingsCtx = document.getElementById('bookingsChart')?.getContext('2d');
    if (bookingsCtx) {
        charts.bookings = new Chart(bookingsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Bookings',
                    data: [12, 19, 25, 18, 32],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    const toursCtx = document.getElementById('toursChart')?.getContext('2d');
    if (toursCtx) {
        charts.tours = new Chart(toursCtx, {
            type: 'bar',
            data: {
                labels: ['Beach', 'Mountain', 'City', 'Safari'],
                datasets: [{
                    label: 'Bookings',
                    data: [8, 6, 5, 4],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
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
                labels: ['Beach', 'Mountain', 'City', 'Other'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function updateCharts() {
    if (charts.bookings) charts.bookings.update();
    if (charts.tours) charts.tours.update();
    if (charts.revenue) charts.revenue.update();
}

// CRUD Tours
document.getElementById('addTourBtn').addEventListener('click', () => {
    document.getElementById('tourModalTitle').textContent = 'Add Tour';
    document.getElementById('tourForm').reset();
    delete document.getElementById('tourForm').dataset.editId;
    document.getElementById('tourModal').classList.add('active');
});

document.getElementById('tourForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('tourName').value,
        price: parseFloat(document.getElementById('tourPrice').value),
        duration: parseInt(document.getElementById('tourDuration').value),
        image: document.getElementById('tourImage').value,
        desc: document.getElementById('tourDesc').value
    };
    
    let tours = JSON.parse(localStorage.getItem('tours') || '[]');
    const editId = e.target.dataset.editId;
    
    if (editId) {
        tours = tours.map(t => t.id == editId ? { ...t, ...formData } : t);
    } else {
        formData.id = Math.max(...tours.map(t => t.id), 0) + 1;
        tours.push(formData);
    }
    
    localStorage.setItem('tours', JSON.stringify(tours));
    loadTours();
    document.getElementById('tourModal').classList.remove('active');
});

function editTour(id) {
    const tours = JSON.parse(localStorage.getItem('tours') || '[]');
    const tour = tours.find(t => t.id === id);
    if (tour) {
        document.getElementById('tourName').value = tour.name;
        document.getElementById('tourPrice').value = tour.price;
        document.getElementById('tourDuration').value = tour.duration;
        document.getElementById('tourImage').value = tour.image;
        document.getElementById('tourDesc').value = tour.desc;
        document.getElementById('tourModalTitle').textContent = 'Edit Tour';
        document.getElementById('tourForm').dataset.editId = id;
        document.getElementById('tourModal').classList.add('active');
    }
}

function deleteTour(id) {
    if (confirm('Delete this tour?')) {
        let tours = JSON.parse(localStorage.getItem('tours') || '[]');
        tours = tours.filter(t => t.id !== id);
        localStorage.setItem('tours', JSON.stringify(tours));
        loadTours();
    }
}

document.getElementById('cancelTour').addEventListener('click', () => {
    document.getElementById('tourModal').classList.remove('active');
});

// Search Functions
function initSearch() {
    document.getElementById('bookingSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#bookingsTable tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });
    
    document.getElementById('customerSearch').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.user-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

// CRUD Customers
document.getElementById('addCustomerBtn').addEventListener('click', () => {
    document.getElementById('customerModalTitle').textContent = 'Add Customer';
    document.getElementById('customerForm').reset();
    document.getElementById('customerBookings').value = 0;
    delete document.getElementById('customerForm').dataset.editId;
    document.getElementById('customerModal').classList.add('active');
});

document.getElementById('customerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        bookings: parseInt(document.getElementById('customerBookings').value)
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

function editCustomer(id) {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerEmail').value = customer.email;
        document.getElementById('customerBookings').value = customer.bookings;
        document.getElementById('customerModalTitle').textContent = 'Edit Customer';
        document.getElementById('customerForm').dataset.editId = id;
        document.getElementById('customerModal').classList.add('active');
    }
}

function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        let customers = JSON.parse(localStorage.getItem('customers') || '[]');
        customers = customers.filter(c => c.id !== id);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomers();
    }
}

document.getElementById('cancelCustomer').addEventListener('click', () => {
    document.getElementById('customerModal').classList.remove('active');
});

// Utilities
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
    window.location.href = 'index.html';
}

function clearDemoData() {
    if (confirm('Clear all demo data?')) {
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

// Event delegation for copy buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.copy-btn')) {
        const el = document.getElementById(e.target.closest('.copy-btn').dataset.copy);
        copyToClipboard(el.textContent.trim());
    }
});

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});
