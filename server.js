
require('dotenv').config() // Reading env variables must be the fisrt thing to do
//IMPORT Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
const app = express();
const cors = require('cors'); // 1. Importa cors
app.use(cors());
const connectDB = require('./db_set/connection'); //load  the external connection


//Connects with DB 
connectDB();

//Receives JSON data
app.use(express.json({extended : false}));

//Default PORT
const port = process.env.PORT || 3000;

//Connect with routes folder
app.use('/animals', require('./routes/index'));
//Home page
app.get('/', (req,res) =>{
    res.send("Livingcare pet's webservices dev server");
}
);
app.listen(port, () => console.log(`server started on port ${port}`));

// Show Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
