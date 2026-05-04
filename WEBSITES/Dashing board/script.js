// ---------- DOM REFERENCES ----------
const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");
const sidebar = document.getElementById("sidebar");
const searchInput = document.getElementById("searchInput");
const userSkeleton = document.getElementById("userSkeleton");
const userTableContainer = document.getElementById("userTableContainer");
const usersCount = document.getElementById("usersCount");
const darkToggle = document.getElementById("darkToggle");

// ---------- STATE ----------
let users = [
  { id: 1, name: "John", email: "john@mail.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane", email: "jane@mail.com", role: "User", status: "Inactive" },
  { id: 3, name: "Mark", email: "mark@mail.com", role: "Editor", status: "Active" },
];

let activities = [];
let notificationCount = 0;
let currentEditId = null;

// Chart instances
let dashboardChart = null;
let doughnutChart = null;
let analyticsChart = null;
let liveSessionInterval = null;

// ---------- AUTH ----------
function login() {
  const u = usernameInput.value;
  const p = passwordInput.value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("auth", "true");
    showApp();
    addActivity("🔐", "Logged in", "Authentication successful");
    showToast("Welcome back, admin!", "success");
  } else {
    loginError.textContent = "Invalid username or password";
    showToast("Login failed", "error");
  }
}

function logout() {
  addActivity("🚪", "Logged out", "Session ended");
  localStorage.removeItem("auth");
  location.reload();
}

function seedActivities() {
  const now = new Date();
  const seed = [
    { icon: "🔐", title: "System initialized", description: "Dashboard loaded successfully", time: new Date(now - 1000 * 60 * 2) },
    { icon: "📊", title: "Analytics synced", description: "Weekly data refreshed from server", time: new Date(now - 1000 * 60 * 15) },
    { icon: "👤", title: "User login detected", description: "New session started from Chrome", time: new Date(now - 1000 * 60 * 30) },
    { icon: "📥", title: "Report exported", description: "Monthly revenue report downloaded", time: new Date(now - 1000 * 60 * 60) },
    { icon: "⚙️", title: "Settings updated", description: "Dark mode preference changed", time: new Date(now - 1000 * 60 * 60 * 2) },
    { icon: "✅", title: "Database backup", description: "Automatic backup completed", time: new Date(now - 1000 * 60 * 60 * 5) },
  ];
  activities.push(...seed);
}

function showApp() {
  loginPage.style.display = "none";
  appPage.classList.remove("hidden");
  startClock();
  renderUsers(users);
  initCharts();
  startLiveSessions();
  seedActivities();
  renderActivityLog();
  updateRatios();
  drawProgressRings();

  // Simulate skeleton loader
  setTimeout(() => {
    userSkeleton.classList.add("hidden");
    userTableContainer.classList.remove("hidden");
  }, 800);
}

// Check login on page load
if (localStorage.getItem("auth") === "true") {
  showApp();
}

// ---------- ROUTING ----------
function navigate(page) {
  document.querySelectorAll(".route").forEach(r => r.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");

  if (page === "analytics") {
    setTimeout(() => {
      if (analyticsChart) analyticsChart.resize();
    }, 100);
  }
  if (page === "dashboard") {
    setTimeout(() => {
      if (dashboardChart) dashboardChart.resize();
      if (doughnutChart) doughnutChart.resize();
    }, 100);
  }
}

// ---------- UI ----------
function toggleSidebar() {
  sidebar.classList.toggle("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  if (darkToggle) darkToggle.checked = isDark;
  updateChartThemes();
}

// Restore dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  if (darkToggle) {
    darkToggle.checked = true;
  }
}

// ---------- CLOCK ----------
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = `${dateStr} ${timeStr}`;
}

// ---------- NOTIFICATIONS ----------
function toggleNotifications() {
  const dropdown = document.getElementById("notifDropdown");
  dropdown.classList.toggle("hidden");
}

function addNotification(message) {
  notificationCount++;
  const badge = document.getElementById("notifBadge");
  if (badge) badge.textContent = notificationCount;

  const dropdown = document.getElementById("notifDropdown");
  if (dropdown.querySelector(".empty-state")) {
    dropdown.innerHTML = "";
  }

  const item = document.createElement("div");
  item.className = "activity-item";
  item.innerHTML = `
    <div class="activity-content">
      <div class="activity-title">${message}</div>
      <div class="activity-time">${new Date().toLocaleTimeString()}</div>
    </div>
  `;
  dropdown.insertBefore(item, dropdown.firstChild);
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const bell = document.querySelector(".notification-bell");
  const dropdown = document.getElementById("notifDropdown");
  if (bell && dropdown && !bell.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

// ---------- TOASTS ----------
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
  };

  toast.innerHTML = `<span>${icons[type] || "ℹ️"}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ---------- USERS CRUD ----------
function renderUsers(data) {
  const tbody = document.getElementById("userTable");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--secondary)">No users found</td></tr>`;
    usersCount.textContent = "0";
    updateRatios();
    return;
  }

  data.forEach(u => {
    const statusClass = u.status.toLowerCase();
    const roleClass = u.role.toLowerCase() === "editor" ? "editor" : statusClass;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td><span class="badge-status ${roleClass}">${u.role}</span></td>
      <td><span class="badge-status ${statusClass}">${u.status}</span></td>
      <td>
        <button class="btn-edit" onclick="editUser(${u.id})">Edit</button>
        <button class="btn-danger" onclick="deleteUser(${u.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  usersCount.textContent = data.length;
  updateRatios();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Search
searchInput.addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(val) ||
    u.email.toLowerCase().includes(val)
  );
  renderUsers(filtered);
});

