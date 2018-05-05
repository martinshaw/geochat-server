// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const usersController = require("../controllers/users.js");

// Require set of Before/After middleware filters
const filters = require("../controllers/filters.js");

// Create Express Router
var router = express.Router();	

// Define Express routes
router.get('/', filters.requiresSessionKeyInHeader, usersController.getAllUsers);
router.get('/:id([0-9]+)', filters.requiresSessionKeyInHeader, usersController.getUserById);


module.exports = router;