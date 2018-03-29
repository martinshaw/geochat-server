// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const sessionsController = require("../controllers/sessions.js");

// Require set of Before/After middleware filters
const filters = require("../controllers/filters.js");

// Create Express Router
var router = express.Router();

// Define Express routes
router.get('/', filters.requiresSessionKey, sessionsController.getAllSessions);
router.get('/:id([0-9]+)', filters.requiresSessionKey, sessionsController.getSessionById);
router.get('/:key([0-9a-zA-Z|-]*)', filters.requiresSessionKey, sessionsController.getSessionByKey);


module.exports = router;