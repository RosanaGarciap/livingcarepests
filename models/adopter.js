const mongoose = require('mongoose');
const adopterSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    // Optional link to the animal this person adopted
    adopted_animal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    },
    adoption_date: {
        type: Date
    }
});
module.exports = mongoose.models.Adopter || mongoose.model('Adopter', adopterSchema, 'adopters');