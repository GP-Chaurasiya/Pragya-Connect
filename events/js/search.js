const searchData = [
  {
    title: "Dashboard",
    page: "dashboard.html"
  },
  {
    title: "Community Feed",
    page: "CommunityFeed.html"
  },
  {
    title: "Profile",
    page: "Profile.html"
  },
  {
    title: "Events",
    page: "events/Events.html"
  },
  {
    title: "Calendar",
    page: "events/Calender.html"   // Use your actual filename
  },
  {
    title: "Event Details",
    page: "events/EventDetails.html"
  },
  {
    title: "Register",
    page: "events/Register.html"
  },
  {
    title: "My Registrations",
    page: "events/MyRegistrations.html"
  },
  {
    title: "Pdf",
    page: "resources.html"
  },
  {
    title: "library",
    page: "resources.html"
  },
  {
    title: "teacher",
    page: "mentors.html"
  }
];

const searchInput = document.querySelector(".search-input");

if (searchInput) {

    const results = document.createElement("div");
    results.className = "search-results";
    searchInput.parentElement.appendChild(results);

    searchInput.addEventListener("input", function () {

        const value = this.value.toLowerCase().trim();

        results.innerHTML = "";

        if (value === "") {
            results.style.display = "none";
            return;
        }

        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(value)
        );

        if (filtered.length === 0) {
            results.innerHTML = "<div class='search-item'>No results found</div>";
        } else {

            filtered.forEach(item => {

                results.innerHTML += `
                    <div class="search-item" onclick="location.href='${item.page}'">
                        ${item.title}
                    </div>
                `;

            });

        }

        results.style.display = "block";

    });

    document.addEventListener("click", function(e){

        if(!searchInput.parentElement.contains(e.target)){
            results.style.display="none";
        }

    });

}