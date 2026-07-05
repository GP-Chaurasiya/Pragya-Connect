const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const Comment = require("../models/Comment");


// CREATE POST API
router.post("/create", async (req, res) => {
    try {
        const { user_id, content, image } = req.body;

        const post = new Post({
            user_id,
            content,
            image
        });

        await post.save();

        res.send("Post Created Successfully");

    } catch (error) {
        console.log(error);
        res.send("Post Creation Failed");
    }
});


// EDIT POST API
router.put("/edit/:id", async (req, res) => {
    try {
        const { content, image } = req.body;

        await Post.findByIdAndUpdate(req.params.id, {
            content,
            image
        });

        res.send("Post Updated Successfully");

    } catch (error) {
        console.log(error);
        res.send("Post Update Failed");
    }
});


// DELETE POST API
router.delete("/delete/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.send("Post Deleted Successfully");

    } catch (error) {
        console.log(error);
        res.send("Post Delete Failed");
    }
});


// COMMENT API
router.post("/comment", async (req, res) => {
    try {
        const { post_id, user_id, comment_text } = req.body;

        const comment = new Comment({
            post_id,
            user_id,
            comment_text
        });

        await comment.save();

        res.send("Comment Added Successfully");

    } catch (error) {
        console.log(error);
        res.send("Comment Failed");
    }
});


// LIKE API
router.put("/like/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.send("Post not found");
        }

        post.likes += 1;

        await post.save();

        res.send("Post Liked Successfully");

    } catch (error) {
        console.log(error);
        res.send("Like Failed");
    }
});


module.exports = router;