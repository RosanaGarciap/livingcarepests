const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('db successful connect');
    } catch (err) {
        console.error('Error connecting with MongoDB:', err.message);
        process.exit(1); //  stops process if there is a connection error.
    }
    }

    module.exports = connectDB;
