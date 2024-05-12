const { connect } = require('../Model/MainModel'); 

async function generateMessageUpdateScore(score, username) {
    try {
      const db = await connect();       
      const usersCollection = db.collection('users');

      const result = await usersCollection.findOneAndUpdate(
        { name: username },
        { $set: { score: score } },
        { returnOriginal: false } // This ensures that the updated document is returned
      );
      return result;
    } catch (error) {
      console.log("Error updating score:", error);
      throw error;
    }
}

async function generateMessageGetQ(){
    try{
        const db = await connect();       
        const usersCollection = db.collection('qbank');

        const resultArray = await usersCollection.find({}).toArray();
        return resultArray;
    }
    catch (error) {
        console.log("Error logging in:", error);
        throw error;
    }

}


module.exports = { generateMessageGetQ ,generateMessageUpdateScore };

// app.post('/question', async (req, res) => {
//     try {
//         // If there are no more questions to ask, return the final score
//         // if (questionsAsked === totalQuestions) {
//         //     return res.json({ message: 'Quiz finished', score: score });
//         // }

//         // // Increment the number of questions asked
//         // questionsAsked++;

//         // // If there are no more questions to ask, return a message
//         // if (questionIds.length === 0) {
//         //     return res.status(404).json({ message: 'No more questions available' });
//         // }

//         // // Get the ID of the next question
//         // const questionId = questionIds.pop();

//         // // Find the question by ID
//         // const question = await db.collection('qbank').findOne({ _id: questionId });

//         // // If the question is not found, return an error message
//         // if (!question) {
//         //     return res.status(404).json({ message: 'Question not found' });
//         // }

//         // // Send the question as a JSON response
//         // res.json(question);
//     } catch (error) {
//         console.error('Error fetching question:', error);
//         res.status(500).json({ message: error.message });
//     }
// });