const form = document.getElementById("registrationForm");

const params = new URLSearchParams(window.location.search);
const eventName = params.get("event");

if(eventName){
    document.getElementById("eventName").value = eventName;
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const registration = {

        id:"EVT"+Date.now(),

        name:document.getElementById("name").value,

        email:document.getElementById("email").value,

        phone:document.getElementById("phone").value,

        course:document.getElementById("course").value,

        event:document.getElementById("eventName").value,

        status:"Registered"

    };

    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    registrations.push(registration);

    localStorage.setItem("registrations",JSON.stringify(registrations));

    alert("Registration Successful!");

    window.location.href="MyRegistrations.html";

});