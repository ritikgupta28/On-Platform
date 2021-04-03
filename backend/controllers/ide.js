const request = require('request');

const Question = require('../models/question');
const FinalContest = require('../models/finalcontest');

exports.ideResult = async (req, res, next) => {
  const questionId = req.body.questionId;
  FinalContest.find()
    .then(fContest => {
      fContest.map(contest => {
        contest.addCode(req.userId, questionId, req.body.script)
      })
    })
    .catch(err => console.log(err));
  let { script, language, stdin } = req.body;
  let program = {
    script,
    language,
    stdin,
    versionIndex: '2',
    clientId: process.env.IDE_clientId,
    clientSecret: process.env.IDE_clientSecret
  };
  request({
      url: 'https://api.jdoodle.com/v1/execute',
      method: 'POST',
      json: program
    },
    function(error, response, body) {
      if(!error) {
        res.send(response).status(200);
      }
      else {
        res.send(error).status(404);
      }
    }
  );
}

exports.ideCompile = async (req, res, next) => {
  let { script, language, stdin } = req.body;
  let program = {
    script,
    language,
    stdin,
    versionIndex: '2',
    clientId: process.env.IDE_clientId,
    clientSecret: process.env.IDE_clientSecret
  };
  request({
      url: 'https://api.jdoodle.com/v1/execute',
      method: 'POST',
      json: program
    },
    function(error, response, body) {
      if(!error) {
        res.send(response).status(200);
      }
      else {
        res.send(error).status(404);
      }
    }
  );
}

exports.inputFile = async (req, res) => {
  const questionId = req.body.questionId;
  FinalContest.find()
    .then(fContest => {
      fContest.map(contest => {
        contest.addCode(req.userId, questionId, req.body.script)
      })
    })
    .catch(err => console.log(err));
  Question.findById(questionId)
  .then(question => {
    let stdin = question.inputfile;
    let stdout = question.outputfile;
    let { script, language } = req.body;
    let program = {
      script,
      language,
      stdin,
      versionIndex: '2',
      clientId: process.env.IDE_clientId,
      clientSecret: process.env.IDE_clientSecret
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: 'POST',
        json: program
    },
    function(error, response, body) {
      if(!error) {
        const result = body.output;
        const n = stdout.localeCompare(result);
        if (n === 0) {
          FinalContest.find()
            .then(fContest => {
              fContest.map(contest => {
                return contest.addScore(req.userId, questionId)
              })
            })
            .then(r => {
              console.log("100 Marks");
              body.output = 'Correct Answer';
              res.send(response).status(200);
            })
            .catch(err => console.log(err));
        }
        else {
          console.log("Sorry, Try again");
          body.output = 'Wrong Answer';
          res.send(response).status(200);
        }
      }
      else {
        console.log(error);
        res.send(error).status(200);
      }
  })
  })
  .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}