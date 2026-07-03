let registrations =
JSON.parse(localStorage.getItem("registrations")) || [];

const container = document.getElementById("registrationContainer");
const search = document.getElementById("searchInput");

function display(data){

    container.innerHTML="";

    if(data.length===0){

        container.innerHTML=`
        <div class="registration-card">
            <h3>No registrations found.</h3>
        </div>`;
        return;
    }

    data.forEach((item)=>{

        container.innerHTML += `

        <div class="registration-card">

            <h3>${item.event}</h3>

            <p><strong>Name:</strong> ${item.name}</p>

            <p><strong>Email:</strong> ${item.email}</p>

            <p><strong>Phone:</strong> ${item.phone}</p>

            <p><strong>Course:</strong> ${item.course}</p>

            <p><strong>Date:</strong> ${item.date}</p>

            <p class="status">${item.status}</p>

            <button
                class="edit-btn"
                onclick="editRegistration('${item.id}')">

                Edit

            </button>

            <button
                class="cancel-btn"
                onclick="cancelRegistration('${item.id}')">

                Cancel Registration

            </button>

        </div>

        `;

    });

}

function cancelRegistration(id){

    if(confirm("Cancel this registration?")){

        registrations = registrations.filter(reg => reg.id !== id);

        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );

        display(registrations);

    }

}

function editRegistration(id){

    const index = registrations.findIndex(reg => reg.id === id);

    if(index === -1) return;

    const reg = registrations[index];

    const phone = prompt("Phone Number", reg.phone);
    if(phone === null) return;

    const course = prompt("Course", reg.course);
    if(course === null) return;

    reg.phone = phone;
    reg.course = course;

    registrations[index] = reg;

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    display(registrations);

}

display(registrations);