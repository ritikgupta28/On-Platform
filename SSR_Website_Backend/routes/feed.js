const express = require('express');

const feedController = require('../controllers/feed');
const isAuthAdmin = require('../middleware/is-authAdmin');

const router = express.Router();

// GET /feed/questions
router.get('/questions', isAuthAdmin, feedController.getQuestions);

// POST /feed/question
router.post('/question', isAuthAdmin, feedController.createQuestion);

router.get('/question/:questionId', isAuthAdmin, feedController.getQuestion);

router.post('/contest', isAuthAdmin, feedController.postContest);

router.get('/contest', isAuthAdmin, feedController.getContest);

router.post('/contest-delete-question', isAuthAdmin, feedController.postContestDeleteQuestion)

module.exports = router;