// ---------- MODAL ----------
function openModal(userId = null) {
  const modal = document.getElementById("userModal");
  const title = document.getElementById("modalTitle");
  const form = document.getElementById("userForm");
  form.reset();
  currentEditId = null;

  if (userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    title.textContent = "Edit User";
    document.getElementById("userId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userRole").value = user.role;
    document.getElementById("userStatus").value = user.status;
    currentEditId = userId;
  } else {
    title.textContent = "Add User";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("userModal").classList.add("hidden");
  currentEditId = null;
}

function saveUser() {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const role = document.getElementById("userRole").value;
  const status = document.getElementById("userStatus").value;

  // Validation
  if (!name || !email) {
    showToast("Name and email are required", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  if (currentEditId) {
    // Update existing
    const user = users.find(u => u.id === currentEditId);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      user.status = status;
      addActivity("✏️", "User updated", `${name} was modified`);
      showToast("User updated successfully", "success");
      addNotification(`User "${name}" was updated`);
    }
  } else {
    // Create new
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name, email, role, status };
    users.push(newUser);
    addActivity("➕", "User added", `${name} was created`);
    showToast("User created successfully", "success");
    addNotification(`New user "${name}" was added`);
  }

  renderUsers(users);
  closeModal();
}

function editUser(id) {
  openModal(id);
}

function deleteUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users = users.filter(u => u.id !== id);
    renderUsers(users);
    addActivity("🗑️", "User deleted", `${user.name} was removed`);
    showToast("User deleted", "warning");
    addNotification(`User "${user.name}" was deleted`);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Close modal on outside click
window.addEventListener("click", (e) => {
  const modal = document.getElementById("userModal");
  if (e.target === modal) closeModal();
});

// ---------- ACTIVITY LOG ----------
function addActivity(icon, title, description) {
  const activity = {
    icon,
    title,
    description,
    time: new Date()
  };
  activities.unshift(activity);
  renderActivityLog();
}

function renderActivityLog() {
  const container = document.getElementById("activityList");
  if (activities.length === 0) {
    container.innerHTML = `<p class="empty-state">No activities yet.</p>`;
    return;
  }

  container.innerHTML = "";
  activities.forEach(act => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
      <div class="activity-icon">${act.icon}</div>
      <div class="activity-content">
        <div class="activity-title">${act.title}</div>
        <div style="font-size:13px;color:var(--text);opacity:0.8">${act.description}</div>
        <div class="activity-time">${formatTime(act.time)}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

// ---------- EXPORT CSV ----------
function exportCSV() {
  if (users.length === 0) {
    showToast("No users to export", "warning");
    return;
  }

  const headers = ["ID", "Name", "Email", "Role", "Status"];
  const rows = users.map(u => [u.id, `"${u.name}"`, `"${u.email}"`, u.role, u.status]);
  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  addActivity("📥", "CSV exported", `Exported ${users.length} users`);
  showToast("CSV exported successfully", "success");
}

// ---------- PROGRESS RINGS ----------
function drawProgressRings() {
  const rings = document.querySelectorAll('.progress-ring');
  rings.forEach(ring => {
    const target = parseInt(ring.getAttribute('data-percent'), 10);
    const fill = ring.querySelector('.progress-ring-fill');
    const text = ring.querySelector('.progress-text');
    if (!fill || isNaN(target)) return;

    // Animate from 0 to target
    let current = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    fill.setAttribute('stroke-dasharray', `0, 100`);
    if (text) text.textContent = '0%';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const val = Math.round(current);
      fill.setAttribute('stroke-dasharray', `${val}, 100`);
      if (text) text.textContent = `${val}%`;
    }, stepTime);
  });
}

// ---------- CARD ZOOM ----------
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  if (e.target.closest('button')) return;
  if (card.classList.contains('zoomed')) return;
  zoomCard(card);
});

function zoomCard(card) {
  const overlay = document.getElementById('cardOverlay');
  card.classList.add('zoomed');
  overlay.classList.remove('hidden');
}

function closeZoomedCard() {
  document.querySelectorAll('.card.zoomed').forEach(c => c.classList.remove('zoomed'));
  document.getElementById('cardOverlay').classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeZoomedCard();
});

