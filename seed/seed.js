require('dotenv').config();
const mongoose = require('mongoose');
const Adopter = require('../models/adopter');
// Creates the EMPTY "adopters" collection (and its unique email index).
// No documents are inserted.
const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const exists = await mongoose.connection.db
            .listCollections({ name: Adopter.collection.name })
            .hasNext();
        if (exists) {
            console.log(`Collection "${Adopter.collection.name}" already exists. Nothing to do.`);
        } else {
            await Adopter.createCollection();
            console.log(`Collection "${Adopter.collection.name}" created (empty).`);
        }
        // Makes sure the unique index on email exists
        await Adopter.syncIndexes();
    } catch (err) {
        console.error('Seed error:', err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};
seed();