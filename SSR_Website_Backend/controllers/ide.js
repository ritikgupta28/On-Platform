const request = require('request');
const Question = require('../models/question');

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

exports.inputFile = (req, res, next) => {
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
          console.log("100 Marks");
          res.send(response).status(200);
        }
        else {
          console.log("Sorry, Try again");
          res.send(error).status(200)
        }      }
      else {
        console.log(error);
        res.send(error).status(200);
      }
    }
  );
  })
  .catch(err => console.log(err));
}