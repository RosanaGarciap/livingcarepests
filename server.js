require('dotenv').config(); // Reading env variables must be the first thing to do
const express = require('express');
const path = require('path');     
const cors = require('cors');
const auth = require('./middleware/auth');
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

// NEW HOME: (public/index.html en "/", public/catalog.html en "/catalog")
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// Show Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect with routes folder
app.use('/auth', require('./routes/auth'));
app.use('/animals', require('./routes/index'));
app.use('/adopters', require('./routes/adopters'));
app.listen(port, () => console.log(`server started on port ${port}`));
