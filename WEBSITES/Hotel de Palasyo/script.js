/**
 * Luxury Stays Hotel Dashboard - Interactive JavaScript
 * Modern hotel management system with animated metrics, charts, modals, notifications
 */

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    initNavigation();
    initCounters();
    initProgressBars();
    initCharts();
    initModals();
    initInteractiveElements();
    initThemeToggle();
});

function initDashboard() {
    // Initialize all dashboard features
    updatePageInfo('dashboard');
    triggerAnimations();
}

/* ========================================
   NAVIGATION SYSTEM
   ======================================== */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = {};
    
    // Cache sections
    ['dashboard', 'reservations', 'rooms', 'guests', 'staff', 'billing', 'reports', 'settings'].forEach(id => {
        sections[id] = document.getElementById(id + 'Section');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
const sectionKey = item.dataset.section;
            console.log('Navigating to section:', sectionKey);
            const targetSection = sections[sectionKey];
            
            // Show target section, hide others
            Object.values(sections).forEach(section => {
                if (section) {
                    section.classList.add('hidden');
                }
            });
            
            if (targetSection) {
                targetSection.classList.remove('hidden');
            triggerAnimations(targetSection);
            try {
              updatePageInfo(sectionKey);
            } catch(e) {
              console.error('Page update failed for', sectionKey, e);
            }
            }
            
            // Close mobile sidebar
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth < 768 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Sidebar toggles
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    }
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function updatePageInfo(sectionName) {
    const pageTitles = {
        dashboard: 'Dashboard',
        reservations: 'Reservations',
        rooms: 'Room Management',
        guests: 'Guest Management',
        staff: 'Staff Management',
        billing: 'Billing & Invoicing',
        reports: 'Reports & Analytics',
        settings: 'Settings'
    };
    
    const pageSubtitles = {
        dashboard: "Welcome back! Here's what's happening today",
        reservations: 'Manage all upcoming bookings (124 active)',
        rooms: '120 total rooms | 45 available | 75 occupied',
        guests: 'Current guests (65) | Loyalty members (28)',
        staff: '42 active employees | 8 on duty | Avg 92%',
        billing: '$24,500 today | 98 unpaid folios | $15,240 outstanding',
        reports: 'Performance analytics | Revenue insights | Occupancy trends',
        settings: 'Configure hotel operations and preferences'
    };
    
    document.getElementById('pageTitle').textContent = pageTitles[sectionName] || 'Dashboard';
    document.getElementById('pageSubtitle').textContent = pageSubtitles[sectionName] || '';
    
    // Initialize section-specific features
    initSectionInteractions(sectionName);
    
    // Re-init charts if reports
    if (sectionName === 'reports') {
        initReportsCharts();
    }
}

/* ========================================
   ANIMATED COUNTERS
   ======================================== */
function initCounters() {
    const counters = document.querySelectorAll('.kpi-value[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const prefix = counter.dataset.prefix || '';
        const suffix = counter.dataset.suffix || '';
        const duration = 2500;
        
        let startTime = null;
        
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            }
        }
        
        requestAnimationFrame(animateCounter);
    });
}

/* ========================================
   PROGRESS BARS
   ======================================== */
