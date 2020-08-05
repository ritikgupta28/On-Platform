const Question = require('../models/question');

exports.getQuestions = (req, res, next) => {
  Question.find()
    .then(result => {
      res.status(201).json({
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
    soutput: soutput
  });
  question
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};