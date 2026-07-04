const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");


// CREATE EVENT API
router.post("/create", async (req, res) => {
    try {
        const { title, description, date, time, location, created_by } = req.body;

        const event = new Event({
            title,
            description,
            date,
            time,
            location,
            created_by
        });

        await event.save();

        res.send("Event Created Successfully");

    } catch (error) {
        console.log(error);
        res.send("Event Creation Failed");
    }
});


// REGISTER EVENT API
router.post("/register", async (req, res) => {
    try {
        const { event_id, user_id } = req.body;

        const registration = new EventRegistration({
            event_id,
            user_id
        });

        await registration.save();

        res.send("Event Registered Successfully");

    } catch (error) {
        console.log(error);
        res.send("Event Registration Failed");
    }
});

//CALENDAR API
router.get("/calendar", async (req, res) => {
    try {
        const events = await Event.find();

        res.json(events);

    } catch (error) {
        console.log(error);
        res.send("Failed to fetch events");
    }
});


module.exports = router;