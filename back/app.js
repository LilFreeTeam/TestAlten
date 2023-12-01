//Imports
require('dotenv').config();
const cors = require('cors');
var express = require("express");
var app = express();
var mongo = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const PORT = process.env.PORT || 3000;

// Connection DB
mongo.connect(process.env.DB_URL);
const db = mongo.connection;
db.on("error", (error) => console.error(error.message));
db.once("open", () => console.log("Connected to database"));

// Express
app.use(express.json());
// CORS
app.use(cors());

// Swagger doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Product Router
const productsRouter = require('./routes/products');
app.use('/', productsRouter);

// Running server
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});