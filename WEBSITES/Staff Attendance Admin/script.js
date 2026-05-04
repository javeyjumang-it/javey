// ==================== STATE & DATA ====================

let staff = [];
let departments = [];
let attendance = [];
let leaves = [];
let payroll = [];
let activities = [];
let notifications = [];
let currentUser = { name: 'Admin User', role: 'HR Manager' };

// Chart instances
let attendanceTrendChart = null;
let deptDoughnutChart = null;
let monthlyAttChart = null;
let reportAttChart = null;
let reportDeptChart = null;

// ==================== DEMO DATA SEEDING ====================

function seedData() {
    if (localStorage.getItem('staffData')) {
        loadData();
        return;
    }

    departments = [
        { id: 1, name: 'Engineering', headId: 1, description: 'Software development and IT infrastructure' },
        { id: 2, name: 'Marketing', headId: 4, description: 'Brand management and campaigns' },
        { id: 3, name: 'Sales', headId: null, description: 'Customer relations and revenue generation' },
        { id: 4, name: 'HR', headId: null, description: 'Human resources and recruitment' },
        { id: 5, name: 'Finance', headId: null, description: 'Accounting and financial planning' },
    ];

    staff = [
        { id: 1, name: 'Juan Dela Cruz', email: 'juan@acme.com', phone: '+639123456789', empId: 'EMP-001', deptId: 1, position: 'Senior Developer', joinDate: '2022-03-15', status: 'Active', salary: 65000 },
        { id: 2, name: 'Maria Santos', email: 'maria@acme.com', phone: '+639987654321', empId: 'EMP-002', deptId: 1, position: 'Frontend Developer', joinDate: '2023-01-10', status: 'Active', salary: 45000 },
        { id: 3, name: 'Pedro Reyes', email: 'pedro@acme.com', phone: '+63955556666', empId: 'EMP-003', deptId: 2, position: 'Marketing Manager', joinDate: '2021-07-22', status: 'Active', salary: 55000 },
        { id: 4, name: 'Anna Lim', email: 'anna@acme.com', phone: '+63911112222', empId: 'EMP-004', deptId: 2, position: 'Content Writer', joinDate: '2023-05-18', status: 'Active', salary: 35000 },
        { id: 5, name: 'Carlos Tan', email: 'carlos@acme.com', phone: '+63933334444', empId: 'EMP-005', deptId: 3, position: 'Sales Executive', joinDate: '2022-11-01', status: 'Inactive', salary: 40000 },
        { id: 6, name: 'Sophia Garcia', email: 'sophia@acme.com', phone: '+63977778888', empId: 'EMP-006', deptId: 4, position: 'HR Specialist', joinDate: '2023-08-30', status: 'Active', salary: 42000 },
        { id: 7, name: 'Miguel Bautista', email: 'miguel@acme.com', phone: '+63999990000', empId: 'EMP-007', deptId: 5, position: 'Accountant', joinDate: '2021-12-12', status: 'Active', salary: 48000 },
        { id: 8, name: 'Elena Cruz', email: 'elena@acme.com', phone: '+63900001111', empId: 'EMP-008', deptId: 1, position: 'DevOps Engineer', joinDate: '2023-03-05', status: 'Active', salary: 58000 },
    ];

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    attendance = [
        { id: 1, staffId: 1, date: today, clockIn: '08:45', clockOut: '17:30', status: 'Present', hours: 8.75 },
        { id: 2, staffId: 2, date: today, clockIn: '09:20', clockOut: '', status: 'Late', hours: 0 },
        { id: 3, staffId: 3, date: today, clockIn: '', clockOut: '', status: 'On Leave', hours: 0 },
        { id: 4, staffId: 4, date: today, clockIn: '08:30', clockOut: '17:15', status: 'Present', hours: 8.75 },
        { id: 5, staffId: 5, date: today, clockIn: '', clockOut: '', status: 'Absent', hours: 0 },
        { id: 6, staffId: 6, date: today, clockIn: '08:50', clockOut: '', status: 'Present', hours: 0 },
        { id: 7, staffId: 7, date: today, clockIn: '09:05', clockOut: '17:00', status: 'Present', hours: 7.92 },
        { id: 8, staffId: 8, date: today, clockIn: '09:30', clockOut: '', status: 'Late', hours: 0 },
        { id: 9, staffId: 1, date: yesterday, clockIn: '08:30', clockOut: '17:00', status: 'Present', hours: 8.5 },
        { id: 10, staffId: 2, date: yesterday, clockIn: '08:45', clockOut: '17:15', status: 'Present', hours: 8.5 },
    ];

    leaves = [
        { id: 1, staffId: 3, type: 'Sick', startDate: today, endDate: today, reason: 'Flu', status: 'Approved', appliedDate: yesterday },
        { id: 2, staffId: 5, type: 'Casual', startDate: yesterday, endDate: yesterday, reason: 'Personal matter', status: 'Pending', appliedDate: yesterday },
        { id: 3, staffId: 2, type: 'Vacation', startDate: '2024-02-01', endDate: '2024-02-05', reason: 'Family trip', status: 'Approved', appliedDate: '2024-01-15' },
    ];

    payroll = [
        { id: 1, staffId: 1, month: '2024-01', baseSalary: 65000, bonus: 5000, deductions: 3250, netPay: 66750, status: 'Paid' },
        { id: 2, staffId: 2, month: '2024-01', baseSalary: 45000, bonus: 2000, deductions: 2250, netPay: 44750, status: 'Paid' },
        { id: 3, staffId: 3, month: '2024-01', baseSalary: 55000, bonus: 3000, deductions: 2750, netPay: 55250, status: 'Pending' },
        { id: 4, staffId: 4, month: '2024-01', baseSalary: 35000, bonus: 0, deductions: 1750, netPay: 33250, status: 'Paid' },
        { id: 5, staffId: 6, month: '2024-01', baseSalary: 42000, bonus: 1500, deductions: 2100, netPay: 41400, status: 'Pending' },
    ];

    activities = [
        { id: 1, icon: 'fa-user-plus', color: 'success', text: 'Sophia Garcia was added to HR department', time: '10 minutes ago' },
        { id: 2, icon: 'fa-clock', color: 'warning', text: 'Elena Cruz clocked in late at 09:30', time: '30 minutes ago' },
        { id: 3, icon: 'fa-check-circle', color: 'success', text: 'Juan Dela Cruz marked present', time: '1 hour ago' },
        { id: 4, icon: 'fa-calendar-check', color: 'info', text: 'Pedro Reyes leave was approved', time: '2 hours ago' },
        { id: 5, icon: 'fa-money-bill-wave', color: 'primary', text: 'January payroll processed', time: '3 hours ago' },
    ];

    notifications = [
        { id: 1, icon: 'fa-clock', color: 'warning', text: '2 staff members are late today', time: 'Just now', read: false },
        { id: 2, icon: 'fa-user-plus', color: 'success', text: 'New leave request from Carlos Tan', time: '15 min ago', read: false },
        { id: 3, icon: 'fa-exclamation', color: 'danger', text: 'Pedro Reyes is absent without notice', time: '1 hour ago', read: false },
    ];

    saveData();
}

