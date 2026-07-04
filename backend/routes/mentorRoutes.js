const express = require("express");
const router = express.Router();
const User = require("../models/User");


// GET ALL MENTORS
router.get("/", async (req, res) => {
    try {
        const mentors = await User.find({ role: "Mentor" });

        res.json(mentors);

    } catch (error) {
        console.log(error);
        res.send("Mentors Fetch Failed");
    }
});

module.exports = router;