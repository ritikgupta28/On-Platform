const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/questions
router.get('/questions', feedController.getQuestions);

// POST /feed/question
router.post('/question', feedController.createQuestion);

router.get('/question/:questionId', feedController.getQuestion);

router.post('/contest', feedController.postContest);

router.get('/contest', feedController.getContest);

router.post('/contest-delete-question', feedController.postContestDeleteQuestion)

module.exports = router;