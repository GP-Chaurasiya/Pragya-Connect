const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");


// CREATE RESOURCE
router.post("/create", async (req, res) => {
    try {
        const { title, description, file_url, uploaded_by, category } = req.body;

        const resource = new Resource({
            title,
            description,
            file_url,
            uploaded_by,
            category
        });

        await resource.save();

        res.send("Resource Created Successfully");

    } catch (error) {
        console.log(error);
        res.send("Resource Creation Failed");
    }
});


// GET ALL RESOURCES
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find();

        res.json(resources);

    } catch (error) {
        console.log(error);
        res.send("Resources Fetch Failed");
    }
});

module.exports = router;