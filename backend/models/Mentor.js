const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    expertise: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Mentor", mentorSchema);