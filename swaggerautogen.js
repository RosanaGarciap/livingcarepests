const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Animals API',
        description: 'Animals manager API',
    },
    host: 'livingcarepests.onrender.com',
    schemes: ['https', 'http'],
definitions: {
        Animal: {
            name:"Charming",
            species:"Dog",
            breed_primary:"American Staffordshire Terrier",
            age: 2,
            sex:"Male",
            accessed:"2019-09-20"
        }
    }
};
const outputFile = './swagger.json';
// ponts to the path where all routes to GET, POST, PUT and DELETE are listed (routes/contacts.js in this case)
const endpointFiles = ['./server.js']; 

swaggerAutogen(outputFile, endpointFiles, doc);