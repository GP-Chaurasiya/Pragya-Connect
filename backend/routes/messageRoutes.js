const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET CHAT HISTORY
router.get("/history", async (req, res) => {
    try {
        const { user1, user2 } = req.query;
        if (!user1 || !user2) {
            return res.status(400).send("Both user1 and user2 are required");
        }

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to retrieve chat history");
    }
});

// GET LIST OF CONVERSATIONS WITH LAST MESSAGE AND UNREAD COUNT
router.get("/conversations", async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) {
            return res.status(400).send("User name/email is required");
        }

        const messages = await Message.find({
            $or: [{ sender: user }, { recipient: user }]
        }).sort({ createdAt: -1 });

        const conversationsMap = {};

        messages.forEach(msg => {
            const partner = msg.sender === user ? msg.recipient : msg.sender;
            if (!conversationsMap[partner]) {
                conversationsMap[partner] = {
                    partner,
                    lastMessage: msg.text || (msg.attachments.length > 0 ? "?? Attachment" : ""),
                    timestamp: msg.createdAt,
                    unreadCount: 0,
                    pinned: msg.pinned,
                    starred: msg.starred
                };
            }
            if (msg.recipient === user && !msg.is_read) {
                conversationsMap[partner].unreadCount += 1;
            }
        });

        res.json(Object.values(conversationsMap));

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to fetch conversations");
    }
});

// SEND MESSAGE
router.post("/send", async (req, res) => {
    try {
        const { sender, recipient, text, attachments, reply_to } = req.body;

        const msg = new Message({
            sender,
            recipient,
            text,
            attachments: attachments || [],
            reply_to
        });

        await msg.save();
        res.status(201).json(msg);

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to send message");
    }
});

// MARK CONVERSATION AS READ
router.put("/read", async (req, res) => {
    try {
        const { sender, recipient } = req.body;
        await Message.updateMany(
            { sender, recipient, is_read: false },
            { is_read: true }
        );
        res.send("Messages marked as read");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to mark messages as read");
    }
});

// EDIT MESSAGE
router.put("/edit/:id", async (req, res) => {
    try {
        const { text } = req.body;
        const msg = await Message.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true }
        );
        res.json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to edit message");
    }
});

// DELETE MESSAGE
router.delete("/delete/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.send("Message deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to delete message");
    }
});

// TOGGLE PIN MESSAGE
router.put("/pin/:id", async (req, res) => {
    try {
        const msg = await Message.findById(req.params.id);
        if (!msg) return res.status(404).send("Message not found");
        msg.pinned = !msg.pinned;
        await msg.save();
        res.json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to pin message");
    }
});

// TOGGLE STAR MESSAGE
router.put("/star/:id", async (req, res) => {
    try {
        const msg = await Message.findById(req.params.id);
        if (!msg) return res.status(404).send("Message not found");
        msg.starred = !msg.starred;
        await msg.save();
        res.json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to star message");
    }
});

// ADD/REMOVE REACTION
router.put("/react/:id", async (req, res) => {
    try {
        const { user, emoji } = req.body;
        const msg = await Message.findById(req.params.id);
        if (!msg) return res.status(404).send("Message not found");

        const existingReactionIndex = msg.reactions.findIndex(r => r.user === user);
        if (existingReactionIndex > -1) {
            if (msg.reactions[existingReactionIndex].emoji === emoji) {
                msg.reactions.splice(existingReactionIndex, 1);
            } else {
                msg.reactions[existingReactionIndex].emoji = emoji;
            }
        } else {
            msg.reactions.push({ user, emoji });
        }

        await msg.save();
        res.json(msg);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to update reaction");
    }
});

module.exports = router;
