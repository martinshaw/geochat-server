// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const authController = require("../controllers/auth.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.post('/signin', authController.signin);


module.exports = router;