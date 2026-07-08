// Common Sidebar and Header Functions
lucide.createIcons();

    // =========================
// Sidebar Toggle
// =========================

const sidebar = document.querySelector(".sidebar");
const toggle = document.getElementById("sidebarToggle");

// Open / Close Sidebar
toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    document.body.classList.toggle("sidebar-collapsed");
});

// Close when clicking outside
document.addEventListener("click", function (e) {

    if (
        !document.body.classList.contains("sidebar-collapsed") &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        document.body.classList.add("sidebar-collapsed");
    }

});

// Track whether the mouse is over the sidebar
let isSidebarHovered = false;

sidebar.addEventListener("mouseenter", () => {
    isSidebarHovered = true;
});

sidebar.addEventListener("mouseleave", () => {
    isSidebarHovered = false;
});

// Close sidebar on scroll ONLY if the mouse is NOT over the sidebar
window.addEventListener("scroll", () => {

    if (
        !document.body.classList.contains("sidebar-collapsed") &&
        !isSidebarHovered
    ) {
        document.body.classList.add("sidebar-collapsed");
    }

});

// Close sidebar on mouse wheel ONLY if the mouse is NOT over the sidebar
window.addEventListener("wheel", () => {

    if (
        !document.body.classList.contains("sidebar-collapsed") &&
        !isSidebarHovered
    ) {
        document.body.classList.add("sidebar-collapsed");
    }

});

// Close on touch devices
window.addEventListener("touchmove", function () {

    if (!document.body.classList.contains("sidebar-collapsed")) {
        document.body.classList.add("sidebar-collapsed");
    }

});

// Close when ESC key is pressed
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        document.body.classList.add("sidebar-collapsed");
    }

});

// User Dropdown Menu
const trigger = document.getElementById("userMenuTrigger");
const dropdown = document.getElementById("userDropdown");

if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
}

// Load user name from localStorage
function loadUserName() {
    const savedUserName = localStorage.getItem("userName") || "Gyan Prakash";
    const topBarName = document.querySelector('.user-name');
    const dropdownName = document.querySelector('.dropdown-name');
    if (topBarName) {
        topBarName.innerText = savedUserName;
    }
    if (dropdownName) {
        dropdownName.innerText = savedUserName;
    }
    
    // Update hero banner if exists
    const heroBannerName = document.getElementById('heroBannerName');
    if (heroBannerName) {
        heroBannerName.innerText = savedUserName.split(' ')[0] + '!';
    }
}

// Load user role from localStorage
function loadUserRole() {
    const savedUserRole = localStorage.getItem("userRole") || "Student";
    const topBarRole = document.querySelector('.user-role');
    const dropdownRole = document.querySelector('.dropdown-role');
    if (topBarRole) {
        topBarRole.innerText = savedUserRole;
    }
    if (dropdownRole) {
        dropdownRole.innerText = savedUserRole;
    }
}

// Load avatar initials from localStorage
function loadAvatarInitials() {
    const savedInitials = localStorage.getItem("userInitials") || "GP";
    const topBarAvatar = document.querySelector('.user-avatar-circle');
    const dropdownAvatar = document.querySelector('.dropdown-avatar');
    if (topBarAvatar) {
        topBarAvatar.textContent = savedInitials;
    }
    if (dropdownAvatar) {
        dropdownAvatar.textContent = savedInitials;
    }
}

// Load profile image to top bar avatars
function loadProfileImageToTopBar() {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        const topBarAvatar = document.querySelector('.user-avatar-circle');
        const dropdownAvatar = document.querySelector('.dropdown-avatar');
        
        if (topBarAvatar) {
            topBarAvatar.style.backgroundImage = `url(${savedImage})`;
            topBarAvatar.style.backgroundSize = 'cover';
            topBarAvatar.style.backgroundPosition = 'center';
            topBarAvatar.style.backgroundRepeat = 'no-repeat';
            topBarAvatar.textContent = '';
        }
        
        if (dropdownAvatar) {
            dropdownAvatar.style.backgroundImage = `url(${savedImage})`;
            dropdownAvatar.style.backgroundSize = 'cover';
            dropdownAvatar.style.backgroundPosition = 'center';
            dropdownAvatar.style.backgroundRepeat = 'no-repeat';
            dropdownAvatar.textContent = '';
        }
    }
}

// Call load functions on page load
loadUserName();
loadUserRole();
loadAvatarInitials();
loadProfileImageToTopBar();