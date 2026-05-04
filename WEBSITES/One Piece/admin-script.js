// One Piece Admin Dashboard Script
// Handles login, CRUD operations, charts, and statistics

let charts = {};
let currentEditId = null;

// ============================================
// AUTHENTICATION
// ============================================

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'luffy') {
        localStorage.setItem('onePieceAdmin', 'true');
        showDashboard();
    } else {
        showNotification('Invalid credentials! Try admin/luffy', 'error');
    }
});

function showDashboard() {
    document.getElementById('loginGate').classList.add('hidden');
    document.getElementById('adminWrapper').style.display = 'flex';
    initAdmin();
}

function logout() {
    localStorage.removeItem('onePieceAdmin');
    location.reload();
}

// Check if already logged in
if (localStorage.getItem('onePieceAdmin') === 'true') {
    showDashboard();
}

// ============================================
// INITIALIZATION
// ============================================

function initAdmin() {
    initNavigation();
    initStats();
    loadCharactersTable();
    initCharts();
    initModals();
    initSearch();
    updateStorageInfo();
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(item.dataset.page).classList.add('active');

            if (item.dataset.page === 'analytics') {
                setTimeout(updateCharts, 100);
            }
        });
    });

    document.getElementById('toggleSidebar').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

// ============================================
// STATS & DASHBOARD
// ============================================

function initStats() {
    const chars = getCharacters();

    const pirates = chars.filter(c => 
        c.group.includes('pirates') || 
        ['four-emperors', 'straw-hat', 'big-mom', 'beast', 'red-hair', 'blackbeard', 
         'kid', 'heart', 'roger', 'whitebeard', 'seven-warlords', 'super-novas', 'other-pirates'].includes(c.group)
    );

    const marines = chars.filter(c => 
        ['fleet-admiral', 'admirals', 'former-admirals', 'vice-admirals', 'captains', 'marine-others'].includes(c.group)
    );

    const others = chars.filter(c => 
        ['five-elders', 'revolutionaries', 'gods', 'ancient', 'holy-knights', 
         'world-government', 'cipher-pol', 'royalty', 'bounty-hunters', 'others'].includes(c.group)
    );

    const devilFruitUsers = chars.filter(c => c.devilFruit && c.devilFruit !== 'None' && c.devilFruit !== 'N/A');

    const bountyChars = chars.filter(c => {
        if (!c.bounty || c.bounty === 'N/A' || c.bounty === 'Unknown') return false;
        const num = parseInt(c.bounty.replace(/,/g, '').replace(/[^\d]/g, ''));
        return !isNaN(num) && num > 0;
    });

    const totalBounty = bountyChars.reduce((sum, c) => {
        return sum + parseInt(c.bounty.replace(/,/g, '').replace(/[^\d]/g, ''));
    }, 0);

    const avgBounty = bountyChars.length > 0 ? Math.round(totalBounty / bountyChars.length) : 0;

    animateValue('totalCharacters', 0, chars.length, 1500);
    animateValue('totalPirates', 0, pirates.length, 1500);
    animateValue('totalMarines', 0, marines.length, 1500);
    animateValue('totalOthers', 0, others.length, 1500);
    animateValue('devilFruitCount', 0, devilFruitUsers.length, 1500);

    document.getElementById('avgBounty').textContent = formatBounty(avgBounty);

    // Crew count
    const crews = new Set(chars.map(c => c.crew).filter(Boolean));
    document.getElementById('crewCount').textContent = crews.size;

    // Emperor count
    document.getElementById('emperorCount').textContent = chars.filter(c => c.group === 'four-emperors').length;

    // Admiral count
    document.getElementById('admiralCount').textContent = chars.filter(c => c.group === 'admirals').length;

    // Top bounties
    const topBounties = [...bountyChars]
        .sort((a, b) => {
            const aNum = parseInt(a.bounty.replace(/,/g, '').replace(/[^\d]/g, '')) || 0;
            const bNum = parseInt(b.bounty.replace(/,/g, '').replace(/[^\d]/g, '')) || 0;
            return bNum - aNum;
        })
        .slice(0, 5);

    const topBountiesList = document.getElementById('topBountiesList');
    if (topBountiesList) {
        topBountiesList.innerHTML = topBounties.map((char, i) => `
            <div class="bounty-item">
                <div class="bounty-rank">${i + 1}</div>
                <div class="bounty-info">
                    <strong>${char.name}</strong>
                    <span>${char.crew}</span>
                </div>
                <div class="bounty-amount">${char.bounty}</div>
        `).join('');
    }
}

