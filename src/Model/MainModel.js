const { MongoClient } = require('mongodb');
 const uri = "mongodb://localhost:27017";
const dbName = "IP-QuizApp"; 
async function connect() {
  try {
    const client = new MongoClient(uri);
    await client.connect(); 
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log('out with error');
    throw error;
  }  
} 
module.exports = { connect };
