const { callPragyaAPI } = require("../services/pragyaApiService");

exports.getDailyQuote = async (req, res) => {
    try {

        const result = await callPragyaAPI("get-daily-quote");

        if (!result.status) {
            return res.status(404).json({
                success: false,
                message: "Quote not found"
            });
        }

        const quote = result.data[0];

        res.json({
            success: true,
            quote: quote.q,
            author: quote.a
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch Daily Quote"
        });

    }
};