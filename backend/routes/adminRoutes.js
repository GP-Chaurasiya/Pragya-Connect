const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Event = require("../models/Event");

// GET ALL USERS
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);

    } catch (error) {
        console.log(error);
        res.send("Failed to fetch users");
    }
});

// DELETE USER
router.delete("/user/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.send("User Deleted Successfully");

    } catch (error) {
        console.log(error);
        res.send("User Delete Failed");
    }
});

// REPORTS API
router.get("/reports", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalComments = await Comment.countDocuments();
        const totalEvents = await Event.countDocuments();

        res.json({
            totalUsers,
            totalPosts,
            totalComments,
            totalEvents
        });

    } catch (error) {
        console.log(error);
        res.send("Reports Fetch Failed");
    }
});

// DASHBOARD STATS API
router.get("/stats", async (req, res) => {
    try {
        const users = await User.countDocuments();
        const posts = await Post.countDocuments();
        const comments = await Comment.countDocuments();
        const events = await Event.countDocuments();

        res.json({
            users,
            posts,
            comments,
            events
        });

    } catch (error) {
        console.log(error);
        res.send("Stats Fetch Failed");
    }
});

// DELETE POST
router.delete("/post/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.send("Post Deleted Successfully");

    } catch (error) {
        console.log(error);
        res.send("Post Delete Failed");
    }
});

// DELETE COMMENT
router.delete("/comment/:id", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);

        res.send("Comment Deleted Successfully");

    } catch (error) {
        console.log(error);
        res.send("Comment Delete Failed");
    }
});

module.exports = router;