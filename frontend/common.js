// Common Sidebar
lucide.createIcons();

    // Sidebar Toggle
    const toggle = document.getElementById("sidebarToggle");
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-collapsed");
    });

    // User Dropdown
    const trigger = document.getElementById("userMenuTrigger");
    const dropdown = document.getElementById("userDropdown");

    trigger.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });

     // Load user role from localStorage and update top bar
        function loadUserRole() {
            const savedUserRole = localStorage.getItem("userRole");
            if (savedUserRole) {
                const topBarRole = document.querySelector('.user-role');
                const dropdownRole = document.querySelector('.dropdown-role');
                if (topBarRole) {
                    topBarRole.innerText = savedUserRole;
                }
                if (dropdownRole) {
                    dropdownRole.innerText = savedUserRole;
                }
            }
        }

         // Load avatar initials from localStorage
        function loadAvatarInitials() {
            const savedInitials = localStorage.getItem("userInitials");
            if (savedInitials) {
                const topBarAvatar = document.querySelector('.user-avatar-circle');
                const dropdownAvatar = document.querySelector('.dropdown-avatar');
                if (topBarAvatar) {
                    topBarAvatar.textContent = savedInitials;
                }
                if (dropdownAvatar) {
                    dropdownAvatar.textContent = savedInitials;
                }
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