const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

// Initialize App
const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/resources", resourceRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send("Pragya Connect Backend Running");
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});