// ---------- RATIOS & LIVE COUNTERS ----------
function updateRatios() {
  const activeUsers = users.filter(u => u.status === "Active").length;
  const totalUsers = users.length;
  const revenue = 12300;
  const revenueTarget = 20000;
  const orders = 320;
  const ordersGoal = 400;
  const tasksDone = 87;
  const tasksTotal = 120;

  const activeRatioEl = document.getElementById("activeRatio");
  const revenueRatioEl = document.getElementById("revenueRatio");
  const ordersRatioEl = document.getElementById("ordersRatio");
  const tasksRatioEl = document.getElementById("tasksRatio");

  if (activeRatioEl) activeRatioEl.textContent = `${activeUsers} / ${totalUsers}`;
  if (revenueRatioEl) revenueRatioEl.textContent = `$${(revenue / 1000).toFixed(1)}k / $${(revenueTarget / 1000).toFixed(0)}k`;
  if (ordersRatioEl) ordersRatioEl.textContent = `${orders} / ${ordersGoal}`;
  if (tasksRatioEl) tasksRatioEl.textContent = `${tasksDone} / ${tasksTotal}`;
}

function startLiveSessions() {
  const el = document.getElementById("activeSessions");
  if (!el) return;

  let sessions = 142;
  el.textContent = sessions;

  liveSessionInterval = setInterval(() => {
    const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
    sessions = Math.max(80, Math.min(300, sessions + change));
    el.textContent = sessions;
  }, 3000);
}

// ---------- CHARTS (Chart.js) ----------
function getChartColors() {
  const isDark = document.body.classList.contains("dark");
  return {
    text: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    tooltipBg: isDark ? "rgba(44,44,62,0.95)" : "rgba(255,255,255,0.95)",
    tooltipText: isDark ? "#fff" : "#222"
  };
}

function initCharts() {
  initDashboardChart();
  initDoughnutChart();
  initAnalyticsChart();
}

function initDashboardChart() {
  const ctx = document.getElementById("chart");
  if (!ctx) return;

  const colors = getChartColors();

  if (dashboardChart) dashboardChart.destroy();

  dashboardChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Revenue ($)",
        data: [4200, 5800, 3900, 6100, 5400, 7200, 4800],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(99, 102, 241, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(99, 102, 241, 0.7)"
        ],
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.grid,
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: colors.text }
        },
        y: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.text,
            callback: function(value) {
              return "$" + value.toLocaleString();
            }
          },
          beginAtZero: true
        }
      }
    }
  });
}

function initDoughnutChart() {
  const ctx = document.getElementById("doughnutChart");
  if (!ctx) return;

  const colors = getChartColors();

  if (doughnutChart) doughnutChart.destroy();

  doughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Electronics", "Clothing", "Home", "Sports", "Books"],
      datasets: [{
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          "#4f46e5",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6"
        ],
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: colors.text,
            padding: 16,
            usePointStyle: true,
            pointStyle: "circle"
          }
        },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.grid,
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.parsed}%`;
            }
          }
        }
      }
    }
  });
}

function initAnalyticsChart() {
  const ctx = document.getElementById("analyticsChart");
  if (!ctx) return;

  const colors = getChartColors();

  if (analyticsChart) analyticsChart.destroy();

  analyticsChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [{
        label: "Traffic (visitors)",
        data: [12000, 19000, 15000, 22000, 18000, 25000, 21000, 28000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4
      }, {
        label: "Page Views",
        data: [28000, 35000, 32000, 41000, 38000, 48000, 43000, 52000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        borderWidth: 3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            color: colors.text,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.grid,
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: colors.text }
        },
        y: {
          grid: { color: colors.grid },
          ticks: {
            color: colors.text,
            callback: function(value) {
              return (value / 1000).toFixed(0) + "k";
            }
          },
          beginAtZero: true
        }
      }
    }
  });
}

function updateChartThemes() {
  const colors = getChartColors();

  if (dashboardChart) {
    dashboardChart.options.scales.x.ticks.color = colors.text;
    dashboardChart.options.scales.y.ticks.color = colors.text;
    dashboardChart.options.scales.y.grid.color = colors.grid;
    dashboardChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
    dashboardChart.options.plugins.tooltip.titleColor = colors.tooltipText;
    dashboardChart.options.plugins.tooltip.bodyColor = colors.tooltipText;
    dashboardChart.update();
  }

  if (doughnutChart) {
    doughnutChart.options.plugins.legend.labels.color = colors.text;
    doughnutChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
    doughnutChart.options.plugins.tooltip.titleColor = colors.tooltipText;
    doughnutChart.options.plugins.tooltip.bodyColor = colors.tooltipText;
    doughnutChart.update();
  }

  if (analyticsChart) {
    analyticsChart.options.scales.x.ticks.color = colors.text;
    analyticsChart.options.scales.y.ticks.color = colors.text;
    analyticsChart.options.scales.y.grid.color = colors.grid;
    analyticsChart.options.plugins.legend.labels.color = colors.text;
    analyticsChart.options.plugins.tooltip.backgroundColor = colors.tooltipBg;
    analyticsChart.options.plugins.tooltip.titleColor = colors.tooltipText;
    analyticsChart.options.plugins.tooltip.bodyColor = colors.tooltipText;
    analyticsChart.update();
  }
}

// Re-draw charts on window resize
window.addEventListener("resize", () => {
  if (dashboardChart) dashboardChart.resize();
  if (doughnutChart) doughnutChart.resize();
  if (analyticsChart) analyticsChart.resize();
});

