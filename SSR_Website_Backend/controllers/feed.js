const Question = require('../models/question');
const Admin = require('../models/admin');
const ObjectId = require('mongodb').ObjectID;

exports.getQuestions = (req, res, next) => {
  Question.find()
    .then(result => {
      res.status(200).json({
        message: 'Fetched questions successfully!',
        questions: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createQuestion = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const sinput = req.body.sinput;
  const soutput = req.body.soutput;
  const question = new Question({
    title: title,
    content: content,
    sinput: sinput,
    soutput: soutput,
    adminId: req.admin
  });
  question
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Question created successfully!',
        post: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getQuestion = (req, res, next) => {
  const questionId = req.params.questionId;
  Question.findById(questionId)
    .then(result => {
      res.status(200).json({
        message: 'Fetched question successfully!',
        question: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postContest = (req, res, next) => {
  const quesId = req.body.questionId;
  const qId = ObjectId(quesId);
  Question.findById(qId)
    .then(result => {
      return req.admin.addToContest(result);
    })
    .then(resData => {
      console.log(resData);
      res.status(201).json({
        message: 'Add question successfully!'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getContest = (req, res, next) => {
  req.admin
    .populate('contest.items.questionId')
    .execPopulate()
    .then(admin => {
      const questions = admin.contest.items;
      res.status(200).json({
        questions: questions
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postContestDeleteQuestion = (req, res, next) => {
  const quesId = req.body.questionId;
  const qId = ObjectId(quesId);
  req.admin
    .removeFromContest(qId)
    .then(result => {
      res.status(201).json({
        message: 'Remove question successfully!'
      })
    })
    .catch(err => {
      console.log(err)
    });
};