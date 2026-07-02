let registrations =
JSON.parse(localStorage.getItem("registrations")) || [];

const container =
document.getElementById("registrationContainer");

const search =
document.getElementById("searchInput");

function display(data){

container.innerHTML="";

if(data.length===0){

container.innerHTML="<p>No registrations found.</p>";

return;

}

data.forEach((item,index)=>{

container.innerHTML+=`

<div class="registration-card">

<h3>${item.event}</h3>

<p><strong>Name:</strong> ${item.name}</p>

<p><strong>Email:</strong> ${item.email}</p>

<p><strong>Phone:</strong> ${item.phone}</p>

<p><strong>Course:</strong> ${item.course}</p>

<p class="status">${item.status}</p>

<button
class="cancel-btn"
onclick="cancelRegistration(${index})">

Cancel Registration

</button>

</div>

`;

});

}

function cancelRegistration(index){

if(confirm("Cancel this registration?")){

registrations.splice(index,1);

localStorage.setItem(
"registrations",
JSON.stringify(registrations)
);

display(registrations);

}

}

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

display(

registrations.filter(r=>

r.event.toLowerCase().includes(value)

)

);

});

display(registrations);