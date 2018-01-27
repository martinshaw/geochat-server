// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const usersController = require("../controllers/users.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.get('/getAll', usersController.getAll);


module.exports = router;