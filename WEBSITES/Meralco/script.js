// Meralco Website - Complete JavaScript Functionality
// All steps implemented

document.addEventListener('DOMContentLoaded', function() {
    // Utility: Toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        // Trigger CSS animation
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Hero Stats Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-counter]');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-counter'));
            const increment = target / 100;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    animateCounters();

    // Hero kWh Slider - Quick Bill Preview
    const heroSlider = document.getElementById('heroKwhSlider');
    const heroBillPreview = document.getElementById('heroBillPreview');
    if (heroSlider && heroBillPreview) {
        heroSlider.oninput = function() {
            const kwh = parseFloat(this.value) || 0;
            const est = Math.round(kwh * 10 + 88);
            heroBillPreview.textContent = `~₱${est.toLocaleString()}`;
        };
        heroSlider.value = 200;
        heroSlider.dispatchEvent(new Event('input'));
    }

    // Bill Calculator
    const billForm = document.getElementById('billForm');
    const totalBillEl = document.getElementById('totalBill');
    const billChartEl = document.getElementById('billChart');
    const billBreakdownEl = document.getElementById('billBreakdown');
    const billHistoryListEl = document.getElementById('billHistoryList');
    const usageTipEl = document.getElementById('usageTip');
    let billChartInstance = null;

    // Fixed tiered rate calculation
    function calculateEnergyCharge(kwh, tiers) {
        let charge = 0;
        let remaining = kwh;
        for (let tier of tiers) {
            if (remaining <= 0) break;
            const tierWidth = tier.max !== undefined ? tier.max - tier.min + 1 : Infinity;
            const used = Math.min(remaining, tierWidth);
            charge += used * tier.rate;
            remaining -= used;
        }
        return charge;
    }

    const rates = {
        residential: [
            {min: 0, max: 20, rate: 5.87},
            {min: 21, max: 30, rate: 6.88},
            {min: 31, max: 40, rate: 8.82},
            {min: 41, max: 50, rate: 9.95},
            {min: 51, rate: 10.83}
        ],
        commercial: [{min: 0, rate: 12.5}]
    };

    function calcBill(kwh, rateClass = 'residential', seniorDiscount = 0) {
        const fixed = parseFloat(document.getElementById('fixedCharge').value) || 87.59;
        const energy = calculateEnergyCharge(kwh, rates[rateClass]);
        let total = fixed + energy;
        total *= (1 - seniorDiscount);
        return Math.round(total * 100) / 100;
    }

    // History functions
    function updateHistory(calc) {
        let history = JSON.parse(localStorage.getItem('meralcoBills')) || [];
        calc.date = new Date().toLocaleDateString();
        history.unshift(calc);
        history = history.slice(0, 10);
        localStorage.setItem('meralcoBills', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('meralcoBills')) || [];
        billHistoryListEl.innerHTML = history.map((calc, i) => `
            <li class="history-item">
                ${calc.kwh}kWh (${calc.date}): ₱${calc.total.toLocaleString()}
                <button onclick="deleteBillHistory(${i})">Delete</button>
            </li>
        `).join('');
    }

    window.deleteBillHistory = i => {
        let history = JSON.parse(localStorage.getItem('meralcoBills')) || [];
        history.splice(i, 1);
        localStorage.setItem('meralcoBills', JSON.stringify(history));
        renderHistory();
    };

    function getUsageTip(kwh) {
        if (kwh < 100) return '✅ Good usage!';
        if (kwh < 200) return 'ℹ️ Average. Use LED lights.';
        return '⚠️ High. Consider energy audit.';
    }

    if (billForm) {
        billForm.onsubmit = e => {
            e.preventDefault();
            const kwh = parseFloat(document.getElementById('kwh').value) || 0;
            const rateClass = document.getElementById('rateClass').value;
            const discount = parseFloat(document.getElementById('seniorDiscount').value) || 0;
            const total = calcBill(kwh, rateClass, discount);

            totalBillEl.textContent = `₱${total.toLocaleString()}`;

            // Breakdown
            let breakdown = [];
            let remaining = kwh;
            rates[rateClass].forEach(tier => {
                if (remaining <= 0) return;
                const tierWidth = tier.max !== undefined ? tier.max - tier.min + 1 : remaining;
                const used = Math.min(remaining, tierWidth);
                breakdown.push(`${used.toFixed(0)}kWh @ ₱${tier.rate} = ₱${(used * tier.rate).toFixed(0)}`);
                remaining -= used;
            });
            breakdown.push(`Fixed: ₱87.59`);
            if (discount) breakdown.push(`Discount ${discount*100}%: -₱${(total * discount).toFixed(0)}`);

            billBreakdownEl.innerHTML = breakdown.map(b => `<div>${b}</div>`).join('');

            // Chart
            if (billChartInstance) billChartInstance.destroy();
            billChartInstance = new Chart(billChartEl, {
                type: 'doughnut',
                data: {
                    labels: ['Energy Charge', 'Fixed Charge'],
                    datasets: [{
                        data: [kwh * (total / (kwh || 1 + 10)), 87.59],
                        backgroundColor: ['var(--meralco-blue)', 'var(--success)']
                    }]
                },
                options: { responsive: true }
            });

            usageTipEl.textContent = getUsageTip(kwh);
            updateHistory({kwh, total, rateClass, discount});
            showToast('Bill calculated!');
        };
    }
    renderHistory();

    // Outage Reporting & Map
    const outageForm = document.getElementById('outageForm');
    if (outageForm) {
        outageForm.onsubmit = e => {
            e.preventDefault();
            const formData = new FormData(outageForm);
            const data = Object.fromEntries(formData);
            if (!data.accountNo || !data.outageLocation || !data.phone) {
                showToast('Complete account, location, phone.', 'error');
                return;
            }

            let reports = JSON.parse(localStorage.getItem('meralcoOutages')) || [];
            reports.unshift({
                id: `MER${Date.now()}`,
                ...data,
                status: 'Pending',
                timestamp: new Date().toLocaleString()
            });
            reports = reports.slice(0, 20);
            localStorage.setItem('meralcoOutages', JSON.stringify(reports));

            outageForm.reset();
            // Update Makati pin example
            const makatiPin = document.querySelector('[data-location="Makati"]');
            if (makatiPin) makatiPin.className = 'pin warning';

            showToast('Report submitted! Call 16211 for updates.', 'success');
        };
    }

    // Map pins interactivity
    document.querySelectorAll('.pin').forEach(pin => {
        pin.onmouseenter = () => pin.style.transform = 'scale(1.3)';
        pin.onmouseleave = () => pin.style.transform = 'scale(1)';
        pin.onclick = () => {
            const status = pin.dataset.status || 'Status unknown';
            showToast(status, 'info');
        };
    });

    // Update map timestamp
    document.getElementById('mapUpdate').textContent = new Date().toLocaleTimeString();

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = e => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            if (!data.contactName || !data.contactEmail || !data.contactMessage) {
                showToast('Please fill all fields.', 'error');
                return;
            }
            contactForm.reset();
            showToast('Message sent! We will reply within 24hrs.', 'success');
        };
    }

    // Service Modal
    document.querySelectorAll('.service-card').forEach(card => {
        card.onclick = e => {
            if (e.target.tagName === 'A') return;
            const modal = document.getElementById('serviceModal');
            document.getElementById('serviceTitle').textContent = card.querySelector('h3').textContent;
            document.getElementById('serviceDesc').textContent = card.querySelector('p').textContent + ' Contact us for details.';
            modal.classList.add('active');
        };
    });

    // Admin Login
    const adminBtn = document.getElementById('adminLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const customerContent = document.getElementById('customer-content');
    const adminContent = document.getElementById('admin-content');
    const adminPasswordInput = document.getElementById('adminPassword');

    if (adminBtn) adminBtn.onclick = () => loginModal.classList.add('active');
    if (document.getElementById('cancelLogin')) document.getElementById('cancelLogin').onclick = () => loginModal.classList.remove('active');

    if (loginForm) {
        loginForm.onsubmit = e => {
            e.preventDefault();
            if (adminPasswordInput.value === 'admin123') {
                localStorage.setItem('meralcoAdminLoggedIn', 'true');
                customerContent.style.display = 'none';
                adminContent.style.display = 'block';
                loginModal.classList.remove('active');
                initAdminDashboard();
                showToast('Admin dashboard loaded');
            } else {
                showToast('Wrong password', 'error');
            }
        };
    }

    // Check for persisted login
    if (localStorage.getItem('meralcoAdminLoggedIn') === 'true') {
        customerContent.style.display = 'none';
        adminContent.style.display = 'block';
        initAdminDashboard();
    }

    // Theme Toggle (customer & admin)
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
        toggle.onclick = () => {
            document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('meralcoTheme', document.documentElement.dataset.theme);
        };
    });
    // Load theme
    const savedTheme = localStorage.getItem('meralcoTheme');
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;

    // Admin Dashboard Init
    function initAdminDashboard() {
        // Sidebar
        document.getElementById('sidebarToggle').onclick = () => document.body.classList.toggle('sidebar-open');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.onclick = e => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById(item.dataset.page + '-page').classList.add('active');
                if (item.dataset.page === 'outages') populateAdminTables(); // Refresh data
            };
        });

        // Button handlers
        document.getElementById('generateBill').onclick = () => {
            const bills = JSON.parse(localStorage.getItem('meralcoBills')) || [];
            const newBill = {
                user: 'New Customer ' + (bills.length + 1),
                units: Math.floor(Math.random() * 200 + 100),
                costPerUnit: (9.5 + Math.random() * 2).toFixed(2),
                total: Math.floor(Math.random() * 3000 + 1000),
                status: Math.random() > 0.5 ? 'Paid' : 'Unpaid'
            };
            bills.unshift(newBill);
            localStorage.setItem('meralcoBills', JSON.stringify(bills));
            populateAdminTables();
            showToast('New bill generated!');
        };

        document.getElementById('addUserBtn').onclick = () => document.getElementById('userModal').classList.add('active');

        document.getElementById('userForm').onsubmit = e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const user = {
                name: e.target.querySelector('input[type="text"]').value,
                email: e.target.querySelector('input[type="email"]').value,
                role: e.target.querySelector('select').value
            };
            let users = JSON.parse(localStorage.getItem('meralcoUsers')) || [];
            users.unshift(user);
            localStorage.setItem('meralcoUsers', JSON.stringify(users));
            e.target.reset();
            document.getElementById('userModal').classList.remove('active');
            populateAdminTables();
            showToast('User added!');
        };

        document.getElementById('cancelBtn').onclick = () => document.getElementById('userModal').classList.remove('active');

        // Dispatch buttons
        document.addEventListener('click', e => {
            if (e.target.classList.contains('dispatch-btn')) {
                const reportId = e.target.dataset.id;
                let reports = JSON.parse(localStorage.getItem('meralcoOutages')) || [];
                const report = reports.find(r => r.id === reportId);
                if (report) {
                    report.status = 'Dispatched';
                    report.eta = 'On site';
                    localStorage.setItem('meralcoOutages', JSON.stringify(reports));
                    populateAdminTables();
                    showToast('Crew dispatched to ' + report.location);
                }
            }
        });

        // Settings form
        document.querySelector('.settings-form').onsubmit = e => {
            e.preventDefault();
            const kwhRate = document.getElementById('costPerKwh').value;
            const notifications = document.getElementById('notifications').checked;
            localStorage.setItem('meralcoSettings', JSON.stringify({kwhRate, notifications}));
            showToast('Settings saved!');
        };

        // Export reports
        document.getElementById('exportReport').onclick = () => {
            const data = JSON.parse(localStorage.getItem('meralcoBills')) || [];
            const csv = 'User,Units,Cost/Unit,Total,Status\n' + data.map(b => `${b.user},${b.units},${b.costPerUnit},${b.total},${b.status}`).join('\\n');
            const blob = new Blob([csv], {type: 'text/csv'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'meralco-reports.csv';
            a.click();
            showToast('Reports exported!');
        };

        // Sample data population
        populateAdminTables();

        // Admin charts (simple)
        initAdminCharts();
    }

    function populateAdminTables() {
        // Full table population
        // Outages
        const outagesTable = document.getElementById('outagesTable');
        const reports = JSON.parse(localStorage.getItem('meralcoOutages')) || [];
        outagesTable.innerHTML = reports.map(r => `
            <tr>
                <td>${r.id}</td>
                <td>${r.accountNo}</td>
                <td>${r.location}</td>
                <td class="status-${r.status.toLowerCase()}">${r.status}</td>
                <td>${r.eta || '30 min'}</td>
                <td><button class="dispatch-btn btn btn-success small" data-id="${r.id}">Dispatch</button></td>
            </tr>
        `).join('') || '<tr><td colspan="6">No reports</td></tr>';

        // Monitoring meters
        const monitoringTable = document.getElementById('monitoringTable');
        const meters = JSON.parse(localStorage.getItem('meralcoMeters')) || [
            {id: 'M001', location: 'Pasig', usage: '245 kWh', status: 'Online'},
            {id: 'M002', location: 'Makati', usage: '189 kWh', status: 'Warning'},
            {id: 'M003', location: 'QC', usage: '320 kWh', status: 'Offline'},
            {id: 'M004', location: 'Taguig', usage: '156 kWh', status: 'Online'}
        ];
        localStorage.setItem('meralcoMeters', JSON.stringify(meters));
        monitoringTable.innerHTML = meters.map(m => `
            <tr data-search="${m.id} ${m.location} ${m.usage} ${m.status}">
                <td>${m.id}</td>
                <td>${m.location}</td>
                <td>${m.usage}</td>
                <td class="status-${m.status.toLowerCase()}">${m.status}</td>
            </tr>
        `).join('');

        // Search filter for monitoring
        const monitoringSearch = document.getElementById('monitoringSearch');
        monitoringSearch.oninput = function() {
            const query = this.value.toLowerCase();
            const rows = monitoringTable.querySelectorAll('tr[data-search]');
            rows.forEach(row => {
                row.style.display = row.dataset.search.includes(query) ? '' : 'none';
            });
        };

        // Billing
        const billingTable = document.getElementById('billingTable');
        const bills = JSON.parse(localStorage.getItem('meralcoBills')) || [
            {user: 'Juan Dela Cruz', units: '220', costPerUnit: '10.50', total: '2500', status: 'Paid'},
            {user: 'Maria Santos', units: '180', costPerUnit: '9.80', total: '1950', status: 'Unpaid'},
            {user: 'Pedro Reyes', units: '350', costPerUnit: '11.20', total: '4100', status: 'Paid'}
        ];
        billingTable.innerHTML = bills.map(b => `
            <tr>
                <td>${b.user}</td>
                <td>${b.units}</td>
                <td>₱${b.costPerUnit}</td>
                <td>₱${b.total}</td>
                <td class="status-${b.status.toLowerCase()}">${b.status}</td>
            </tr>
        `).join('');

        // Users
        const usersTable = document.getElementById('usersTable');
        const users = JSON.parse(localStorage.getItem('meralcoUsers')) || [
            {name: 'Super Admin', role: 'Admin', email: 'admin@meralco.com'},
            {name: 'Tech Lead', role: 'Technician', email: 'tech@meralco.com'},
            {name: 'Billing Clerk', role: 'Staff', email: 'billing@meralco.com'}
        ];
        localStorage.setItem('meralcoUsers', JSON.stringify(users));
        usersTable.innerHTML = users.map(u => `
            <tr>
                <td>${u.name}</td>
                <td>${u.role}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btn btn-primary small">Edit</button>
                    <button class="btn btn-danger small">Delete</button>
                </td>
            </tr>
        `).join('');

        // Alerts
        const alertList = document.getElementById('alertList');
        const alerts = [
            {type: 'high', msg: 'High usage on Meter M002'},
            {type: 'medium', msg: 'Payment due Account 1234567890'},
            {type: 'low', msg: 'Routine maintenance scheduled'}
        ];
        alertList.innerHTML = alerts.map(a => `<div class="alert ${a.type}">${a.msg}</div>`).join('');
    }

    function initAdminCharts() {
        // Dashboard usage chart
        const usageCtx = document.getElementById('usageChartDash');
        if (usageCtx) new Chart(usageCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{ 
                    label: 'kWh Usage', 
                    data: [1200, 1300, 1100, 1400, 1250], 
                    borderColor: 'var(--meralco-blue)',
                    backgroundColor: 'rgba(0,94,184,0.1)'
                }]
            },
            options: { responsive: true }
        });

        // Monthly chart
        const monthlyCtx = document.getElementById('monthlyChartDash');
        if (monthlyCtx) new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{ 
                    label: 'Peak Load (kW)', 
                    data: [45, 52, 38, 60, 55], 
                    backgroundColor: 'var(--meralco-orange)'
                }]
            },
            options: { responsive: true }
        });

        // Reports yearly
        const yearlyCtx = document.getElementById('yearlyChartDash');
        if (yearlyCtx) new Chart(yearlyCtx, {
            type: 'pie',
            data: {
                labels: ['Residential', 'Commercial', 'Industrial'],
                datasets: [{ 
                    data: [60, 25, 15], 
                    backgroundColor: ['var(--meralco-blue)', 'var(--meralco-orange)', 'var(--success)']
                }]
            },
            options: { responsive: true }
        });
    }

    // Logout
    document.getElementById('logoutBtn').onclick = () => {
        localStorage.removeItem('meralcoAdminLoggedIn');
        customerContent.style.display = 'block';
        adminContent.style.display = 'none';
        showToast('Logged out');
    };

    // Modal close general
    window.closeModal = id => document.getElementById(id).classList.remove('active');

    console.log('Meralco website fully loaded!');
});
