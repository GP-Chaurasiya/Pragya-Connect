const express = require("express");
const router = express.Router();

const {
    getDailyQuote,
} = require("../controllers/dashboardController");

router.get("/quote", getDailyQuote);

module.exports = router;