function saveData() {
    localStorage.setItem('staffData', JSON.stringify(staff));
    localStorage.setItem('deptData', JSON.stringify(departments));
    localStorage.setItem('attendanceData', JSON.stringify(attendance));
    localStorage.setItem('leaveData', JSON.stringify(leaves));
    localStorage.setItem('payrollData', JSON.stringify(payroll));
    localStorage.setItem('activityData', JSON.stringify(activities));
    localStorage.setItem('notifData', JSON.stringify(notifications));
}

function loadData() {
    staff = JSON.parse(localStorage.getItem('staffData') || '[]');
    departments = JSON.parse(localStorage.getItem('deptData') || '[]');
    attendance = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    leaves = JSON.parse(localStorage.getItem('leaveData') || '[]');
    payroll = JSON.parse(localStorage.getItem('payrollData') || '[]');
    activities = JSON.parse(localStorage.getItem('activityData') || '[]');
    notifications = JSON.parse(localStorage.getItem('notifData') || '[]');
}

// ==================== AUTH ====================

function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === '1234') {
        localStorage.setItem('staffAdminAuth', 'true');
        showApp();
        showToast('Welcome back, HR Manager!', 'success');
        addActivity('fa-sign-in-alt', 'primary', 'Admin logged in', 'Just now');
    } else {
        document.getElementById('loginError').textContent = 'Invalid username or password';
        showToast('Login failed', 'error');
    }
}

function logout() {
    localStorage.removeItem('staffAdminAuth');
    location.reload();
}

function showApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appPage').classList.remove('hidden');
    seedData();
    initApp();
}

function checkAuth() {
    if (localStorage.getItem('staffAdminAuth') === 'true') {
        showApp();
    }
}

// ==================== NAVIGATION ====================

function navigate(pageId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav li').forEach(l => l.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
    const navItem = document.querySelector(`.sidebar-nav li[data-page="${pageId}"]`);
    if (navItem) navItem.classList.add('active');

    if (pageId === 'dashboard') renderDashboard();
    if (pageId === 'staff') renderStaff();
    if (pageId === 'attendance') renderAttendance();
    if (pageId === 'departments') renderDepartments();
    if (pageId === 'leave') renderLeave();
    if (pageId === 'payroll') renderPayroll();
    if (pageId === 'reports') renderReports();

    if (window.innerWidth <= 768) closeSidebar();
}

function setupNavigation() {
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const page = link.getAttribute('href').substring(1);
            navigate(page);
        });
    });

    document.getElementById('menuBtn').addEventListener('click', openSidebar);
    document.getElementById('closeSidebar').addEventListener('click', closeSidebar);
    document.getElementById('overlay').addEventListener('click', closeSidebar);
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// ==================== THEME ====================

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.querySelector('#themeToggle i');
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
    updateChartsTheme();
}

function restoreTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') toggleTheme();
}

// ==================== NOTIFICATIONS ====================

function toggleNotifications() {
    document.getElementById('notifDropdown').classList.toggle('active');
}

function markAllRead() {
    notifications.forEach(n => n.read = true);
    saveData();
    renderNotifications();
}

