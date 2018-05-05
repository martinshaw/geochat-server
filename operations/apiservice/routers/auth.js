// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const authController = require("../controllers/auth.js");

// Require set of Before/After middleware filters
const filters = require("../controllers/filters.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.post('/register', authController.register);
router.get('/signin', authController.signin);
router.get('/signout', filters.requiresSessionKeyInHeader, authController.signout);


module.exports = router;