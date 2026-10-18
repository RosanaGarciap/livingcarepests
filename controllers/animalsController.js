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
    accessed:{
        type: Date
    }
});

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

exports.getAnimalById = async (req,res) =>{
    try {
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
        const newAnimal = new Animal({
            name: req.body.name,
            species: req.body.species,
            breed_primary: req.body.breed_primary,
            age: req.body.age,
            sex: req.body.sex,
            accessed: req.body.accessed
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
        const updateData = {
            name: req.body.name,
            species: req.body.species,
            breed_primary: req.body.breed_primary,
            age: req.body.age,
            sex: req.body.sex,
            accessed: req.body.accessed
        };

        const result = await Animal.findByIdAndUpdate(animalId, updateData);
        if (!result) {
            return res.status(404).json({error: 'Animal not found'});
        }

        //Return status 204
        return res.status(204).send();
    } catch (error){
       return res.status(400).json({error: error.message});
    }
};

//DELETE: Delete a animal with ID
exports.deleteAnimal = async (req,res)=>{
    try {
       const animalId = req.params.id;
       const result = await Animal.findByIdAndDelete(animalId);
       
       if (!result) {
        return res.status(404).json({error: "Animal not found"})
       }
    return res.status(200).json({error: "Animal deleted successfully"})

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}