function initProgressBars() {
    const progressBars = document.querySelectorAll('[data-width]');
    
    progressBars.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

/* ========================================
   CHARTS - Chart.js Integration
   ======================================== */
function initCharts() {
    const mainChartCtx = document.getElementById('mainChart')?.getContext('2d');
    const revenueChartCtx = document.getElementById('revenueChart')?.getContext('2d');
    
    if (mainChartCtx) createMainChart(mainChartCtx);
    if (revenueChartCtx) createRevenueChart(revenueChartCtx);
}

function createMainChart(ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Occupancy %',
                data: [62, 68, 72, 78, 82, 88, 92],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6
            }, {
                label: 'Revenue ($K)',
                data: [18, 21, 24, 26, 28, 32, 35],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 25,
                        font: { size: 13, family: 'Inter' },
                        color: '#475569'
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { color: '#64748b', font: { family: 'Inter' } }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { color: '#64748b', font: { family: 'Inter' } }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function createRevenueChart(ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Rooms', 'Food', 'Spa', 'Other'],
            datasets: [{
                label: 'Revenue Today',
                data: [18500, 4200, 1200, 600],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(212, 175, 55, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderColor: [
                    '#10b981',
                    '#f59e0b',
                    '#d4af37',
                    '#3b82f6'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { 
                        callback: value => '$' + value.toLocaleString(),
                        color: '#64748b'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
}

/* ========================================
   MODAL SYSTEM
   ======================================== */
function initModals() {
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    closeModalBtn?.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(title, bodyContent = '', footerContent = '') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyContent;
    document.getElementById('modalFooter').innerHTML = footerContent;
    
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

/* ========================================
   HOTEL-SPECIFIC INTERACTIONS
   ======================================== */
function initInteractiveElements() {
    // Quick action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showToast(`Opening ${action.toLowerCase()}...`, 'info');
        });
    });
    
    // Room status cards
    document.querySelectorAll('.room-status-card').forEach(card => {
        card.addEventListener('click', function() {
            const status = this.classList[1];
            const count = this.querySelector('.status-number').textContent;
            openRoomStatusModal(status, count);
        });
    });
    
    // Reservations items
    document.querySelectorAll('.reservation-item').forEach(item => {
        item.addEventListener('click', function() {
            const guest = this.querySelector('.guest-name').textContent;
            const room = this.querySelector('.room-number').textContent;
            showToast(`Opening reservation for ${guest} in ${room}`, 'info');
        });
    });

    // Room cards - NEW: Click room card to view details
    document.querySelectorAll('.room-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s, box-shadow 0.2s';
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-4px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        card.addEventListener('click', function(e) {
            if (e.target.closest('.room-actions button')) return; // Don't trigger if button clicked
            const roomNum = this.querySelector('.room-number').textContent;
            const roomType = this.querySelector('.room-type').textContent;
            const status = this.querySelector('.status-badge')?.textContent || this.querySelector('.room-status span')?.textContent || 'Ready';
            const price = this.querySelector('.room-price').textContent;
            const guest = this.querySelector('.room-status span:last-child')?.textContent || 'Vacant';
            openRoomModal(roomNum, roomType, status, price, guest);
        });
    });
    
    // Room action buttons
    document.querySelectorAll('.room-actions .action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            const room = this.closest('.room-card').querySelector('.room-number').textContent;
            showToast(`${action} for room ${room}`, 'success');
        });
    });
}

function openNewReservationModal() {
    const bodyContent = `
        <form class="modal-form">
            <div class="form-row">
                <div class="form-group">
                    <label>Guest Name</label>
                    <input type="text" class="form-input" placeholder="John Smith" required>
                </div>
                <div class="form-group">
                    <label>Room Type</label>
                    <select class="form-input">
                        <option>Standard Single</option>
                        <option>Deluxe Double</option>
                        <option>Executive Suite</option>
                        <option>Presidential Suite</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Check-in Date</label>
                    <input type="date" class="form-input" required>
                </div>
                <div class="form-group">
                    <label>Check-out Date</label>
                    <input type="date" class="form-input" required>
                </div>
            </div>
            <div class="form-group">
                <label>Special Requests</label>
                <textarea class="form-input" rows="3" placeholder="Extra pillows, late checkout, etc..."></textarea>
            </div>
        </form>
    `;
    
    const footerContent = `
        <button class="modal-btn secondary" onclick="closeModal()">Cancel</button>
        <button class="modal-btn primary" onclick="createReservation()">Create Booking</button>
    `;
    
    openModal('New Reservation', bodyContent, footerContent);
}

function createReservation() {
    showToast('Reservation created successfully! #RX789', 'success');
    closeModal();
}

function openRoomStatusModal(status, count) {
    const statusColors = {
        available: 'green',
        occupied: 'red',
        cleaning: 'orange',
        maintenance: 'blue'
    };
    
    const bodyContent = `
        <div style="text-align: center; padding: 2rem;">
            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, var(--room-${statusColors[status]}), #059669); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                <i class="fas fa-${status === 'available' ? 'bed' : status === 'occupied' ? 'user-friends' : status === 'cleaning' ? 'broom' : 'tools'}"></i>
            </div>
            <h3>${count} ${status.charAt(0).toUpperCase() + status.slice(1)} Rooms</h3>
            <p style="color: var(--text-muted);">Manage ${status} rooms and assignments</p>
        </div>
    `;
    
    openModal(`${status.charAt(0).toUpperCase() + status.slice(1)} Rooms`, bodyContent);
}

function checkInGuest() {
    showToast('Check-in interface opening...', 'info');
}

function checkOutGuest() {
    showToast('Check-out interface opening...', 'info');
}

function viewHousekeeping() {
    showToast('Housekeeping dashboard opening...', 'info');
}

/* ========================================
   TOAST NOTIFICATIONS
   ======================================== */
function showToast(message, type = 'info') {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.borderLeftColor = colors[type];
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
    
    // Manual close
    toast.querySelector('.toast-close').onclick = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    };
}

/* ========================================
   ANIMATIONS
   ======================================== */
