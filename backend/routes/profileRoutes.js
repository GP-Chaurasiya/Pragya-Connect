const express = require("express");
const router = express.Router();
const User = require("../models/User");


// GET PROFILE
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.send("User Not Found");
        }

        res.json(user);

    } catch (error) {
        console.log(error);
        res.send("Profile Fetch Failed");
    }
});


// UPDATE PROFILE
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedUser);

    } catch (error) {
        console.log(error);
        res.send("Profile Update Failed");
    }
});


module.exports = router;