// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const sessionsController = require("../controllers/sessions.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.get('/', sessionsController.getAllSessions);
router.get('/:id([0-9]+)', sessionsController.getSessionById);
router.get('/:key([0-9a-zA-Z|-]*)', sessionsController.getSessionByKey);


module.exports = router;