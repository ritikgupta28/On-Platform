const express = require('express');

const ideController = require('../controllers/ide');

const router = express.Router();

//POST /ide
router.post('/ide', ideController.ideResult);

router.post('/ide/input', ideController.inputFile);

module.exports = router;