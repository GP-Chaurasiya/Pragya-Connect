const events = [

{
    id: 1,
    title: "Yog Therapy – Realigned Your Body",
    category: "Yog Therapy",
    month: "January",
    date: "2026-01-10",
    time: "10:00 AM",
    venue: "Pragya Yog School",
    price: "$3,150",
    image: "assets/events/yog-therapy.jpg",
    description: "A therapeutic yoga program focused on spinal alignment and holistic healing."
},

{
    id: 2,
    title: "Professional 1-1 Spinal Health Consultation with Shoaib",
    category: "Yog Therapy",
    month: "January",
    date: "2026-01-18",
    time: "11:00 AM",
    venue: "Consultation Room",
    price: "$1,200",
    image: "assets/events/spinal-health.jpg"
},

{
    id: 3,
    title: "Inversion Intensive Training 2026",
    category: "Intensive Training",
    month: "January",
    date: "2026-01-25",
    time: "09:00 AM",
    venue: "Main Yoga Hall",
    price: "$4,500",
    image: "assets/events/inversion.jpg"
},

{
    id: 4,
    title: "Celebrate the Year of the Horse with the Meditative Art of Calligraphy",
    category: "Pragya Events",
    month: "February",
    date: "2026-02-08",
    time: "02:00 PM",
    venue: "Creative Studio",
    price: "$388",
    originalPrice: "$485",
    offer: true,
    image: "assets/events/calligraphy.jpg"
},

{
    id: 5,
    title: "20-Hr CET Hands-on Adjustment",
    category: "Teacher Training",
    month: "February",
    date: "2026-02-20",
    time: "09:00 AM",
    venue: "Training Hall",
    price: "$8,725",
    image: "assets/events/cet-adjustment.jpg"
},

{
    id: 6,
    title: "Holi Celebration",
    category: "Pragya Events",
    month: "March",
    date: "2026-03-14",
    time: "04:00 PM",
    venue: "Campus Ground",
    price: "$400-$500",
    image: "assets/events/holi.jpg"
},

{
    id: 7,
    title: "Spring Rejuvenation Retreat: Yog & Ski in Niseko, Japan",
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