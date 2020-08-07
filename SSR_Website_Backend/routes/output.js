const express = require('express');

const outputController = require('../controllers/output');

const router = express.Router();

//POST /ide
router.post('/ide', outputController.ideResult);

module.exports = router;