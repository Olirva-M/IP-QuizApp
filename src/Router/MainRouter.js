const { generateMessageUpdateScore } = require('../Controller/QuizController');
const { generateMessageGetQ } = require('../Controller/QuizController');

const { generateMessageGetStud } = require('../Controller/StudentsDataController'); 

const { generateMessageLogin } = require('../Controller/EntryController'); 
const { generateMessageSignUp } = require('../Controller/EntryController'); 

const express = require('express');
const router = express.Router(); 

router.post("/updatescore", async function (req, res){
    const {score, username} = req.body;
    console.log('mainrouter:', score, username);
    try{
        const data = await generateMessageUpdateScore(score, username); // Wait for the Promise to resolve
        res.json({message: data});
    } catch (error) {
        console.error("Mainrouter: Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/question", async function (req, res){
    try{
        const data = await generateMessageGetQ(); // Wait for the Promise to resolve
        res.json(data);
    } catch (error) {
        console.error("Mainrouter: Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/getstud", async function (req, res){
    try{
        const data = await generateMessageGetStud(); // Wait for the Promise to resolve
        res.json(data);
    } catch (error) {
        console.error("Error generating message:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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