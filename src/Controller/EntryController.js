const { connect } = require('../Model/MainModel'); 
async function generateMessageLogin(name, password){
    try{
        const db = await connect();       
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ name }); 
        if (!user) return 'user not present';       
        if (user.password !== password) return 'pwd is wrong'; 
        return user.role;
    }
    catch (error) {
        console.log("Error logging in:", error);
        throw error;
    }

}

async function generateMessageSignUp(name, password, role) {
    try {
      const db = await connect();
      const usersCollection = db.collection('users');

      const existingUser = await usersCollection.findOne({ name });
  
      if (existingUser) return 'Name already exists. Please choose a different name.';
      const result = await usersCollection.insertOne({ name, password, role }); // Assuming password hashing is done elsewhere

      return 'success';
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;  // Re-throw for further handling (e.g., logging, error response)
    }
  }
  

module.exports = { generateMessageSignUp, generateMessageLogin };