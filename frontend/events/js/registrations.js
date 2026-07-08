let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

const container = document.getElementById("registrationContainer");

function display(data) {
    if (!container) return;
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `
            <div class="registration-card" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="calendar-off" style="width: 48px; height: 48px; margin-bottom: 12px; display: inline-block;"></i>
                <p>No event registrations found.</p>
            </div>`;
        if (window.lucide) lucide.createIcons();
        return;
    }

    data.forEach((item) => {
        container.innerHTML += `
            <div class="registration-card" style="padding: 20px; border-radius: 16px; border: 1px solid var(--border); background-color: var(--card-bg); margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">${item.event}</h3>
                <p style="font-size: 14px; margin-bottom: 6px; color: var(--text-main);"><strong>Name:</strong> ${item.name}</p>
                <p style="font-size: 14px; margin-bottom: 6px; color: var(--text-main);"><strong>Email:</strong> ${item.email}</p>
                <p style="font-size: 14px; margin-bottom: 6px; color: var(--text-main);"><strong>Phone:</strong> ${item.phone}</p>
                <p style="font-size: 14px; margin-bottom: 6px; color: var(--text-main);"><strong>Event Date:</strong> ${item.eventDate || item.date}</p>
                <p style="font-size: 14px; margin-bottom: 12px; color: var(--text-main);"><strong>Venue:</strong> ${item.venue || "TBD"}</p>
                <p class="status" style="display: inline-block; font-size: 12px; font-weight: 700; background-color: var(--primary-light); color: var(--primary); padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 15px;">${item.status}</p>
                <div style="display: flex; gap: 10px;">
                    <button class="edit-btn" onclick="editRegistration('${item.id}')" style="background-color: var(--bg-body); border: 1px solid var(--border); color: var(--text-main); padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600;">Edit</button>
                    <button class="cancel-btn" onclick="cancelRegistration('${item.id}')" style="background: none; border: 1px solid transparent; color: var(--red-dark); padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600;">Cancel</button>
                </div>
            </div>
        `;
    });

    if (window.lucide) lucide.createIcons();
}

window.cancelRegistration = function(id) {
    const reg = registrations.find(r => r.id === id);
    if (!reg) return;

    if (confirm(`Are you sure you want to cancel your registration for ${reg.event}?`)) {
        registrations = registrations.filter(r => r.id !== id);
        localStorage.setItem("registrations", JSON.stringify(registrations));

        // Create notification
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        const localNotifs = JSON.parse(localStorage.getItem("local_notifications") || "[]");
        localNotifs.push({
            _id: "notif_" + Date.now(),
            user: currentUser,
            title: "Registration Cancelled",
            type: "event",
            content: `You have successfully cancelled your registration for ${reg.event}.`,
            is_read: false,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("local_notifications", JSON.stringify(localNotifs));

        display(registrations);
    }
};

window.editRegistration = function(id) {
    const index = registrations.findIndex(r => r.id === id);
    if (index === -1) return;

    const reg = registrations[index];

    const name = prompt("Registrant Name", reg.name);
    if (name === null || name.trim() === "") return;

    const email = prompt("Email Address", reg.email);
    if (email === null || email.trim() === "") return;

    const phone = prompt("Phone Number", reg.phone);
    if (phone === null || phone.trim() === "") return;

    reg.name = name;
    reg.email = email;
    reg.phone = phone;

    registrations[index] = reg;
    localStorage.setItem("registrations", JSON.stringify(registrations));

    alert("Registration updated successfully!");
    display(registrations);
};

display(registrations);