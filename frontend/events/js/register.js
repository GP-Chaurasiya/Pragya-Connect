const form = document.getElementById("registrationForm");

if (form) {
    const params = new URLSearchParams(window.location.search);
    const eventId = parseInt(params.get("id")) || 1;
    const eventInput = document.getElementById("eventName");

    // Load event name from events array
    const event = window.events ? events.find(e => e.id === eventId) : null;
    if (eventInput && event) {
        eventInput.value = event.title;
        // Make field readonly instead of disabled, so form submit still sends the value
        eventInput.setAttribute("readonly", "true");
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const registration = {
            id: "REG-" + Date.now(),
            eventId: event ? event.id : eventId,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            event: eventInput ? eventInput.value : "Yoga Session",
            eventDate: event ? event.date : new Date().toLocaleDateString(),
            venue: event ? event.venue : "Pragya Hall",
            status: "Registered",
            date: new Date().toLocaleDateString()
        };

        let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        registrations.push(registration);
        localStorage.setItem("registrations", JSON.stringify(registrations));

        // Create a local notification for registration confirmation
        const currentUser = localStorage.getItem("userName") || "Gyan Prakash";
        const localNotifs = JSON.parse(localStorage.getItem("local_notifications") || "[]");
        localNotifs.push({
            _id: "notif_" + Date.now(),
            user: currentUser,
            title: "Event Registered Successfully",
            type: "event",
            content: `You have registered for ${registration.event} scheduled on ${registration.eventDate}.`,
            is_read: false,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("local_notifications", JSON.stringify(localNotifs));

        alert("Registration Successful!");
        window.location.href = "MyRegistrations.html";
    });
}