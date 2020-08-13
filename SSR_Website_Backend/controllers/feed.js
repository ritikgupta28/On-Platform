const Question = require('../models/question');
const Admin = require('../models/admin');
const FinalContest = require('../models/finalcontest');
const AllContest = require('../models/allcontest');
const ObjectId = require('mongodb').ObjectID;

exports.getQuestions = (req, res, next) => {
  Admin.findById(req.adminId)
    .then(admin => {
      admin.populate('questions')
      .execPopulate()
      .then(admin => {
        const questions = admin.questions;
        res.status(200).json({
          questions: questions
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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
    adminId: req.adminId
  });
  question
    .save()
    .then(result => {
      return Admin.findById(req.adminId)
      .then(admin => {
        admin.questions.push(question);
        return admin.save();
      })
    })
    .then(result => {
      res.status(201).json({
        message: 'Question created successfully!',
        question: question
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
  Question.findById(quesId)
    .then(result => {
      return Admin.findById(req.adminId)
        .then(admin => {
        admin.addToContest(result);
      });
    })
    .then(resData => {
      res.status(201).json({
        message: 'Add question successfully!'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getContest = (req, res, next) => {
  Admin.findById(req.adminId)
    .then(admin => {
      admin.populate('contest.items.questionId')
      .execPopulate()
      .then(admin => {
        const questions = admin.contest.items;
        res.status(200).json({
          questions: questions
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postContestDeleteQuestion = (req, res, next) => {
  const quesId = req.body.questionId;
  Admin.findById(req.adminId)
    .then(admin => {
      admin.removeFromContest(quesId)
      .then(result => {
        res.status(201).json({
          message: 'Remove question successfully!'
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postFinalContest = (req, res, next) => {
  Admin.findById(req.adminId)
  .then(admn => {
    admn.populate('contest.items.questionId')
    .execPopulate()
    .then(admin => {
      const questions = admin.contest.items.map(i => {
        return { questionId: { ...i.questionId } };
      });
      const finalcontest = new FinalContest({
        admin: {
          name: admn.name,
          adminId: req.adminId
        },
        questions: questions
      });
      return finalcontest.save();
    })
    .then(result => {
      return admn.clearContest();
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

exports.getFinalContest = (req, res, next) => {
  FinalContest.find()
  .then(contest => {
    res.status(200).json({
        message: 'Fetched question successfully!',
        finalcontest: contest
    });
  })
  .catch(err => console.log(err));
}

exports.getFinalContestQuestions = (req, res, next) => {
  const contestId = req.params.contestId;
  FinalContest.findById(contestId)
  .then(contest => {
    contest.populate('questions.questionId')
    .execPopulate()
    .then(contest => {
      const questions = contest.questions;
      res.status(200).json({
        message: 'Fetched Contest Questions Successfully',
        questions: questions
      });
    })
    .catch(err => console.log(err)); 
  })
  .catch(err => console.log(err));
}

exports.postAllContest = (req, res, next) => {
  const contestId = req.body.contestId;
  FinalContest.findById(contestId)
  .then(contst => {
    contst.populate('questions.questionId')
    .execPopulate()
    .then(contest => {
      const questions = contest.questions.map(i => {
        return { questionId: { ...i.questionId } };
      });
      const allcontest = new AllContest({
        admin: {
          name: contest.admin.name,
          adminId: contest.admin.adminId
        },
        questions: questions
      });
      return allcontest.save();
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

exports.getAllContest = (req, res, next) => {
  AllContest.find({ 'admin.adminId': req.adminId })
  .then(contests => {
    res.status(200).json({
        message: 'Fetched question successfully!',
        allcontest: contests
    });
  })
  .catch(err => console.log(err));
}

exports.getAllContestquestions = (req, res, next) => {
  const contestId = req.params.contestId;
  AllContest.findById(contestId)
  .then(contest => {
    contest.populate('questions.questionId')
    .execPopulate()
    .then(contest => {
      const questions = contest.questions;
      res.status(200).json({
        message: 'Fetched Contest Questions Successfully',
        questions: questions
      });
    })
    .catch(err => console.log(err)); 
  })
  .catch(err => console.log(err));
}