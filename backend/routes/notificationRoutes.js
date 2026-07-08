const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET ALL NOTIFICATIONS FOR A USER
router.get("/", async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).send("User name/email is required");
        }

        const notifications = await Notification.find({ user }).sort({ createdAt: -1 });
        res.json(notifications);

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to retrieve notifications");
    }
});

// MARK ALL NOTIFICATIONS AS READ
router.put("/read-all", async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(400).send("User name/email is required");
        }

        await Notification.updateMany({ user, is_read: false }, { is_read: true });
        res.send("All notifications marked as read");

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to update notifications");
    }
});

// MARK A SINGLE NOTIFICATION AS READ
router.put("/read/:id", async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { is_read: true },
            { new: true }
        );
        res.json(notification);

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to update notification");
    }
});

// CLEAR ALL NOTIFICATIONS FOR A USER
router.delete("/clear-all", async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).send("User name/email is required");
        }

        await Notification.deleteMany({ user });
        res.send("All notifications cleared");

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to clear notifications");
    }
});

module.exports = router;
