const form = document.getElementById("registrationForm");

if(form){

    const params = new URLSearchParams(window.location.search);
    const eventName = params.get("event");

    const eventInput = document.getElementById("eventName");

    if(eventInput && eventName){
        eventInput.value = eventName;
    }

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const registration = {

            id: "EVT" + Date.now(),

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            event: eventInput.value,

            status: "Registered",

            date: new Date().toLocaleDateString()

        };

        let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

        registrations.push(registration);

        localStorage.setItem("registrations", JSON.stringify(registrations));

        alert("Registration Successful!");

        window.location.href = "MyRegistrations.html";

    });

}