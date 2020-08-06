const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/questions
router.get('/questions', feedController.getQuestions);

// POST /feed/question
router.post('/question', feedController.createQuestion);

router.get('/question/:questionId', feedController.getQuestion);

module.exports = router;