function triggerAnimations(container = document) {
    const elements = container.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

/* ========================================
   THEME TOGGLE (Dark/Light)
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        localStorage.setItem('hotel-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        showToast('Theme switched!', 'info');
    });
    
    // Load saved theme
    if (localStorage.getItem('hotel-theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

/* ========================================
   NOTIFICATION DROPDOWN
   ======================================== */
function toggleNotificationDropdown() {
    const dropdown = document.getElementById('notification-dropdown');
    dropdown?.classList.toggle('active');
}

function initSectionInteractions(sectionName) {
    // Table search functionality
    const searchInput = document.getElementById(`${sectionName}Search`);
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const table = searchInput.closest('.content-wrapper').querySelector('.data-table tbody');
            const rows = table.querySelectorAll('tr');
            const term = this.value.toLowerCase();
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }
    
    // Tab switching
    const tabs = document.querySelectorAll(`#${sectionName}Section .tab-btn`);
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.tab || this.dataset.status;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            const contents = document.querySelectorAll(`#${sectionName}Section .tab-content, #${sectionName}Section [data-status]`);
            contents.forEach(content => {
                if (content.id === target + 'Tab' || content.dataset.status === target) {
                    content.classList.add('active', 'show');
                } else {
                    content.classList.remove('active', 'show');
                }
            });
        });
    });
    
    // Room status filtering
    const statusTabs = document.querySelectorAll(`#${sectionName}Section [data-status]`);
    if (statusTabs.length) {
        const rooms = document.querySelectorAll('#roomsGrid .room-card');
        statusTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.status === 'all' ? '' : tab.dataset.status;
                rooms.forEach(room => {
                    if (filter === '' || room.dataset.status === filter) {
                        room.style.display = 'block';
                    } else {
                        room.style.display = 'none';
                    }
                });
            });
        });
    }
}

function initReportsCharts() {
    // Real Chart.js charts for reports
    const charts = {
        revenueMonthlyChart: document.getElementById('revenueMonthlyChart')?.getContext('2d'),
        occupancyChart: document.getElementById('occupancyChart')?.getContext('2d'),
        revenuePieChart: document.getElementById('revenuePieChart')?.getContext('2d'),
        nationalityChart: document.getElementById('nationalityChart')?.getContext('2d')
    };

    if (charts.revenueMonthlyChart) {
        new Chart(charts.revenueMonthlyChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Revenue',
                    data: [65000, 72000, 85000, 92000, 105000, 89240],
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    tension: 0.4
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    if (charts.occupancyChart) {
        new Chart(charts.occupancyChart, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Occupancy %',
                    data: [65, 72, 78, 82, 88, 92, 78],
                    backgroundColor: '#10b981'
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    // Pie charts placeholder for now
    ['revenuePieChart', 'nationalityChart'].forEach(id => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (ctx) ctx.fillText('Interactive Chart', 150, 100);
    });
}

function createNewInvoice() {
    const bodyContent = `
        <form class="modal-form">
            <div class="form-row">
                <div class="form-group">
                    <label>Folio ID</label>
                    <input type="text" class="form-input" placeholder="FOL-005">
                </div>
                <div class="form-group">
                    <label>Guest Name</label>
                    <input type="text" class="form-input" placeholder="New Guest">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Room</label>
                    <select class="form-input">
                        <option>Suite 301</option>
                        <option>Deluxe 215</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Total Amount</label>
                    <input type="number" class="form-input" placeholder="450">
                </div>
            </div>
        </form>
    `;
    openModal('New Invoice', bodyContent, '<button class="modal-btn secondary" onclick="closeModal()">Cancel</button><button class="modal-btn primary" onclick="saveInvoice()">Create Invoice</button>');
}

function saveInvoice() {
    showToast('Invoice FOL-005 created successfully!', 'success');
    closeModal();
}

function saveSettings() {
    showToast('Settings saved!', 'success');
    // Add localStorage save logic here
}


// Global functions for onclick handlers
window.openNewReservationModal = openNewReservationModal;
window.closeModal = closeModal;
window.createReservation = createReservation;
window.checkInGuest = checkInGuest;
window.checkOutGuest = checkOutGuest;
window.viewHousekeeping = viewHousekeeping;
window.toggleNotificationDropdown = toggleNotificationDropdown;

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    const notificationContainer = document.querySelector('.notification-container');
    const dropdown = document.getElementById('notification-dropdown');
    
    if (dropdown?.classList.contains('active') && 
        notificationContainer && !notificationContainer.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById('notification-dropdown')?.classList.remove('active');
    }
    
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        openNewReservationModal();
    }
});

// PWA-like responsiveness
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth >= 768 && sidebar?.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});


    requestIdleCallback(() => {
        // Initialize after main content loads
        initInteractiveElements();
    });


