const { connect } = require('../Model/MainModel'); 

async function generateMessageGetStud(){
    try{
        const db = await connect();       
        const usersCollection = db.collection('users');

        const resultArray = await usersCollection.find({role: 'student'}).toArray();
        return resultArray;
    }
    catch (error) {
        console.log("Error logging in:", error);
        throw error;
    }

}
module.exports = { generateMessageGetStud };