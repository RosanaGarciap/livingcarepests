const Joi = require('joi');
const Adopter = require('../models/adopter');
// Joi validations
const idValidation = (id) => {
    return Joi.string().hex().length(24).required().validate(id);
};
const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().optional(),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        adopted_animal_id: Joi.string().hex().length(24).optional(),
        adoption_date: Joi.date().optional()
    });
    return schema.validate(data);
};

const updateValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2),
        last_name: Joi.string().min(2),
        email: Joi.string().email(),
        phone: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        adopted_animal_id: Joi.string().hex().length(24),
        adoption_date: Joi.date()
    }).min(1); // At least one field must be provided
    return schema.validate(data);
};
// GET: all adopters
exports.getAdopters = async (req, res) => {
    try {
        const adopters = await Adopter.find();
        return res.status(200).json(adopters);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// GET: one adopter by ID
exports.getAdopterById = async (req, res) => {
    try {
        const { error } = idValidation(req.params.id);
        if (error) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const adopter = await Adopter.findById(req.params.id);
        if (!adopter) {
            return res.status(404).json({ error: "The adopter doesn't exist" });
        }
        return res.status(200).json(adopter);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// POST: create adopter
exports.createAdopter = async (req, res) => {
    try {
        const { error, value } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const savedAdopter = await new Adopter(value).save();
        return res.status(201).json({ id: savedAdopter._id });
    } catch (error) {
        // 11000 = duplicate key (email already registered)
        if (error.code === 11000) {
            return res.status(409).json({ error: 'This email is already registered' });
        }
        return res.status(400).json({ error: error.message });
    }
};
// PUT: update adopter
exports.updateAdopter = async (req, res) => {
    try {
        const idCheck = idValidation(req.params.id);
                if (idCheck.error) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const { error, value } = updateValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const result = await Adopter.findByIdAndUpdate(req.params.id, value);
        if (!result) {
            return res.status(404).json({ error: 'Adopter not found' });
        }
        return res.status(204).send();
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'This email is already registered' });
        }
        return res.status(400).json({ error: error.message });
    }
};
// DELETE: delete adopter
exports.deleteAdopter = async (req, res) => {
    try {
        const { error } = idValidation(req.params.id);
        if (error) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const result = await Adopter.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'The adopter selected is not in the record' });
        }
        return res.status(200).json({ message: 'Adopter deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};