function renderNotifications() {
    const list = document.getElementById('notifList');
    const badge = document.getElementById('notifBadge');
    const unread = notifications.filter(n => !n.read).length;
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';

    if (notifications.length === 0) {
        list.innerHTML = '<p class="empty-notif">No notifications</p>';
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" onclick="readNotif(${n.id})">
            <div class="notif-icon ${n.color}"><i class="fas ${n.icon}"></i></div>
            <div class="notif-content"><p>${n.text}</p><span>${n.time}</span></div>
    `).join('');
}

function readNotif(id) {
    const n = notifications.find(x => x.id === id);
    if (n) { n.read = true; saveData(); renderNotifications(); }
}

function addNotification(icon, color, text) {
    notifications.unshift({ id: Date.now(), icon, color, text, time: 'Just now', read: false });
    if (notifications.length > 20) notifications.pop();
    saveData();
    renderNotifications();
}

// ==================== TOASTS ====================

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check', error: 'fa-times', warning: 'fa-exclamation', info: 'fa-info' };
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ==================== ACTIVITY ====================

function addActivity(icon, color, text, time) {
    activities.unshift({ id: Date.now(), icon, color, text, time: time || 'Just now' });
    if (activities.length > 50) activities.pop();
    saveData();
    renderActivityList();
}

function renderActivityList() {
    const list = document.getElementById('dashActivityList');
    if (!list) return;
    list.innerHTML = activities.slice(0, 6).map(a => `
        <div class="activity-item">
            <div class="activity-icon" style="background:${getColorBg(a.color)};color:${getColorValue(a.color)}">
                <i class="fas ${a.icon}"></i>
            </div>
            <div class="activity-content"><p>${a.text}</p><span>${a.time}</span></div>
    `).join('');
}

function getColorBg(color) {
    const map = { primary: 'rgba(99,102,241,0.1)', success: 'rgba(16,185,129,0.1)', warning: 'rgba(245,158,11,0.1)', danger: 'rgba(239,68,68,0.1)', info: 'rgba(59,130,246,0.1)' };
    return map[color] || map.primary;
}
function getColorValue(color) {
    const map = { primary: '#6366f1', success: '#10b981', warning: '#f59e0b', danger: '#ef4444', info: '#3b82f6' };
    return map[color] || map.primary;
}

// ==================== HELPERS ====================

function getDeptName(deptId) {
    const d = departments.find(x => x.id === deptId);
    return d ? d.name : 'N/A';
}

function getStaffName(staffId) {
    const s = staff.find(x => x.id === staffId);
    return s ? s.name : 'Unknown';
}

function getStaffAvatar(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
}

function escapeHtml(text) {
    const d = document.createElement('div'); d.textContent = text; return d.innerHTML;
}

// ==================== DASHBOARD ====================

function renderDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todayAtt = attendance.filter(a => a.date === today);
    const present = todayAtt.filter(a => a.status === 'Present').length;
    const late = todayAtt.filter(a => a.status === 'Late').length;
    const onLeave = todayAtt.filter(a => a.status === 'On Leave').length;
    const absent = todayAtt.filter(a => a.status === 'Absent').length;

    animateCounter('dashTotalStaff', staff.filter(s => s.status === 'Active').length);
    animateCounter('dashPresent', present);
    animateCounter('dashLate', late);
    animateCounter('dashOnLeave', onLeave);
    animateCounter('dashAbsent', absent);

    renderDashAttendanceTable(todayAtt);
    renderActivityList();
    initDashboardCharts();
}

function animateCounter(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
    }, 16);
}

function renderDashAttendanceTable(todayAtt) {
    const tbody = document.getElementById('dashAttendanceTable');
    if (!tbody) return;
    tbody.innerHTML = todayAtt.slice(0, 5).map(a => {
        const s = staff.find(x => x.id === a.staffId);
        return `
            <tr>
                <td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td>
                <td>${a.clockIn || '-'}</td>
                <td><span class="status-badge ${a.status.toLowerCase().replace(' ', '')}">${a.status}</span></td>
                <td>${a.hours > 0 ? a.hours + 'h' : '-'}</td>
            </tr>
        `;
    }).join('');
}

// ==================== CHARTS ====================

function initDashboardCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    const weeklyData = [42, 45, 40, 48, 44, 38, 41];
    if (attendanceTrendChart) attendanceTrendChart.destroy();
    const ctx1 = document.getElementById('attendanceTrendChart');
    if (ctx1) {
        attendanceTrendChart = new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Present',
                    data: weeklyData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
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

    const deptCounts = departments.map(d => staff.filter(s => s.deptId === d.id && s.status === 'Active').length);
    if (deptDoughnutChart) deptDoughnutChart.destroy();
    const ctx2 = document.getElementById('deptDoughnutChart');
    if (ctx2) {
        deptDoughnutChart = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: departments.map(d => d.name),
                datasets: [{
                    data: deptCounts,
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
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
                        labels: { color: textColor, padding: 15, usePointStyle: true, pointStyle: 'circle' }
                    }
                },
                cutout: '70%'
            }
        });
    }
}

function updateChartsTheme() {
    initDashboardCharts();
    if (document.getElementById('attendance').classList.contains('active')) renderAttendance();
    if (document.getElementById('reports').classList.contains('active')) renderReports();
}

// ==================== STAFF MANAGEMENT ====================

function renderStaff() {
    const tbody = document.getElementById('staffTableBody');
    const deptFilter = document.getElementById('staffDeptFilter');
    if (deptFilter && deptFilter.options.length <= 1) {
        departments.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.id; opt.textContent = d.name;
            deptFilter.appendChild(opt);
        });
    }

    const searchVal = (document.getElementById('staffSearch')?.value || '').toLowerCase();
    const deptVal = document.getElementById('staffDeptFilter')?.value || 'all';
    const statusVal = document.getElementById('staffStatusFilter')?.value || 'all';

    let filtered = staff.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(searchVal) || s.empId.toLowerCase().includes(searchVal);
        const matchDept = deptVal === 'all' || s.deptId == deptVal;
        const matchStatus = statusVal === 'all' || s.status === statusVal;
        return matchSearch && matchDept && matchStatus;
    });

    tbody.innerHTML = filtered.map(s => `
        <tr>
            <td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td>
            <td>${s.empId}</td>
            <td>${getDeptName(s.deptId)}</td>
            <td>${s.position}</td>
            <td><span class="status-badge ${s.status.toLowerCase()}">${s.status}</span></td>
            <td>${s.joinDate}</td>
            <td>
                <div class="action-btns">
                    <button onclick="viewStaff(${s.id})" title="View"><i class="fas fa-eye"></i></button>
                    <button onclick="editStaff(${s.id})" title="Edit"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteStaff(${s.id})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    if (filtered.length === 0) tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-secondary);padding:30px;">No staff found</td></tr>';
}

