const request = require('request');

const Question = require('../models/question');
const FinalContest = require('../models/finalcontest');

exports.ideResult = async (req, res) => {
  let { script, language, stdin } = req.body;
  console.log(req.userId);
  let program = {
    script,
    language,
    stdin,
    versionIndex: '2',
    clientId: 'cf4c0271c233d2c0054bc2cbfda4c862',
    clientSecret:
      '2f833880fe11fbf11552243c97065ca567e9a64018544505aaead61d45b0697f'
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
  console.log(req.userId);
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
      clientId: 'cf4c0271c233d2c0054bc2cbfda4c862',
      clientSecret:
        '2f833880fe11fbf11552243c97065ca567e9a64018544505aaead61d45b0697f'
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: 'POST',
        json: program
    },
    function(error, response, body) {
      if(!error) {
        const result = body.output;
        const n = result.localeCompare(stdout);
        if (n === 0) {
          FinalContest.findById('5f3b711257ac832dbc1b337e')
            .then(contest => contest.addScore(req.userId, questionId))
            .catch(err => console.log(err));
          console.log("100 Marks");
          res.send(response).status(200);
        }
        else {
          console.log("Sorry, Try again");
        }
      }
      else {
        console.log(error);
      }
  })
  })
  .catch(err => console.log(err));
}