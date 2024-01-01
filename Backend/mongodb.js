const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.URI;

//try to connect
mongoose.connect(uri).catch((error) => {
    console.log("Error occurred when connecting", error);
    throw new Error(error);
});

const db = mongoose.connection;


//Handling error after initial connection was made.
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error to handle it in the main application
});

db.once('open', () => {
    console.log('Connected to MongoDB!');
});

async function connectToMongoDB() {
    return db; // Return the Mongoose connection object
}

async function closeMongoDBConnection() {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error; // Re-throw the error to handle it in the main application
    }
}

module.exports = {
    connectToMongoDB,
    closeMongoDBConnection,
    getClient: () => db,
};
