// Pragya Connect Global Service Layer
const AppService = {
    // Config
    API_BASE: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api",
    isOnline: true,

    // Session Management
    initSession() {
        if (!localStorage.getItem("loggedIn")) {
            const path = window.location.pathname;
            if (!path.endsWith("login.html") && !path.endsWith("index.html") && path !== "/") {
                window.location.href = path.includes("/events/") ? "../login.html" : "login.html";
            }
        }
        
        // Ensure default profile exists
        if (!localStorage.getItem("profile")) {
            localStorage.setItem("profile", JSON.stringify({
                name: "Gyan Prakash",
                role: "Student � Pragya Yog School",
                email: "gyan@gmail.com",
                phone: "+91 9876543210",
                location: "Haridwar",
                bio: "Passionate about Yoga and Community Development.",
                skills: ["HTML", "CSS", "JavaScript", "Leadership"],
                interests: ["Yoga", "Meditation", "Reading", "Nature"],
                achievements: ["Camp Volunteer", "Meditation Badge", "Completed 5-Day Challenge"],
                activities: ["Completed Yoga Workshop", "Joined Meditation Group", "Uploaded Workshop Photos"]
            }));
            localStorage.setItem("userName", "Gyan Prakash");
            localStorage.setItem("userRole", "Student");
            localStorage.setItem("userInitials", "GP");
        }
    },

    // Check API connectivity
    async checkConnectivity() {
        try {
            const res = await fetch(`${this.API_BASE}/auth/login`, { method: "OPTIONS" }).catch(() => false);
            this.isOnline = res !== false;
        } catch {
            this.isOnline = false;
        }
        return this.isOnline;
    },

    // Unified fetch with offline fallback
    async apiCall(endpoint, options = {}) {
        if (this.isOnline) {
            try {
                const response = await fetch(`${this.API_BASE}${endpoint}`, {
                    headers: { "Content-Type": "application/json", ...options.headers },
                    ...options
                });
                if (response.ok) return await response.json();
            } catch (err) {
                console.warn("API Call failed, falling back to offline mode:", err);
                this.isOnline = false;
            }
        }
        return null;
    },

    // --- POSTS SERVICE ---
    async getPosts() {
        const apiPosts = await this.apiCall("/posts");
        if (apiPosts) {
            localStorage.setItem("cached_posts", JSON.stringify(apiPosts));
            return apiPosts;
        }
        const localPosts = localStorage.getItem("local_posts");
        return localPosts ? JSON.parse(localPosts) : [];
    },

    async createPost(content, image = null) {
        const user = JSON.parse(localStorage.getItem("profile"));
        const postData = {
            user_id: "60d0fe4f5311236168a109ca",
            userName: user.name,
            userRole: user.role,
            content,
            image
        };

        if (this.isOnline) {
            const res = await this.apiCall("/posts/create", {
                method: "POST",
                body: JSON.stringify(postData)
            });
            if (res) return res;
        }

        let localPosts = JSON.parse(localStorage.getItem("local_posts")) || [];
        const newPost = {
            _id: "post_" + Date.now(),
            user_id: { name: user.name, role: user.role },
            content,
            image,
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString()
        };
        localPosts.unshift(newPost);
        localStorage.setItem("local_posts", JSON.stringify(localPosts));
        return newPost;
        window.dispatchEvent(new Event("postsUpdated"));
    },

    async likePost(postId) {
        if (this.isOnline && !postId.startsWith("post_")) {
            const res = await this.apiCall(`/posts/like/${postId}`, { method: "PUT" });
            if (res) return res;
        }

        let localPosts = JSON.parse(localStorage.getItem("local_posts")) || [];
        localPosts = localPosts.map(p => {
            if (p._id === postId) {
                return { ...p, likes: (p.likes || 0) + 1 };
            }
            return p;
        });
        localStorage.setItem("local_posts", JSON.stringify(localPosts));
        return { likes: (localPosts.find(p => p._id === postId)?.likes || 0) };
        window.dispatchEvent(new Event("postsUpdated"));
    },

    async addComment(postId, commentText) {
        const user = JSON.parse(localStorage.getItem("profile"));
        const commentData = {
            post_id: postId,
            user_id: "60d0fe4f5311236168a109ca",
            comment_text: commentText
        };

        if (this.isOnline && !postId.startsWith("post_")) {
            const res = await this.apiCall("/posts/comment", {
                method: "POST",
                body: JSON.stringify(commentData)
            });
            if (res) return res;
        }

        let localPosts = JSON.parse(localStorage.getItem("local_posts")) || [];
        const newComment = {
            _id: "cmt_" + Date.now(),
            user_id: { name: user.name, role: user.role },
            comment_text: commentText,
            createdAt: new Date().toISOString()
        };
        localPosts = localPosts.map(p => {
            if (p._id === postId) {
                return { ...p, comments: [...(p.comments || []), newComment] };
            }
            return p;
        });
        localStorage.setItem("local_posts", JSON.stringify(localPosts));
        return newComment;
        window.dispatchEvent(new Event("postsUpdated"));
    },

    // --- MESSAGES SERVICE ---
    async getMessages(partner) {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        if (this.isOnline) {
            const res = await this.apiCall(`/messages/history?user1=${encodeURIComponent(currentUser)}&user2=${encodeURIComponent(partner)}`);
            if (res) return res;
        }

        const localMsgs = JSON.parse(localStorage.getItem("local_messages") || "[]");
        return localMsgs.filter(m => 
            (m.sender === currentUser && m.recipient === partner) ||
            (m.sender === partner && m.recipient === currentUser)
        );
    },

    async sendMessage(partner, text, attachments = []) {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        const messageData = {
            sender: currentUser,
            recipient: partner,
            text,
            attachments
        };

        if (this.isOnline) {
            const res = await this.apiCall("/messages/send", {
                method: "POST",
                body: JSON.stringify(messageData)
            });
            if (res) return res;
        }

        const localMsgs = JSON.parse(localStorage.getItem("local_messages") || "[]");
        const newMsg = {
            _id: "msg_" + Date.now(),
            ...messageData,
            createdAt: new Date().toISOString(),
            is_read: false
        };
        localMsgs.push(newMsg);
        localStorage.setItem("local_messages", JSON.stringify(localMsgs));
        return newMsg;
    },

    async getConversations() {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        if (this.isOnline) {
            const res = await this.apiCall(`/messages/conversations?user=${encodeURIComponent(currentUser)}`);
            if (res) return res;
        }

        const localMsgs = JSON.parse(localStorage.getItem("local_messages") || "[]");
        const conversationsMap = {};
        localMsgs.forEach(msg => {
            const partner = msg.sender === currentUser ? msg.recipient : msg.sender;
            if (!conversationsMap[partner]) {
                conversationsMap[partner] = {
                    partner,
                    lastMessage: msg.text || (msg.attachments.length > 0 ? "?? Attachment" : ""),
                    timestamp: msg.createdAt,
                    unreadCount: 0
                };
            }
            if (msg.recipient === currentUser && !msg.is_read) {
                conversationsMap[partner].unreadCount += 1;
            }
        });
        return Object.values(conversationsMap);
    },

    // --- NOTIFICATIONS SERVICE ---
    async getNotifications() {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        if (this.isOnline) {
            const res = await this.apiCall(`/notifications?user=${encodeURIComponent(currentUser)}`);
            if (res) return res;
        }

        const storedNotifs = localStorage.getItem("local_notifications");
        if (storedNotifs !== null) {
            return JSON.parse(storedNotifs);
        }

        {
            const seedNotifs = [
                { _id: "notif_1", user: currentUser, title: "New Message from Angela", type: "message", content: "Let's meet tomorrow to discuss the next steps.", is_read: false, createdAt: new Date().toISOString() },
                { _id: "notif_2", user: currentUser, title: "Upcoming Event", type: "event", content: "Sunset Beach Yog 2026 is scheduled for July 30th.", is_read: false, createdAt: new Date().toISOString() }
            ];
            localStorage.setItem("local_notifications", JSON.stringify(seedNotifs));
            return seedNotifs;
        }
    },

    async markNotificationsRead() {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        if (this.isOnline) {
            await this.apiCall("/notifications/read-all", {
                method: "PUT",
                body: JSON.stringify({ user: currentUser })
            });
        }

        let localNotifs = JSON.parse(localStorage.getItem("local_notifications") || "[]");
        localNotifs = localNotifs.map(n => ({ ...n, is_read: true }));
        localStorage.setItem("local_notifications", JSON.stringify(localNotifs));
        this.updateGlobalBadges();
    },

    async clearNotifications() {
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        if (this.isOnline) {
            await this.apiCall(`/notifications/clear-all?user=${encodeURIComponent(currentUser)}`, {
                method: "DELETE"
            });
        }

        localStorage.setItem("local_notifications", JSON.stringify([]));
        this.updateGlobalBadges();
    },

    // Global Badge Updater
    setBadgeCount(badge, count) {
        if (!badge) return;
        badge.textContent = count > 99 ? "99+" : String(count);
        badge.style.display = count > 0 ? "inline-flex" : "none";
        badge.setAttribute("aria-label", count > 0 ? `${count} unread` : "No unread items");
    },

    ensureBadge(parent, className) {
        let badge = parent.querySelector(`.${className}`);
        if (!badge) {
            badge = document.createElement("span");
            badge.className = className;
            parent.appendChild(badge);
        }
        return badge;
    },

    updateNavBadge(label, count) {
        document.querySelectorAll(".nav-menu a, .nav-item a").forEach(link => {
            const text = link.querySelector("span")?.textContent.trim();
            const aria = link.getAttribute("aria-label");
            const iconMatch = label === "Notifications"
                ? link.querySelector('[data-lucide="bell"]')
                : link.querySelector('[data-lucide="message-square"]');

            if (text === label || aria === label || iconMatch) {
                const badge = count > 0 ? this.ensureBadge(link, "badge") : link.querySelector(".badge");
                if (badge) this.setBadgeCount(badge, count);
            }
        });
    },

    updateTopbarBadge(label, count) {
        const iconSelector = label === "Notifications" ? '[data-lucide="bell"]' : '[data-lucide="message-square"]';
        document.querySelectorAll(".topbar-actions .icon-btn-badge, .topbar-actions a, .topbar-actions button").forEach(el => {
            const aria = el.getAttribute("aria-label");
            const iconMatch = el.querySelector(iconSelector);

            if (aria === label || iconMatch) {
                const badge = count > 0 ? this.ensureBadge(el, "badge-dot") : el.querySelector(".badge-dot");
                if (badge) this.setBadgeCount(badge, count);
            }
        });
    },

    async updateGlobalBadges() {
        const notifs = await this.getNotifications();
        const unreadNotifs = notifs.filter(n => !n.is_read).length;
        
        const conversations = await this.getConversations();
        const unreadMessages = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

        this.updateNavBadge("Notifications", unreadNotifs);
        this.updateNavBadge("Messages", unreadMessages);
        this.updateTopbarBadge("Notifications", unreadNotifs);
        this.updateTopbarBadge("Messages", unreadMessages);
    },

    startBadgeAutoRefresh() {
        if (this.badgeAutoRefreshStarted) return;
        this.badgeAutoRefreshStarted = true;

        const refresh = () => this.updateGlobalBadges();
        window.addEventListener("focus", refresh);
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) refresh();
        });
        window.addEventListener("storage", (event) => {
            if (["local_notifications", "local_messages"].includes(event.key)) {
                refresh();
            }
        });
        setInterval(refresh, 30000);
    },

    // Inject Unified Footer
    injectFooter() {
        const footerPlaceholder = document.querySelector("footer");
        if (footerPlaceholder && footerPlaceholder.innerHTML.trim() === "") {
            const footerHTML = `
                <div class="footer-container">
                    <div class="footer-brand">
                        <img src="${window.location.pathname.includes("/events/") ? "../" : ""}assets/logo.png" alt="Pragya Connect Logo" class="footer-logo">
                        <p class="footer-tagline">Connecting the Pragya Yog School community worldwide. Learn, practice, and share together.</p>
                    </div>
                    <div class="footer-links-grid">
                        <div class="footer-links-col">
                            <h4>Platform</h4>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}dashboard.html">Dashboard</a>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}CommunityFeed.html">Community Feed</a>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}mentors.html">Mentors</a>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}events/Events.html">Events</a>
                        </div>
                        <div class="footer-links-col">
                            <h4>Resources</h4>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}resources.html">Learning Resources</a>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}help-support.html">Help & Support</a>
                        </div>
                        <div class="footer-links-col">
                            <h4>Legal</h4>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}privacy-policy.html">Privacy Policy</a>
                            <a href="${window.location.pathname.includes("/events/") ? "../" : ""}terms-and-conditions.html">Terms & Conditions</a>
                        </div>
                    </div>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            `;
            footerPlaceholder.className = "dashboard-footer";
            footerPlaceholder.innerHTML = footerHTML;
        }

        const footerBottom = document.querySelector(".footer-bottom");
        if (footerBottom) {
            footerBottom.innerHTML = `
                <span>&copy; 2026 Pragya Connect. All Rights Reserved.</span>
                <div class="footer-bottom-links">
                    <a href="${window.location.pathname.includes("/events/") ? "../" : ""}privacy-policy.html">Privacy Policy</a>
                    <span>|</span>
                    <a href="${window.location.pathname.includes("/events/") ? "../" : ""}terms-and-conditions.html">Terms &amp; Conditions</a>
                </div>
            `;
        }
    },

    // Dark Mode Synchronization
    initDarkMode() {
        const savedMode = localStorage.getItem("darkMode");
        const enable = savedMode === "true";
        this.setDarkMode(enable);
    },

    setDarkMode(enable) {
        if (enable) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "false");
        }
    },

    // Dynamic Navigation Link Patcher
    fixNavigationLinks() {
        document.querySelectorAll(".nav-menu a, .nav-logout a, .dropdown-menu a, .topbar-actions a, .topbar-actions button").forEach(el => {
            let linkText = el.querySelector("span")?.textContent.trim() || el.getAttribute("aria-label") || "";
            let isSubDir = window.location.pathname.includes("/events/");
            let prefix = isSubDir ? "../" : "";

            if (linkText === "Dashboard" || el.querySelector('[data-lucide="layout-dashboard"]')) {
                el.setAttribute("href", prefix + "dashboard.html");
            } else if (linkText === "Community Feed" || el.querySelector('[data-lucide="users-2"]')) {
                el.setAttribute("href", prefix + "CommunityFeed.html");
            } else if (linkText === "Mentors" || el.querySelector('[data-lucide="graduation-cap"]')) {
                el.setAttribute("href", prefix + "mentors.html");
            } else if (linkText === "Events" || el.querySelector('[data-lucide="calendar"]')) {
                el.setAttribute("href", prefix + "events/Events.html");
            } else if (linkText === "Resources" || el.querySelector('[data-lucide="book-open"]')) {
                el.setAttribute("href", prefix + "resources.html");
            } else if (linkText === "Messages" || el.querySelector('[data-lucide="message-square"]') || linkText === "Messages" || el.getAttribute("aria-label") === "Messages") {
                if (el.tagName === "BUTTON") {
                    const a = document.createElement("a");
                    a.className = el.className;
                    a.innerHTML = el.innerHTML;
                    a.setAttribute("href", prefix + "message.html");
                    a.setAttribute("aria-label", "Messages");
                    el.replaceWith(a);
                } else {
                    el.setAttribute("href", prefix + "message.html");
                }
            } else if (linkText === "Notifications" || el.querySelector('[data-lucide="bell"]') || linkText === "Notifications" || el.getAttribute("aria-label") === "Notifications") {
                if (el.tagName === "BUTTON") {
                    const a = document.createElement("a");
                    a.className = el.className;
                    a.innerHTML = el.innerHTML;
                    a.setAttribute("href", prefix + "notifications.html");
                    a.setAttribute("aria-label", "Notifications");
                    el.replaceWith(a);
                } else {
                    el.setAttribute("href", prefix + "notifications.html");
                }
            } else if (linkText === "Profile" || el.querySelector('[data-lucide="user"]')) {
                el.setAttribute("href", prefix + "Profile.html");
            } else if (linkText === "Settings" || el.querySelector('[data-lucide="settings"]')) {
                el.setAttribute("href", prefix + "setting.html");
            } else if (linkText === "Logout" || el.querySelector('[data-lucide="log-out"]')) {
                el.setAttribute("href", prefix + "index.html");
            }
        });
    }
};

window.AppService = AppService;
AppService.initSession();
AppService.checkConnectivity();

function bootAppService() {
    AppService.injectFooter();
    AppService.fixNavigationLinks();
    AppService.initDarkMode();
    AppService.updateGlobalBadges();
    AppService.startBadgeAutoRefresh();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootAppService);
} else {
    bootAppService();
}
