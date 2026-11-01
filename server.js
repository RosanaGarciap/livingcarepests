require('dotenv').config(); // Reading env variables must be the first thing to do
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./db_set/connection'); // load the external connection
const app = express();
const port = process.env.PORT || 3000;
// Connects with DB
connectDB();
app.use(cors());
// Receives JSON data
app.use(express.json());
// Home page
app.get('/', (req, res) => {
    res.send("Livingcare pet's webservices dev server");
});
// Show Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect with routes folder
app.use('/animals', require('./routes/index'));
app.use('/adopters', require('./routes/adopters'));
app.listen(port, () => console.log(`server started on port ${port}`));
