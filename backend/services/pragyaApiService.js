const axios = require("axios");

const BASE_URL = "https://pragya-yog.com/api.php";

const callPragyaAPI = async (action, data = {}) => {
    try {
        const response = await axios.post(BASE_URL, {
            action,
            ...data,
        });

        return response.data;
    } catch (error) {
        console.error("Pragya API Error:", error.message);
        throw error;
    }
};

module.exports = {
    callPragyaAPI,
};