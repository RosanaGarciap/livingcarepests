const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Crear cuenta
router.post('/register', async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.security = []
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: { email: 'tu@correo.com', password: '123456' }
    } */
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son requeridos' });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        await User.create({ email, password: hash });
        res.status(201).json({ message: 'Cuenta creada' });
    } catch (err) {
        res.status(500).json({ error: 'No se pudo crear la cuenta' });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.security = []
    /* #swagger.parameters['body'] = {
        in: 'body',
        schema: { email: 'tu@correo.com', password: '123456' }
    } */
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;