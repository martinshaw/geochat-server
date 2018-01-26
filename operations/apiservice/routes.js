// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const welcomeController = require("./controllers/welcome.js");
const authController = require("./controllers/auth.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.get('/', welcomeController.get);

router.get('/auth/signin', authController.signin);


module.exports = router;