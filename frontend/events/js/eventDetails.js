(function () {
    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value || "";
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function getSelectedEvent() {
        const params = new URLSearchParams(window.location.search);
        const eventId = Number.parseInt(params.get("id"), 10);
        const eventList = window.events || [];

        if (eventId) {
            return eventList.find(event => event.id === eventId) || eventList[0];
        }

        const upcoming = eventList
            .filter(event => new Date(event.date) >= new Date().setHours(0, 0, 0, 0))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return upcoming[0] || eventList[0];
    }

    function setText(selector, text) {
        const element = document.querySelector(selector);
        if (element && text) element.textContent = text;
    }

    function renderEventDetails() {
        const event = getSelectedEvent();
        if (!event) return;

        document.title = `${event.title} - Pragya Connect`;

        const banner = document.querySelector(".event-banner img");
        if (banner) {
            banner.src = event.image || "assets/gallery_group.png";
            banner.alt = event.title;
            banner.onerror = () => {
                banner.src = "assets/gallery_group.png";
            };
        }

        setText(".event-tag", event.category);
        setText(".event-header h1", event.title);
        setText(".event-subtitle", event.description);

        const infoItems = document.querySelectorAll(".event-info div");
        const info = [
            ["calendar", formatDate(event.date)],
            ["clock", event.time || "Time to be announced"],
            ["map-pin", event.venue || "Venue to be announced"],
            ["users", "Open registration"],
            ["user-round", event.price ? `Fee: ${event.price}` : "Pragya Yog School"]
        ];

        infoItems.forEach((item, index) => {
            const [icon, text] = info[index] || [];
            if (!icon) return;
            item.innerHTML = `<i data-lucide="${icon}"></i>${text}`;
        });

        const about = document.querySelector(".detail-card p");
        if (about) about.textContent = event.description || "More details will be shared soon.";

        const locationTitle = document.querySelector(".map-placeholder h3");
        const locationText = document.querySelector(".map-placeholder p");
        if (locationTitle) locationTitle.textContent = event.venue || "Venue to be announced";
        if (locationText) locationText.textContent = "Pragya Yog School";

        const registerBtn = document.querySelector(".register-btn");
        if (registerBtn) {
            registerBtn.addEventListener("click", () => {
                window.location.href = `Register.html?id=${encodeURIComponent(event.id)}`;
            });
        }

        if (window.lucide) lucide.createIcons();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderEventDetails);
    } else {
        renderEventDetails();
    }
})();