function openStaffModal() {
    document.getElementById('staffModalTitle').textContent = 'Add Staff';
    document.getElementById('staffForm').reset();
    document.getElementById('staffEditId').value = '';
    populateDeptSelect('stDept');
    showModal('staffModal');
}

function editStaff(id) {
    const s = staff.find(x => x.id === id);
    if (!s) return;
    document.getElementById('staffModalTitle').textContent = 'Edit Staff';
    document.getElementById('staffEditId').value = s.id;
    document.getElementById('stName').value = s.name;
    document.getElementById('stEmpId').value = s.empId;
    document.getElementById('stEmail').value = s.email;
    document.getElementById('stPhone').value = s.phone || '';
    populateDeptSelect('stDept', s.deptId);
    document.getElementById('stPosition').value = s.position;
    document.getElementById('stJoinDate').value = s.joinDate;
    document.getElementById('stSalary').value = s.salary;
    document.getElementById('stStatus').value = s.status;
    showModal('staffModal');
}

function saveStaff(e) {
    e.preventDefault();
    const id = document.getElementById('staffEditId').value;
    const data = {
        name: document.getElementById('stName').value.trim(),
        empId: document.getElementById('stEmpId').value.trim(),
        email: document.getElementById('stEmail').value.trim(),
        phone: document.getElementById('stPhone').value.trim(),
        deptId: parseInt(document.getElementById('stDept').value),
        position: document.getElementById('stPosition').value.trim(),
        joinDate: document.getElementById('stJoinDate').value,
        salary: parseFloat(document.getElementById('stSalary').value) || 0,
        status: document.getElementById('stStatus').value
    };

    if (id) {
        const idx = staff.findIndex(s => s.id == id);
        if (idx >= 0) { staff[idx] = { ...staff[idx], ...data }; showToast('Staff updated', 'success'); }
    } else {
        data.id = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
        staff.push(data);
        showToast('Staff added', 'success');
        addActivity('fa-user-plus', 'success', `${data.name} was added`, 'Just now');
    }
    saveData();
    closeModal('staffModal');
    renderStaff();
}

function deleteStaff(id) {
    const s = staff.find(x => x.id === id);
    if (!s) return;
    if (confirm(`Delete ${s.name}?`)) {
        staff = staff.filter(x => x.id !== id);
        saveData();
        renderStaff();
        showToast('Staff deleted', 'warning');
    }
}

function viewStaff(id) {
    const s = staff.find(x => x.id === id);
    if (!s) return;
    const dept = getDeptName(s.deptId);
    const content = document.getElementById('staffDetailContent');
    const today = new Date().toISOString().split('T')[0];
    const todayStatus = attendance.find(a => a.staffId === id && a.date === today);
    content.innerHTML = `
        <div style="text-align:center;margin-bottom:20px;">
            <img src="${getStaffAvatar(s.name)}" style="width:80px;height:80px;border-radius:50%;margin-bottom:12px;">
            <h2>${escapeHtml(s.name)}</h2>
            <p style="color:var(--text-secondary)">${s.position} | ${dept}</p>
            <span class="status-badge ${s.status.toLowerCase()}">${s.status}</span>
            ${todayStatus ? `<span class="status-badge ${todayStatus.status.toLowerCase().replace(' ', '')}" style="margin-left:8px;">${todayStatus.status}</span>` : ''}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Employee ID</small><div style="font-weight:600">${s.empId}</div></div>
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Email</small><div style="font-weight:600">${s.email}</div></div>
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Phone</small><div style="font-weight:600">${s.phone || '-'}</div></div>
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Joined</small><div style="font-weight:600">${s.joinDate}</div></div>
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Base Salary</small><div style="font-weight:600">₱${s.salary?.toLocaleString() || 0}</div></div>
            <div style="background:var(--bg-color);padding:12px;border-radius:8px;"><small style="color:var(--text-secondary)">Department</small><div style="font-weight:600">${dept}</div></div>
        </div>
        <div style="text-align:center;">
            <button class="btn-primary" onclick="closeModal('staffDetailModal');editStaff(${s.id})"><i class="fas fa-edit"></i> Edit</button>
            <button class="btn-secondary" onclick="closeModal('staffDetailModal')">Close</button>
        </div>
    `;
    showModal('staffDetailModal');
}

