const { generateMessageLogin } = require('../Controller/MainController'); 
const { generateMessageSignUp } = require('../Controller/MainController'); 
const express = require('express');
const router = express.Router(); 



router.post("/login", async function (req, res) { // Make the route handler asynchronous
    const { username, password } = req.body; 
    try {
        const data = await generateMessageLogin(username, password); // Wait for the Promise to resolve
        res.json({ message: data });
    } catch (error) {
        console.error("Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/signup", async function (req, res) { // Make the route handler asynchronous
    const { username, password, role } = req.body; 
    try {
        const data = await generateMessageSignUp(username, password, role); // Wait for the Promise to resolve
        res.json({ message: data });
    } catch (error) {
        console.error("Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;