const Joi = require('joi');

const mongoose = require('mongoose');

//Schema with required information fields

const animalSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed_primary: {
        type: String,
        required: true        
    },
    age:{
        type: Number
    },
    sex:{
        type: String
    },
    accessed:{
        type: Date
    }
});

// 2. Scheme JOI (Estructura de la solicitud HTTP)
//This declaration  is used to validate the data sent in the request body when creating or updating an animal. 
// It ensures that the required fields are present and meet the specified criteria before proceeding with database oparations. 
// If the validation fails, an error response is sent back to the client, preventing invalid data from being stored in the database.

// This also is considered a POST validation.
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        species: Joi.string().min(2).required(),
        breed_primary: Joi.string().min(6).required(),
        age: Joi.number().allow(null).default(null),
        sex: Joi.string().valid('Female', 'Male', 'female', 'male').required(),
        accessed: Joi.date().default(Date.now)
    });
    return schema.validate(data);
};

// JOI and MONGOOSE Models
const Animal = mongoose.models.Animal || mongoose.model('Animal', animalSchema,'animals');

//GET: Request all animals or one by ID
exports.getAnimals = async (req, res) => {
    try {
        // If there is no id returns the whole list
        const animals = await Animal.find();
        return res.status(200).json(animals);
    } catch (error) {
        //Internal server error
        res.status(500).json({error: error.message});
    }
}


const idValidation = (id) => {
    const schema = Joi.string().hex().length(24).required();
    return schema.validate(id);
};


exports.getAnimalById = async (req,res) =>{
    try {
        const { error } = idValidation(req.params.id);
        if (error) {
            return res.status(400).json({error: 'Invalid ID format'});
        }

        //if URL contains id parameter then
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({error: 'The animal doesn\'t exist'});
        }
        return res.status(200).json(animal);        
    } catch (error) {
    //Internal server error
    res.status(500).json({error: error.message});        
    }
}


//POST: Create NEW Animal

exports.createAnimal = async (req,res) => {
    try {

        //VALIDATION WITH JOI
        const { error,value } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        //
        const newAnimal = new Animal({
            name: value.name,
            species: value.species,
            breed_primary: value.breed_primary,
            age: value.age,
            sex: value.sex,
            accessed: value.accessed
        });
        const savedAnimal = await newAnimal.save();
        // returns ID and code 201 for new record added
        return res.status(201).json({id:savedAnimal._id});
    } catch (error){
       return res.status(400).json({error: error.message});
    }
}

//PUT: UPDATE Animal
exports.updateAnimal = async (req,res) => {
    try {
        const animalId = req.params.id;

        const idCheck = idValidation(animalId);

        if(idCheck.error){
            return res.status(400).json({error: 'Invalid ID format'});
        }

        const { error, value } = updateValidation(req.body);
        if (error) {
            return res.status(400).json({error: error.details[0].message});
        }

        const updateData = {
            name: value.name,
            species: value.species,
            breed_primary: value.breed_primary,
            age: value.age,
            sex: value.sex,
            accessed: value.accessed
        };

        const result = await Animal.findByIdAndUpdate(animalId, updateData, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({error: 'Animal not found'});
        }

        //Return status 204
        return res.status(204).send();
    } catch (error){
       return res.status(400).json({error: error.message});
    }
};

//UPDATE VALIDATION
const updateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).optional(),
        species: Joi.string().min(2).optional(),
        breed_primary: Joi.string().min(6).optional(),
        age: Joi.number().allow(null).optional(),
        sex: Joi.string().valid('Female', 'Male').uppercase().optional(),
        accessed: Joi.date().optional()
    }).min(1); // At least one field must be provided.
    return schema.validate(data);
}

//DELETE: Delete a animal with ID
exports.deleteAnimal = async (req,res)=>{
    try {
       const animalId = req.params.id;
       const {error} = idValidation(animalId);
       if (error) {
        return res.status(400).json({error: 'Invalid ID format'});
       }

       const result = await Animal.findByIdAndDelete(animalId);
       
       if (!result) {
        return res.status(404).json({error: "The Animal selected is not in the record"})
       }
    return res.status(200).json({error: "Animal deleted successfully"})

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}