const express = require('express');

const feedController = require('../controllers/feed');
const isAuthAdmin = require('../middleware/is-authAdmin');

const router = express.Router();

// GET /feed/questions
router.get('/questions', isAuthAdmin, feedController.getQuestions);

// POST /feed/question
router.post('/question', isAuthAdmin, feedController.createQuestion);

router.get('/question/:questionId', feedController.getQuestion);

router.post('/contest', isAuthAdmin, feedController.postContest);

router.get('/contest', isAuthAdmin, feedController.getContest);

router.post('/contest-delete-question', isAuthAdmin, feedController.postContestDeleteQuestion);

router.get('/finalcontest', feedController.getFinalContest);

router.post('/finalcontest', isAuthAdmin, feedController.postFinalContest);

router.get('/finalcontest/questions/:contestId', isAuthAdmin, feedController.getFinalContestQuestions);

router.get('/allcontest', isAuthAdmin, feedController.getAllContest);

router.post('/allcontest', isAuthAdmin, feedController.postAllContest);

router.get('/allcontest/questions/:contestId', isAuthAdmin, feedController.getAllContestquestions);

module.exports = router;