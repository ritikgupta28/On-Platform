const express = require('express');

const isAuthAdmin = require('../middleware/is-authAdmin')
const isAuthUser = require('../middleware/is-authUser');
const ideController = require('../controllers/ide');

const router = express.Router();

//POST /ide
router.post('/ide', isAuthUser, isAuthAdmin, ideController.ideResult);

router.post('/ide/input', isAuthUser, isAuthAdmin, ideController.inputFile);

module.exports = router;