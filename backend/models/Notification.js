const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, default: "" },
    is_read: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model("Notification", notificationSchema);
