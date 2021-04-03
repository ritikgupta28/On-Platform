const express = require('express');

const isAuthAdmin = require('../middleware/is-authAdmin')
const isAuthUser = require('../middleware/is-authUser');
const ideController = require('../controllers/ide');

const router = express.Router();

//POST /ide
router.post('/ide/compile', ideController.ideCompile);

router.post('/ide/input', isAuthUser, isAuthAdmin, ideController.inputFile);

router.post('/ide', isAuthUser, isAuthAdmin, ideController.ideResult);

module.exports = router;