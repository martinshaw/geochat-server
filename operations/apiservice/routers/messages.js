// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const messagesController = require("../controllers/messages.js");

// Require set of Before/After middleware filters
const filters = require("../controllers/filters.js");

// Create Express Router
var router = express.Router();	

// Define Express routes
router.get('/', filters.requiresSessionKey, messagesController.getAllMessages);
router.get('/:id([0-9]+)', filters.requiresSessionKey, messagesController.getMessageById);
router.post('/', filters.requiresSessionKey, messagesController.createMessage);


module.exports = router;