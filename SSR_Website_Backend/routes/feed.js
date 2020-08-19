const express = require('express');

const feedController = require('../controllers/feed');
const isAuthAdmin = require('../middleware/is-authAdmin');
const isAuthUser = require('../middleware/is-authUser');

const router = express.Router();

// GET /feed/questions
router.get('/questions', isAuthAdmin, feedController.getQuestions);

// POST /feed/question
router.post('/question', isAuthAdmin, feedController.createQuestion);

router.get('/question/:questionId', feedController.getQuestion);

router.post('/newcontest', isAuthAdmin, feedController.postNewContest);

router.get('/newcontest', isAuthAdmin, feedController.getNewContest);

router.post('/newcontest-delete-question', isAuthAdmin, feedController.postNewContestDeleteQuestion);

router.get('/finalcontest', isAuthAdmin, feedController.getFinalContest);

router.get('/userfinalcontest', isAuthUser, feedController.getUserFinalContest);

router.post('/finalcontest', isAuthAdmin, feedController.postFinalContest);

router.get('/finalcontest/questions/:contestId', isAuthAdmin, feedController.getFinalContestQuestions);

router.get('/userfinalcontest/questions/:contestId', isAuthUser, feedController.getUserFinalContestQuestions);

router.get('/allcontests', isAuthAdmin, feedController.getAllContests);

router.post('/allcontests', isAuthAdmin, feedController.postAllContests);

router.get('/allcontests/questions/:contestId', isAuthAdmin, feedController.getAllContestsQuestions);

router.get('/result/:contestId', isAuthAdmin, feedController.getResult);

module.exports = router;