function populateDeptSelect(selectId, selectedId) {
    const sel = document.getElementById(selectId);
    sel.innerHTML = '';
    departments.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id; opt.textContent = d.name;
        if (selectedId && d.id === selectedId) opt.selected = true;
        sel.appendChild(opt);
    });
}

function exportStaffCSV() {
    const headers = ['ID', 'Name', 'Emp ID', 'Email', 'Phone', 'Department', 'Position', 'Join Date', 'Status', 'Salary'];
    const rows = staff.map(s => [s.id, `"${s.name}"`, s.empId, s.email, s.phone || '', getDeptName(s.deptId), s.position, s.joinDate, s.status, s.salary || 0]);
    downloadCSV([headers.join(','), ...rows.map(r => r.join(','))].join('\n'), 'staff_export.csv');
    showToast('Staff exported to CSV', 'success');
}

// ==================== ATTENDANCE ====================

function renderAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('attendanceDate');
    if (dateInput && !dateInput.value) dateInput.value = today;
    const selectedDate = dateInput?.value || today;

    const dayAtt = attendance.filter(a => a.date === selectedDate);
    const present = dayAtt.filter(a => a.status === 'Present').length;
    const late = dayAtt.filter(a => a.status === 'Late').length;
    const absent = dayAtt.filter(a => a.status === 'Absent').length;

    animateCounter('attPresent', present);
    animateCounter('attLate', late);
    animateCounter('attAbsent', absent);

    const tbody = document.getElementById('attendanceTableBody');
    const activeStaff = staff.filter(s => s.status === 'Active');
    tbody.innerHTML = activeStaff.map(s => {
        const att = dayAtt.find(a => a.staffId === s.id);
        return `
            <tr>
                <td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td>
                <td>${getDeptName(s.deptId)}</td>
                <td>${att?.clockIn || '-'}</td>
                <td>${att?.clockOut || '-'}</td>
                <td><span class="status-badge ${(att?.status || 'Absent').toLowerCase().replace(' ', '')}">${att?.status || 'Absent'}</span></td>
                <td>${att?.hours > 0 ? att.hours + 'h' : '-'}</td>
                <td>
                    <div class="action-btns">
                        <button onclick="clockIn(${s.id})" title="Clock In" ${att?.clockIn ? 'disabled style="opacity:0.4"' : ''}><i class="fas fa-sign-in-alt"></i></button>
                        <button onclick="clockOut(${s.id})" title="Clock Out" ${!att?.clockIn || att?.clockOut ? 'disabled style="opacity:0.4"' : ''}><i class="fas fa-sign-out-alt"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    renderMonthlyAttChart();
}

function clockIn(staffId) {
    const today = document.getElementById('attendanceDate')?.value || new Date().toISOString().split('T')[0];
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const settings = JSON.parse(localStorage.getItem('companySettings') || '{}');
    const threshold = settings.lateThreshold || 15;
    const workStart = settings.workStart || '09:00';
    const [wh, wm] = workStart.split(':').map(Number);
    const startMin = wh * 60 + wm;
    const [ch, cm] = timeStr.split(':').map(Number);
    const clockMin = ch * 60 + cm;
    const status = clockMin > startMin + threshold ? 'Late' : 'Present';

    let att = attendance.find(a => a.staffId === staffId && a.date === today);
    if (att) {
        att.clockIn = timeStr; att.status = status;
    } else {
        attendance.push({ id: Date.now(), staffId, date: today, clockIn: timeStr, clockOut: '', status, hours: 0 });
    }
    saveData();
    const s = staff.find(x => x.id === staffId);
    addActivity('fa-sign-in-alt', 'success', `${s.name} clocked in at ${timeStr}`, 'Just now');
    if (status === 'Late') addNotification('fa-clock', 'warning', `${s.name} is late today`);
    renderAttendance();
    showToast(`${s.name} clocked in`, 'success');
}

function clockOut(staffId) {
    const today = document.getElementById('attendanceDate')?.value || new Date().toISOString().split('T')[0];
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const att = attendance.find(a => a.staffId === staffId && a.date === today);
    if (!att || !att.clockIn) return;
    att.clockOut = timeStr;
    const [ih, im] = att.clockIn.split(':').map(Number);
    const [oh, om] = timeStr.split(':').map(Number);
    att.hours = Math.round(((oh * 60 + om) - (ih * 60 + im)) / 60 * 100) / 100;
    saveData();
    renderAttendance();
    const s = staff.find(x => x.id === staffId);
    addActivity('fa-sign-out-alt', 'primary', `${s.name} clocked out at ${timeStr}`, 'Just now');
    showToast(`${s.name} clocked out`, 'info');
}

function markAllPresent() {
    const today = document.getElementById('attendanceDate')?.value || new Date().toISOString().split('T')[0];
    const activeStaff = staff.filter(s => s.status === 'Active');
    activeStaff.forEach(s => {
        const att = attendance.find(a => a.staffId === s.id && a.date === today);
        if (!att) {
            attendance.push({ id: Date.now() + s.id, staffId: s.id, date: today, clockIn: '09:00', clockOut: '17:00', status: 'Present', hours: 8 });
        }
    });
    saveData();
    renderAttendance();
    showToast('All active staff marked present', 'success');
}

function renderMonthlyAttChart() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    if (monthlyAttChart) monthlyAttChart.destroy();
    const ctx = document.getElementById('monthlyAttChart');
    if (!ctx) return;

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const presentData = [38, 40, 37, 42];
    const lateData = [2, 3, 4, 1];
    const absentData = [1, 0, 2, 1];

    monthlyAttChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Present', data: presentData, backgroundColor: '#10b981', borderRadius: 4 },
                { label: 'Late', data: lateData, backgroundColor: '#f59e0b', borderRadius: 4 },
                { label: 'Absent', data: absentData, backgroundColor: '#ef4444', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { color: textColor, usePointStyle: true } } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: textColor } },
                y: { stacked: true, grid: { color: gridColor }, ticks: { color: textColor } }
            }
        }
    });
}

// ==================== DEPARTMENTS ====================

function renderDepartments() {
    const grid = document.getElementById('deptGrid');
    grid.innerHTML = departments.map(d => {
        const count = staff.filter(s => s.deptId === d.id && s.status === 'Active').length;
        const head = d.headId ? getStaffName(d.headId) : 'Not assigned';
        return `
            <div class="dept-card">
                <h4>${escapeHtml(d.name)}</h4>
                <p>${escapeHtml(d.description || '')}</p>
                <div class="dept-count">${count}</div>
                <p style="color:var(--text-secondary)">Active Staff</p>
                <p style="margin-top:8px"><strong>Head:</strong> ${head}</p>
                <div class="dept-actions">
                    <button class="btn-outline" onclick="editDept(${d.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-secondary" onclick="deleteDept(${d.id})"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function openDeptModal() {
    document.getElementById('deptModalTitle').textContent = 'Add Department';
    document.getElementById('deptForm').reset();
    document.getElementById('deptEditId').value = '';
    populateStaffSelect('deptHead');
    showModal('deptModal');
}

function editDept(id) {
    const d = departments.find(x => x.id === id);
    if (!d) return;
    document.getElementById('deptModalTitle').textContent = 'Edit Department';
    document.getElementById('deptEditId').value = d.id;
    document.getElementById('deptName').value = d.name;
    document.getElementById('deptDesc').value = d.description || '';
    populateStaffSelect('deptHead', d.headId);
    showModal('deptModal');
}

function saveDept(e) {
    e.preventDefault();
    const id = document.getElementById('deptEditId').value;
    const data = {
        name: document.getElementById('deptName').value.trim(),
        headId: document.getElementById('deptHead').value ? parseInt(document.getElementById('deptHead').value) : null,
        description: document.getElementById('deptDesc').value.trim()
    };
    if (id) {
        const idx = departments.findIndex(d => d.id == id);
        if (idx >= 0) { departments[idx] = { ...departments[idx], ...data }; showToast('Department updated', 'success'); }
    } else {
        data.id = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
        departments.push(data);
        showToast('Department added', 'success');
    }
    saveData();
    closeModal('deptModal');
    renderDepartments();
}

function deleteDept(id) {
    const d = departments.find(x => x.id === id);
    if (!d) return;
    const count = staff.filter(s => s.deptId === id).length;
    if (count > 0) { showToast(`Cannot delete: ${count} staff assigned`, 'error'); return; }
    if (confirm(`Delete ${d.name}?`)) {
        departments = departments.filter(x => x.id !== id);
        saveData();
        renderDepartments();
        showToast('Department deleted', 'warning');
    }
}

function populateStaffSelect(selectId, selectedId) {
    const sel = document.getElementById(selectId);
    sel.innerHTML = '<option value="">None</option>';
    staff.filter(s => s.status === 'Active').forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id; opt.textContent = s.name;
        if (selectedId && s.id === selectedId) opt.selected = true;
        sel.appendChild(opt);
    });
}

