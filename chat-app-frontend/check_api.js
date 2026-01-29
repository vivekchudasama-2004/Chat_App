const axios = require('axios');

async function check() {
    try {
        console.log("Fetching users...");
        const response = await axios.get('http://localhost:3001/api/users');
        console.log("Status:", response.status);
        console.log("Users found:", response.data.length);
        console.log("First user:", response.data[0]);
    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) {
            console.log("Response data:", e.response.data);
        }
    }
}

check();
