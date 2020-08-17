const express = require('express');

const isAuthUser = require('../middleware/is-authUser');
const ideController = require('../controllers/ide');

const router = express.Router();

//POST /ide
router.post('/ide', isAuthUser, ideController.ideResult);

router.post('/ide/input', isAuthUser, ideController.inputFile);

module.exports = router;