// ==================== LEAVE ====================

function renderLeave() {
    const statusFilter = document.getElementById('leaveStatusFilter')?.value || 'all';
    let filtered = statusFilter === 'all' ? leaves : leaves.filter(l => l.status === statusFilter);

    document.getElementById('leavePending').textContent = leaves.filter(l => l.status === 'Pending').length;
    document.getElementById('leaveApproved').textContent = leaves.filter(l => l.status === 'Approved').length;
    document.getElementById('leaveRejected').textContent = leaves.filter(l => l.status === 'Rejected').length;

    const tbody = document.getElementById('leaveTableBody');
    tbody.innerHTML = filtered.map(l => {
        const s = staff.find(x => x.id === l.staffId);
        return `
            <tr>
                <td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td>
                <td>${l.type}</td>
                <td>${l.startDate} to ${l.endDate}</td>
                <td>${escapeHtml(l.reason || '-')}</td>
                <td><span class="status-badge ${l.status.toLowerCase()}">${l.status}</span></td>
                <td>
                    ${l.status === 'Pending' ? `
                        <div class="action-btns">
                            <button onclick="approveLeave(${l.id})" title="Approve" style="color:var(--success-color)"><i class="fas fa-check"></i></button>
                            <button onclick="rejectLeave(${l.id})" title="Reject" style="color:var(--danger-color)"><i class="fas fa-times"></i></button>
                        </div>
                    ` : '-'}
                </td>
            </tr>
        `;
    }).join('');

    if (filtered.length === 0) tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-secondary);padding:30px;">No leave requests</td></tr>';
}

