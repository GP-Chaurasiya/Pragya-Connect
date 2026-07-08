const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    text: { type: String, default: "" },
    attachments: [{
        name: String,
        url: String,
        fileType: String,
        size: Number
    }],
    reactions: [{
        user: String,
        emoji: String
    }],
    is_read: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
    reply_to: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);
