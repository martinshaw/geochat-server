// Require Node.js modules
const express = require('express');

// Require set of Controller functions
const messagesController = require("../controllers/messages.js");

// Require set of Before/After middleware filters
const filters = require("../controllers/filters.js");

// Create Express Router
var router = express.Router();	

// Define Express routes
router.get('/', filters.requiresSessionKeyInHeader, messagesController.getAllMessages);
router.get('/:id([0-9]+)', filters.requiresSessionKeyInHeader, messagesController.getMessageById);
router.get('/:id([0-9]+)', filters.requiresSessionKeyInHeader, messagesController.getMessageById);
router.get('/user/:key([0-9a-zA-Z|-]*)', filters.requiresSessionKeyInHeader, messagesController.getMessagesByUserSessionKey);
router.delete('/:id([0-9]+)', filters.requiresSessionKeyInHeader, messagesController.deleteMessage);

 
module.exports = router;