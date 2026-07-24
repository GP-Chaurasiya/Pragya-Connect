// =============================================
// Pragya Connect Admin — Common JS
// =============================================

// --- ROLE GUARD ---
function adminRoleGuard() {
    const role = sessionStorage.getItem('adminRole');
    if (!role) {
        window.location.href = '../index.html';
    }
}

// --- INIT on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Populate admin info in topbar
    const name  = sessionStorage.getItem('adminName') || 'Super Admin';
    const role  = sessionStorage.getItem('adminRole') || 'superadmin';
    document.querySelectorAll('.admin-user-name').forEach(el => el.textContent = name);
    document.querySelectorAll('.admin-user-role').forEach(el => el.textContent = role.replace(/_/g, ' '));
    document.querySelectorAll('.admin-avatar').forEach(el => {
        el.textContent = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    });

    // Create mobile backdrop if not present
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
        backdrop.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }

    // Sidebar toggle
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (window.innerWidth <= 960) {
                document.body.classList.toggle('sidebar-open');
            } else {
                document.body.classList.toggle('sidebar-collapsed');
            }
        });
    }

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 960) {
            const sidebar = document.querySelector('.admin-sidebar');
            if (sidebar && !sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                document.body.classList.remove('sidebar-open');
            }
        }
    });

    // User dropdown
    const userTrigger  = document.getElementById('adminUserTrigger');
    const userDropdown = document.getElementById('adminUserDropdown');
    if (userTrigger && userDropdown) {
        userTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => userDropdown.classList.remove('open'));
    }

    // Active nav item
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.admin-nav li').forEach(li => {
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            li.classList.add('active');
        }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('open');
        });
    });

    // Init tabs if present
    document.querySelectorAll('[data-tabs]').forEach(container => {
        initTabs(container);
    });
});

// --- LOGOUT ---
function adminLogout() {
    sessionStorage.removeItem('adminRole');
    sessionStorage.removeItem('adminName');
    window.location.href = '../index.html';
}

// --- TOAST ---
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i data-lucide="${icons[type] || 'info'}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = '0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- MODAL ---
function openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add('open'); if (typeof lucide !== 'undefined') lucide.createIcons(); }
}
function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
}

// --- CSV EXPORT ---
function exportTableToCSV(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId);
    if (!table) return;
    const rows = [...table.querySelectorAll('tr')];
    const csv = rows.map(row =>
        [...row.querySelectorAll('th, td')]
            .map(cell => `"${cell.innerText.replace(/"/g, '""').trim()}"`)
            .join(',')
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

// --- TABS ---
function initTabs(container) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;
    const btns   = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    btns.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            if (panels[i]) panels[i].classList.add('active');
        });
    });
    if (btns[0]) btns[0].click();
}

// --- IMAGE PREVIEW ---
function previewImage(inputEl, previewEl) {
    const file = inputEl.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        previewEl.src = e.target.result;
        previewEl.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// --- CONFIRM DELETE ---
function confirmDelete(message, callback) {
    if (confirm(message || 'Are you sure you want to delete this?')) {
        callback();
    }
}

// --- LOCAL STORAGE HELPERS ---
function lsGet(key, fallback = []) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function lsSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