function openLeaveModal() {
    document.getElementById('leaveForm').reset();
    populateStaffSelect('lvStaff');
    showModal('leaveModal');
}

function saveLeave(e) {
    e.preventDefault();
    const data = {
        id: Date.now(),
        staffId: parseInt(document.getElementById('lvStaff').value),
        type: document.getElementById('lvType').value,
        startDate: document.getElementById('lvStart').value,
        endDate: document.getElementById('lvEnd').value,
        reason: document.getElementById('lvReason').value.trim(),
        status: 'Pending',
        appliedDate: new Date().toISOString().split('T')[0]
    };
    leaves.push(data);
    saveData();
    const s = staff.find(x => x.id === data.staffId);
    addNotification('fa-calendar-check', 'info', `New leave request from ${s.name}`);
    addActivity('fa-calendar-plus', 'info', `${s.name} applied for ${data.type} leave`, 'Just now');
    closeModal('leaveModal');
    renderLeave();
    showToast('Leave request submitted', 'success');
}

function approveLeave(id) {
    const l = leaves.find(x => x.id === id);
    if (!l) return;
    l.status = 'Approved';
    saveData();
    const s = staff.find(x => x.id === l.staffId);
    addActivity('fa-check', 'success', `${s.name}'s leave was approved`, 'Just now');
    renderLeave();
    showToast('Leave approved', 'success');
}

function rejectLeave(id) {
    const l = leaves.find(x => x.id === id);
    if (!l) return;
    l.status = 'Rejected';
    saveData();
    const s = staff.find(x => x.id === l.staffId);
    addActivity('fa-times', 'danger', `${s.name}'s leave was rejected`, 'Just now');
    renderLeave();
    showToast('Leave rejected', 'warning');
}

// ==================== PAYROLL ====================

function renderPayroll() {
    const monthSel = document.getElementById('payrollMonth');
    if (monthSel && monthSel.options.length === 0) {
        const months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];
        months.forEach(m => { const opt = document.createElement('option'); opt.value = m; opt.textContent = m; monthSel.appendChild(opt); });
        monthSel.value = '2024-01';
    }
    const month = monthSel?.value || '2024-01';
    const monthPay = payroll.filter(p => p.month === month);

    const tbody = document.getElementById('payrollTableBody');
    tbody.innerHTML = monthPay.map(p => {
        const s = staff.find(x => x.id === p.staffId);
        return `
            <tr>
                <td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td>
                <td>₱${p.baseSalary.toLocaleString()}</td>
                <td>₱${p.bonus.toLocaleString()}</td>
                <td>₱${p.deductions.toLocaleString()}</td>
                <td style="font-weight:700">₱${p.netPay.toLocaleString()}</td>
                <td><span class="status-badge ${p.status.toLowerCase()}">${p.status}</span></td>
            </tr>
        `;
    }).join('');

    if (monthPay.length === 0) tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-secondary);padding:30px;">No payroll data for this month</td></tr>';
}

function exportPayrollCSV() {
    const month = document.getElementById('payrollMonth')?.value || '2024-01';
    const data = payroll.filter(p => p.month === month);
    const headers = ['Staff', 'Base Salary', 'Bonus', 'Deductions', 'Net Pay', 'Status'];
    const rows = data.map(p => [getStaffName(p.staffId), p.baseSalary, p.bonus, p.deductions, p.netPay, p.status]);
    downloadCSV([headers.join(','), ...rows.map(r => r.join(','))].join('\n'), `payroll_${month}.csv`);
    showToast('Payroll exported', 'success');
}

// ==================== REPORTS ====================

