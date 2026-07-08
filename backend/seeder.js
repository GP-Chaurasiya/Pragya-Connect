const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Post = require("./models/post");
const Comment = require("./models/Comment");
const Event = require("./models/Event");
const Resource = require("./models/Resource");
const Message = require("./models/Message");
const Notification = require("./models/Notification");

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");

        // Clear existing data
        await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        await Event.deleteMany();
        await Resource.deleteMany();
        await Message.deleteMany();
        await Notification.deleteMany();

        console.log("Cleared existing collections.");

        // Hash default password
        const passwordHash = await bcrypt.hash("password123", 10);

        // Seed Users
        const users = await User.insertMany([
            { name: "Gyan Prakash", email: "gyan@gmail.com", password: passwordHash, role: "Student" },
            { name: "Aarya Kuldeep", email: "aarya@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Dr. Yatendra Dutt Amoli", email: "yatendra@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Dr. Usha Jaiswal", email: "usha@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Dr. Rakesh Jaiswal", email: "rakesh@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Angela", email: "angela@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Ashish Prajapati", email: "ashish@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Charlotte", email: "charlotte@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Louise", email: "louise@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Marcus", email: "marcus@pragya.com", password: passwordHash, role: "Teacher" },
            { name: "Tavia", email: "tavia@pragya.com", password: passwordHash, role: "Teacher" }
        ]);

        console.log("Seeded Users.");

        const student = users[0];
        const teacher = users[1];

        // Seed Posts
        const posts = await Post.insertMany([
            {
                user_id: teacher._id,
                content: "Daily morning yoga session successfully completed. Remember, consistency is the key to deep healing! ??? #YogaTherapy #MorningVibes",
                image: "assets/akhilesh_post.png",
                likes: 12
            },
            {
                user_id: student._id,
                content: "Just finished the 5-Day Meditation challenge. Feeling absolutely rejuvenated and focused! Thanks to Aarya Kuldeep for the guidance. #Meditation #Mindfulness",
                likes: 8
            }
        ]);

        console.log("Seeded Posts.");

        // Seed Comments
        await Comment.insertMany([
            {
                post_id: posts[0]._id,
                user_id: student._id,
                comment_text: "Thank you teacher! Looking forward to tomorrow's session."
            }
        ]);

        // Seed Events
        await Event.insertMany([
            {
                title: "Kids Summer Yog Camp (Age 7–11 Batch 2)",
                description: "A fun-filled, interactive yoga camp specially tailored for kids to learn breathing, postures, and focus.",
                date: new Date("2026-07-06"),
                time: "09:00 AM",
                location: "Kids Hall",
                created_by: teacher._id
            },
            {
                title: "ABC Workshop: Backbends for Beginners",
                description: "An absolute beginners workshop covering correct spinal extension techniques and core activation.",
                date: new Date("2026-07-18"),
                time: "09:00 AM",
                location: "Yoga Studio",
                created_by: teacher._id
            },
            {
                title: "Sunset Beach Yog 2026",
                description: "Relax, stretch, and breathe under the golden hour on the beach. Followed by a bonfire.",
                date: new Date("2026-07-30"),
                time: "05:30 PM",
                location: "Beach Area",
                created_by: teacher._id
            }
        ]);

        console.log("Seeded Events.");

        // Seed Resources
        await Resource.insertMany([
            {
                title: "Yoga Anatomy Reference Guide",
                description: "A detailed visual dictionary explaining muscle engagement in key yoga postures.",
                file_url: "resources/anatomy_guide.pdf",
                uploaded_by: teacher._id,
                category: "Yog Therapy"
            },
            {
                title: "Meditation and Breathing Exercises",
                description: "Pranayama techniques and guidelines to improve lung capacity and clear mental fog.",
                file_url: "resources/meditation_guide.pdf",
                uploaded_by: teacher._id,
                category: "Meditation"
            }
        ]);

        console.log("Seeded Resources.");

        // Seed Messages
        await Message.insertMany([
            {
                sender: "Angela",
                recipient: "Gyan Prakash",
                text: "Hi ??, how is your meditation practice going?",
                is_read: false
            },
            {
                sender: "Gyan Prakash",
                recipient: "Angela",
                text: "Hello Angela! It is going great, thank you! I feel much more grounded.",
                is_read: true
            },
            {
                sender: "Angela",
                recipient: "Gyan Prakash",
                text: "Let's meet tomorrow to discuss the next steps.",
                is_read: false
            }
        ]);

        console.log("Seeded Messages.");

        // Seed Notifications
        await Notification.insertMany([
            {
                user: "Gyan Prakash",
                title: "New Message from Angela",
                type: "message",
                content: "Let's meet tomorrow to discuss the next steps.",
                is_read: false
            },
            {
                user: "Gyan Prakash",
                title: "New Event: Backbends for Beginners",
                type: "event",
                content: "ABC Workshop: Backbends for Beginners is scheduled for July 18th.",
                is_read: false
            }
        ]);

        console.log("Seeded Notifications.");
        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedData();