function animateValue(id, start, end, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function formatBounty(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ============================================
// CHARACTER TABLE
// ============================================

function loadCharactersTable() {
    const chars = getCharacters();
    const tbody = document.querySelector('#charactersTable tbody');
    if (!tbody) return;

    tbody.innerHTML = chars.map(char => `
        <tr>
            <td>${char.id}</td>
            <td><strong>${char.name}</strong></td>
            <td>${char.pirateName || '-'}</td>
            <td>${char.crew || '-'}</td>
            <td><span class="group-badge">${formatGroupName(char.group)}</span></td>
            <td>${char.rank || '-'}</td>
            <td>${char.bounty || 'N/A'}</td>
            <td>${char.devilFruit || 'None'}</td>
            <td>
                <button class="action-btn" onclick="editCharacter(${char.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteCharacter(${char.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function formatGroupName(group) {
    const names = {
        'four-emperors': 'Four Emperors',
        'straw-hat': 'Straw Hat',
        'big-mom': 'Big Mom',
        'beast': 'Beast Pirates',
        'red-hair': 'Red-Haired',
        'blackbeard': 'Blackbeard',
        'kid': 'Kid Pirates',
        'heart': 'Heart Pirates',
        'roger': 'Roger Pirates',
        'whitebeard': 'Whitebeard',
        'seven-warlords': 'Warlords',
        'super-novas': 'Super Novas',
        'other-pirates': 'Other Pirates',
        'fleet-admiral': 'Fleet Admiral',
        'admirals': 'Admirals',
        'former-admirals': 'Former Admirals',
        'vice-admirals': 'Vice Admirals',
        'captains': 'Captains',
        'marine-others': 'Other Marines',
        'five-elders': 'Five Elders',
        'revolutionaries': 'Revolutionaries',
        'gods': 'Gods & Mythical',
        'ancient': 'Ancient Kingdom',
        'holy-knights': 'Holy Knights',
        'world-government': 'World Gov',
        'cipher-pol': 'Cipher Pol',
        'royalty': 'Royalty',
        'bounty-hunters': 'Bounty Hunters',
        'others': 'Others'
    };
    return names[group] || group;
}

// ============================================
// CRUD OPERATIONS
// ============================================

function initModals() {
    // Add character button
    document.getElementById('addCharacterBtn').addEventListener('click', () => {
        currentEditId = null;
        document.getElementById('characterModalTitle').textContent = 'Add Character';
        document.getElementById('characterForm').reset();
        document.getElementById('characterModal').classList.add('active');
    });

    // Cancel button
    document.getElementById('cancelCharacter').addEventListener('click', () => {
        document.getElementById('characterModal').classList.remove('active');
    });

    // Close button
    document.getElementById('modalClose').addEventListener('click', () => {
        document.getElementById('characterModal').classList.remove('active');
    });

    // Form submit
    document.getElementById('characterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveCharacter();
    });

    // Click outside to close
    document.getElementById('modalOverlay').addEventListener('click', () => {
        document.getElementById('characterModal').classList.remove('active');
    });
}

function saveCharacter() {
    const chars = getCharacters();

    const charData = {
        name: document.getElementById('charName').value.trim(),
        pirateName: document.getElementById('charPirateName').value.trim(),
        role: document.getElementById('charRole').value.trim(),
        crew: document.getElementById('charCrew').value.trim(),
        group: document.getElementById('charGroup').value,
        subgroup: document.getElementById('charGroup').value,
        rank: document.getElementById('charRank').value.trim(),
        bounty: document.getElementById('charBounty').value.trim() || 'N/A',
        devilFruit: document.getElementById('charDevilFruit').value.trim() || 'None',
        ability: document.getElementById('charAbility').value.trim(),
        firstAppearance: document.getElementById('charFirstAppearance').value.trim(),
        description: document.getElementById('charDescription').value.trim()
    };

    if (currentEditId) {
        // Edit existing
        const index = chars.findIndex(c => c.id === currentEditId);
        if (index !== -1) {
            chars[index] = { ...chars[index], ...charData };
            showNotification('Character updated successfully!', 'success');
        }
    } else {
        // Add new
        const newId = Math.max(...chars.map(c => c.id), 0) + 1;
        chars.push({ id: newId, ...charData });
        showNotification('Character added successfully!', 'success');
    }

    localStorage.setItem('onePieceCharacters', JSON.stringify(chars));
    document.getElementById('characterModal').classList.remove('active');
    loadCharactersTable();
    initStats();
}

function editCharacter(id) {
    const chars = getCharacters();
    const char = chars.find(c => c.id === id);
    if (!char) return;

    currentEditId = id;
    document.getElementById('characterModalTitle').textContent = 'Edit Character';
    document.getElementById('charName').value = char.name || '';
    document.getElementById('charPirateName').value = char.pirateName || '';
    document.getElementById('charRole').value = char.role || '';
    document.getElementById('charCrew').value = char.crew || '';
    document.getElementById('charGroup').value = char.group || '';
    document.getElementById('charRank').value = char.rank || '';
    document.getElementById('charBounty').value = char.bounty || '';
    document.getElementById('charDevilFruit').value = char.devilFruit || '';
    document.getElementById('charAbility').value = char.ability || '';
    document.getElementById('charFirstAppearance').value = char.firstAppearance || '';
    document.getElementById('charDescription').value = char.description || '';

    document.getElementById('characterModal').classList.add('active');
}

function deleteCharacter(id) {
    if (!confirm('Are you sure you want to delete this character?')) return;

    let chars = getCharacters();
    chars = chars.filter(c => c.id !== id);
    localStorage.setItem('onePieceCharacters', JSON.stringify(chars));

    showNotification('Character deleted!', 'success');
    loadCharactersTable();
    initStats();
}

// ============================================
// SEARCH
// ============================================

function initSearch() {
    const searchInput = document.getElementById('characterSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#charactersTable tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

// ============================================
// CHARTS
// ============================================

function initCharts() {
    const groupCtx = document.getElementById('groupChart');
    const bountyCtx = document.getElementById('bountyChart');
    const fruitCtx = document.getElementById('fruitChart');

    if (groupCtx) {
        charts.group = new Chart(groupCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#d4af37', '#c41e3a', '#1e3a5f', '#6b46c1', 
                        '#10b981', '#f59e0b', '#ec4899', '#6366f1'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: '#f5f5f5' } }
                }
            }
        });
    }

    if (bountyCtx) {
        charts.bounty = new Chart(bountyCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Bounty (Berries)',
                    data: [],
                    backgroundColor: '#d4af37'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f5f5f5' } }
                },
                scales: {
                    y: { 
                        ticks: { color: '#a0a0a0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    x: { 
                        ticks: { color: '#a0a0a0' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    if (fruitCtx) {
        charts.fruit = new Chart(fruitCtx, {
            type: 'pie',
            data: {
                labels: ['Devil Fruit Users', 'Non-Users'],
                datasets: [{
                    data: [],
                    backgroundColor: ['#10b981', '#4a5568']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f5f5f5' } }
                }
            }
        });
    }

    updateCharts();
}

function updateCharts() {
    const chars = getCharacters();

    // Group chart
    if (charts.group) {
        const groupCounts = {};
        chars.forEach(c => {
            const name = formatGroupName(c.group);
            groupCounts[name] = (groupCounts[name] || 0) + 1;
        });
        charts.group.data.labels = Object.keys(groupCounts);
        charts.group.data.datasets[0].data = Object.values(groupCounts);
        charts.group.update();
    }

    // Bounty chart
    if (charts.bounty) {
        const bountyChars = chars.filter(c => {
            if (!c.bounty || c.bounty === 'N/A' || c.bounty === 'Unknown') return false;
            const num = parseInt(c.bounty.replace(/,/g, '').replace(/[^\d]/g, ''));
            return !isNaN(num) && num > 0;
        }).sort((a, b) => {
            const aNum = parseInt(a.bounty.replace(/,/g, '').replace(/[^\d]/g, '')) || 0;
            const bNum = parseInt(b.bounty.replace(/,/g, '').replace(/[^\d]/g, '')) || 0;
            return bNum - aNum;
        }).slice(0, 10);

        charts.bounty.data.labels = bountyChars.map(c => c.name);
        charts.bounty.data.datasets[0].data = bountyChars.map(c => {
            return parseInt(c.bounty.replace(/,/g, '').replace(/[^\d]/g, '')) || 0;
        });
        charts.bounty.update();
    }

    // Devil Fruit chart
    if (charts.fruit) {
        const fruitUsers = chars.filter(c => c.devilFruit && c.devilFruit !== 'None' && c.devilFruit !== 'N/A').length;
        const nonUsers = chars.length - fruitUsers;
        charts.fruit.data.datasets[0].data = [fruitUsers, nonUsers];
        charts.fruit.update();
    }
}

// ============================================
// DATA UTILITIES
// ============================================

function exportCharacters() {
    const chars = getCharacters();
    const headers = ['ID', 'Name', 'Epithet', 'Crew', 'Group', 'Rank', 'Bounty', 'Devil Fruit', 'Ability', 'First Appearance'];
    const csv = [
        headers.join(','),
        ...chars.map(c => [
            c.id,
            `"${c.name}"`,
            `"${c.pirateName || ''}"`,
            `"${c.crew || ''}"`,
            `"${c.group || ''}"`,
            `"${c.rank || ''}"`,
            `"${c.bounty || ''}"`,
            `"${c.devilFruit || ''}"`,
            `"${c.ability || ''}"`,
            `"${c.firstAppearance || ''}"`
        ].join(','))
    ].join('\n');

    downloadCSV(csv, 'one-piece-characters.csv');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function resetData() {
    if (!confirm('This will reset ALL characters to the default dataset. Are you sure?')) return;

    localStorage.removeItem('onePieceCharacters');
    showNotification('Data reset to default!', 'success');
    loadCharactersTable();
    initStats();
    updateCharts();
    updateStorageInfo();
}

function updateStorageInfo() {
    const storageInfo = document.getElementById('storageInfo');
    if (!storageInfo) return;

    const data = localStorage.getItem('onePieceCharacters');
    let size = 0;

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            size += localStorage[key].length * 2;
        }
    }

    storageInfo.innerHTML = `
        <div style="font-size: 24px; font-weight: 700; color: var(--primary-gold); margin-bottom: 5px;">
            ${(size / 1024).toFixed(2)} KB
        </div>
        <div style="font-size: 14px; color: var(--text-muted);">
            Total localStorage used
        </div>
    `;
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        background: var(--card-bg);
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// DATA ACCESS (shared with main site)
// ============================================

function getCharacters() {
    const stored = localStorage.getItem('onePieceCharacters');
    if (stored) {
        return JSON.parse(stored);
    }
    // If no localStorage, we need to load from the main script's default data
    // Since we can't access it directly, return empty array
    return [];
}