function renderReports() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    if (reportAttChart) reportAttChart.destroy();
    const ctx1 = document.getElementById('reportAttChart');
    if (ctx1) {
        reportAttChart = new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    { label: 'Present', data: [38, 40, 37, 42], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4 },
                    { label: 'Late', data: [2, 3, 4, 1], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', fill: true, tension: 0.4 },
                    { label: 'Absent', data: [1, 0, 2, 1], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { color: textColor } } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor } },
                    y: { grid: { color: gridColor }, ticks: { color: textColor } }
                }
            }
        });
    }

    if (reportDeptChart) reportDeptChart.destroy();
    const ctx2 = document.getElementById('reportDeptChart');
    if (ctx2) {
        const deptNames = departments.map(d => d.name);
        const deptPresent = departments.map(d => {
            const ids = staff.filter(s => s.deptId === d.id && s.status === 'Active').map(s => s.id);
            return attendance.filter(a => ids.includes(a.staffId) && a.status === 'Present').length;
        });
        const deptLate = departments.map(d => {
            const ids = staff.filter(s => s.deptId === d.id && s.status === 'Active').map(s => s.id);
            return attendance.filter(a => ids.includes(a.staffId) && a.status === 'Late').length;
        });
        reportDeptChart = new Chart(ctx2.getContext('2d'), {
            type: 'bar',
            data: {
                labels: deptNames,
                datasets: [
                    { label: 'Present', data: deptPresent, backgroundColor: '#10b981', borderRadius: 4 },
                    { label: 'Late', data: deptLate, backgroundColor: '#f59e0b', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor } },
                    y: { grid: { color: gridColor }, ticks: { color: textColor } }
                }
            }
        });
    }

    // Late report
    const lateCounts = {};
    attendance.filter(a => a.status === 'Late').forEach(a => { lateCounts[a.staffId] = (lateCounts[a.staffId] || 0) + 1; });
    const lateArr = Object.entries(lateCounts).map(([sid, count]) => ({ staffId: parseInt(sid), count })).sort((a, b) => b.count - a.count).slice(0, 5);
    document.getElementById('lateReportTable').innerHTML = lateArr.map(l => {
        const s = staff.find(x => x.id === l.staffId);
        return `<tr><td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td><td>${getDeptName(s.deptId)}</td><td>${l.count}</td></tr>`;
    }).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--text-secondary);padding:20px;">No late records</td></tr>';

    // Absent report
    const absentCounts = {};
    attendance.filter(a => a.status === 'Absent').forEach(a => { absentCounts[a.staffId] = (absentCounts[a.staffId] || 0) + 1; });
    const absentArr = Object.entries(absentCounts).map(([sid, count]) => ({ staffId: parseInt(sid), count })).sort((a, b) => b.count - a.count).slice(0, 5);
    document.getElementById('absentReportTable').innerHTML = absentArr.map(a => {
        const s = staff.find(x => x.id === a.staffId);
        return `<tr><td><div class="user-cell"><img src="${getStaffAvatar(s.name)}" alt="">${escapeHtml(s.name)}</div></td><td>${getDeptName(s.deptId)}</td><td>${a.count}</td></tr>`;
    }).join('') || '<tr><td colspan="3" style="text-align:center;color:var(--text-secondary);padding:20px;">No absence records</td></tr>';
}

function exportReportCSV() {
    const headers = ['Metric', 'Value'];
    const rows = [
        ['Total Staff', staff.filter(s => s.status === 'Active').length],
        ['Present Today', attendance.filter(a => a.status === 'Present').length],
        ['Late Today', attendance.filter(a => a.status === 'Late').length],
        ['Absent Today', attendance.filter(a => a.status === 'Absent').length],
    ];
    downloadCSV([headers.join(','), ...rows.map(r => r.join(','))].join('\n'), 'report_summary.csv');
    showToast('Report exported', 'success');
}

// ==================== SETTINGS ====================

function saveProfile(e) {
    e.preventDefault();
    currentUser.name = document.getElementById('setName').value;
    document.querySelector('.profile-info .name').textContent = currentUser.name;
    showToast('Profile saved', 'success');
}

function savePrefs(e) {
    e.preventDefault();
    showToast('Preferences saved', 'success');
}

function saveCompany(e) {
    e.preventDefault();
    const settings = {
        companyName: document.getElementById('setCompanyName').value,
        workStart: document.getElementById('setWorkStart').value,
        workEnd: document.getElementById('setWorkEnd').value,
        lateThreshold: parseInt(document.getElementById('setLateThreshold').value)
    };
    localStorage.setItem('companySettings', JSON.stringify(settings));
    showToast('Company settings saved', 'success');
}

function changePassword(e) {
    e.preventDefault();
    const curr = document.getElementById('currPass').value;
    const neu = document.getElementById('newPass').value;
    if (curr !== '1234') { showToast('Current password incorrect', 'error'); return; }
    if (!neu || neu.length < 4) { showToast('New password too short', 'error'); return; }
    showToast('Password changed successfully', 'success');
    document.getElementById('securityForm').reset();
}

// ==================== MODALS ====================

function showModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ==================== CSV EXPORT ====================

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('notifBtn').addEventListener('click', (e) => { e.stopPropagation(); toggleNotifications(); });
    document.addEventListener('click', (e) => { const d = document.getElementById('notifDropdown'); if (!d.contains(e.target) && e.target !== document.getElementById('notifBtn')) d.classList.remove('active'); });

    document.getElementById('staffSearch')?.addEventListener('input', renderStaff);
    document.getElementById('staffDeptFilter')?.addEventListener('change', renderStaff);
    document.getElementById('staffStatusFilter')?.addEventListener('change', renderStaff);

    document.getElementById('attendanceDate')?.addEventListener('change', renderAttendance);
    document.getElementById('leaveStatusFilter')?.addEventListener('change', renderLeave);
    document.getElementById('payrollMonth')?.addEventListener('change', renderPayroll);

    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', (e) => { if (e.target === m) closeModal(m.id); });
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });
}

// ==================== INIT ====================

function initApp() {
    setupNavigation();
    setupEventListeners();
    renderNotifications();
    navigate('dashboard');
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    restoreTheme();
});
