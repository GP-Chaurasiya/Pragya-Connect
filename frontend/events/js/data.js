const events = [

{
    id: 1,
    title: "International Yoga Workshop",
    category: "Yoga",
    month: "July",
    date: "2026-07-15",
    time: "10:00 AM",
    venue: "Meditation Hall",
    price: "$3,150",
    image: "assets/gallery_group.png",
    description: "A transformative international yoga workshop uniting practitioners from around the world to deepen alignment, breathwork, and mindful awareness."
},

{
    id: 2,
    title: "AI & Innovation Seminar",
    category: "Seminar",
    month: "July",
    date: "2026-07-18",
    time: "11:30 AM",
    venue: "Conference Hall",
    price: "$1,200",
    image: "assets/gallery_studio_1.png",
    description: "Explore the intersection of artificial intelligence and holistic wellness. Join thought leaders for a deep-dive into mindful innovation."
},

{
    id: 3,
    title: "Coding Bootcamp",
    category: "Workshop",
    month: "July",
    date: "2026-07-21",
    time: "09:00 AM",
    venue: "Innovation Lab",
    price: "$4,500",
    image: "assets/gallery_studio_2.png",
    description: "An intensive hands-on coding bootcamp designed to accelerate your skills in modern web development and problem-solving."
},

{
    id: 4,
    title: "Cultural Evening",
    category: "Cultural",
    month: "July",
    date: "2026-07-25",
    time: "06:00 PM",
    venue: "Open Amphitheatre",
    price: "$388",
    image: "assets/gallery_mountain.png",
    description: "Celebrate the rich tapestry of cultures through music, dance, and art at our open-air amphitheatre under the evening sky."
},

{
    id: 5,
    title: "Sports Championship",
    category: "Sports",
    month: "July",
    date: "2026-07-28",
    time: "08:00 AM",
    venue: "Sports Ground",
    price: "$8,725",
    image: "assets/gallery_group.png",
    description: "A thrilling multi-sport championship event bringing together athletes for a day of competition, teamwork, and community spirit."
},

{
    id: 6,
    title: "Entrepreneurship Summit",
    category: "Talk",
    month: "July",
    date: "2026-07-30",
    time: "02:00 PM",
    venue: "Main Auditorium",
    price: "$400-$500",
    image: "assets/welcome_banner.png",
    description: "Connect with visionary entrepreneurs and industry leaders. Gain insights, forge partnerships, and ignite your entrepreneurial journey."
},


    category: "Retreat",
    month: "March",
    date: "2026-03-22",
    time: "08:00 AM",
    venue: "Niseko, Japan",
    price: "$18,960-$24,500",
    offer: true,
    image: "assets/events/japan-retreat.jpg"
},

{
    id: 8,
    title: "ABC Workshop – Sun Salutation",
    category: "ABC Workshop",
    month: "March",
    date: "2026-03-29",
    time: "09:00 AM",
    venue: "Yoga Studio",
    price: "$1,980",
    image: "assets/events/sun-salutation.jpg"
},

{
    id: 9,
    title: "Pragya 200 – Intensive Training",
    category: "Teacher Training",
    month: "April",
    date: "2026-04-05",
    time: "09:00 AM",
    venue: "Training Center",
    price: "$515-$7,300",
    image: "assets/events/pragya200-intensive.jpg"
},

{
    id: 10,
    title: "Pragya 200 – Full Training",
    category: "Teacher Training",
    month: "April",
    date: "2026-04-15",
    time: "09:00 AM",
    venue: "Training Center",
    price: "$38,000",
    image: "assets/events/pragya200-full.jpg"
},

{
    id: 11,
    title: "New Moon Flow: Grounding Evening Practice",
    category: "Workshop",
    month: "May",
    date: "2026-05-18",
    time: "06:30 PM",
    venue: "Meditation Hall",
    price: "$250-$280",
    image: "assets/events/new-moon.jpg"
},

{
    id: 12,
    title: "Pragya Satsang : Concept Of Sankhya",
    category: "Teacher Training",
    month: "June",
    date: "2026-06-13",
    time: "05:00 PM",
    venue: "Satsang Hall",
    price: "$850-$1,550",
    image: "assets/events/sankhya.jpg"
},

{
    id: 13,
    title: "ABC Workshop: Inversions for Beginners",
    category: "ABC Workshop",
    month: "June",
    date: "2026-06-28",
    time: "09:00 AM",
    venue: "Yoga Studio",
    price: "$1,980",
    image: "assets/events/inversion-foundation.jpg"
},

{
    id: 14,
    title: "Kids Summer Yog Camp (Age 7–11 Batch 2)",
    category: "Kids Program",
    month: "July",
    date: "2026-07-06",
    time: "09:00 AM",
    venue: "Kids Hall",
    price: "$3,600",
    offer: true,
    image: "assets/events/kids-batch2.jpg"
},

{
    id: 15,
    title: "ABC Workshop: Backbends for Beginners",
    category: "ABC Workshop",
    month: "July",
    date: "2026-07-18",
    time: "09:00 AM",
    venue: "Yoga Studio",
    price: "$1,980",
    image: "assets/events/backbend-foundation.jpg"
},

{
    id: 16,
    title: "Sunset Beach Yog 2026",
    category: "Pragya Events",
    month: "July",
    date: "2026-07-30",
    time: "05:30 PM",
    venue: "Beach",
    price: "$400-$500",
    image: "assets/events/beach-yoga.jpg"
},

{
    id: 17,
    title: "Kids Summer Yog Camp (Age 7–11 Batch 1)",
    category: "Kids Program",
    month: "August",
    date: "2026-08-03",
    price: "$3,600",
    offer: true
},

{
    id: 18,
    title: "Kids Summer Yog Camp (Age 3–6)",
    category: "Kids Program",
    month: "August",
    date: "2026-08-10",
    price: "$3,600",
    offer: true
},

{
    id: 19,
    title: "Kids Summer Yog Camp (Age 12–16)",
    category: "Kids Program",
    month: "August",
    date: "2026-08-17",
    price: "$3,600",
    offer: true
},

{
    id: 20,
    title: "Back Bend Intensive Series – Part 1",
    category: "Intensive Training",
    month: "August",
    date: "2026-08-24",
    price: "$495-$6,500"
},

{
    id: 21,
    title: "Pragya Boat Trip 3.0",
    category: "Pragya Events",
    month: "September",
    date: "2026-09-12",
    price: "$1,350",
    offer: true
},

{
    id: 22,
    title: "Sacred Soundscapes",
    category: "Teacher Training",
    month: "September",
    date: "2026-09-26",
    price: "$10,750"
},

{
    id: 23,
    title: "Sacred Serenity Nepal Retreat",
    category: "Retreat",
    month: "October",
    date: "2026-10-10",
    price: "$15,660-$19,125",
    offer: true
},

{
    id: 24,
    title: "ABC Workshop: To Be Announced",
    category: "ABC Workshop",
    month: "October",
    date: "2026-10-20",
    price: "$1,980"
},

{
    id: 25,
    title: "Nature And Hike",
    category: "Pragya Events",
    month: "October",
    date: "2026-10-31",
    price: "$400-$500"
},

{
    id: 26,
    title: "Back Bend Intensive Series – Part 2",
    category: "Intensive Training",
    month: "December",
    date: "2026-12-12",
    price: "$495-$5,525",
    offer: true
},

{
    id: 27,
    title: "Christmas Festival of Inner Light",
    category: "Pragya Events",
    month: "December",
    date: "2026-12-25",
    price: "$400",
    offer: true
}

];