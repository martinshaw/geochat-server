// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const welcomeController = require("./controllers/welcome.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.get('/', welcomeController.get);


module.exports = router;