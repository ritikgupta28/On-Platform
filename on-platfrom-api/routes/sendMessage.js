const express = require('express');
const sendMessageController = require('../controllers/sendMessage');
const router = express.Router();

router.post('/sendMessage',sendMessageController.sendMessage);

module.exports = router;