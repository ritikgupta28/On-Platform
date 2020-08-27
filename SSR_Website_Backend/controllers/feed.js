const Question = require('../models/question');
const Admin = require('../models/admin');
const FinalContest = require('../models/finalcontest');
const AllContest = require('../models/allcontest');
const ObjectId = require('mongodb').ObjectID;

exports.getQuestions = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 4;
  let totalQuestions;
	Admin.findById(req.adminId)
		.then(admin => {
			admin.populate('questions')
			.execPopulate()
			.then(admin => {
				const questions = admin.sliceQuestions(currentPage, perPage);
				const totalQuestions = admin.totalQuestions;
				res.status(200).json({
					message: 'Fetched questions successfully.',
					questions: questions,
					totalQuestions: totalQuestions
				});
			})
			.catch(err => {
      next(err);
    });
		})
		.catch(err => {
      next(err);
    });
};

exports.createQuestion = (req, res, next) => {
	const { title, content, sinput, soutput, inputfile, outputfile } = req.body;
	const question = new Question({
		title: title,
		content: content,
		sinput: sinput,
		soutput: soutput,
		inputfile: inputfile,
		outputfile: outputfile,
		adminId: req.adminId
	});
	question
		.save()
		.then(result => {
			return Admin.findById(req.adminId)
			.then(admin => {
				admin.totalQuestions++;
				admin.questions.push(question);
				return admin.save();
			})
		})
		.then(result => {
			res.status(200).json({
				message: 'Question created successfully!',
				question: question
			});
		})
		.catch(err => {
      next(err);
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
      next(err);
    });
};

exports.postNewContest = (req, res, next) => {
	const quesId = req.body.questionId;
	Question.findById(quesId)
		.then(result => {
			return Admin.findById(req.adminId)
				.then(admin => {
				  admin.addToContest(result);
			   })
			   .catch(err => console.log(err));
		})
		.then(resData => {
			res.status(200).json({
				message: 'Add question successfully!'
			});
		})
		.catch(err => {
      next(err);
    });
};

exports.getNewContest = (req, res, next) => {
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
			.catch(err => {
				next(err);
			});
		})
		.catch(err => {
			next(err);
		});
};

exports.postNewContestDeleteQuestion = (req, res, next) => {
	const quesId = req.body.questionId;
	Admin.findById(req.adminId)
		.then(admin => {
			admin.removeFromContest(quesId)
			.then(result => {
				res.status(200).json({
					message: 'Remove question successfully!'
				});
			})
			.catch(err => {
				next(err);
			});
		})
		.catch(err => {
			next(err);
		});
};

exports.postFinalContest = (req, res, next) => {
	const cName = req.body.cName;
	if(!cName) {
		const error = new Error('Enter a valid contest name!');
	 	error.statusCode = 400;
	 	error.data = 'Enter a valid contest name!';
	 	throw error;
	}
	Admin.findById(req.adminId)
	.then(admn => {
		admn.populate('contest.items.questionId')
		.execPopulate()
		.then(admin => {
			const questions = admin.contest.items.map(i => {
				return { questionId: { ...i.questionId } };
			});
			if(!questions.length) {
				const error = new Error('Please add questions!');
		 		error.statusCode = 400;
	 			error.data = 'Please add questions!';
	 			throw error;
			}
			const finalcontest = new FinalContest({
				admin: {
					name: admn.name,
					adminId: req.adminId
				},
				contestName: cName,
				questions: questions
			});
			return finalcontest.save();
		})
		.then(result => {
			res.status(200).json({
				message: 'successfully'
			})
			return admn.clearContest();
		})
		.catch(err => {
      next(err);
    });
	})
	.catch(err => {
      next(err);
    });
}

exports.getFinalContest = (req, res, next) => {
	FinalContest.find({ 'admin.adminId' : req.adminId })
	.then(contests => {
		res.status(200).json({
				message: 'Fetched question successfully!',
				finalcontest: contests
		});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Faild to fetch contests'
    next(error);
  });
}

exports.getUserFinalContest = (req, res, next) => {
	FinalContest.find()
	.then(contest => {
		res.status(200).json({
			message: 'Fetched question successfully!',
			finalcontest: contest
		});
	})
	.catch(err => {
      next(err);
    });
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
		.catch(err => {
			const error = new Error;
			error.message = 'Faild to fetch contest questions'
      next(error);
    });
	})
	.catch(err => {
		  const error = new Error;
			error.message = 'Faild to fetch contest'
      next(error);
    });
}

exports.getUserFinalContestQuestions = (req, res, next) => {
	const contestId = req.params.contestId;
	req.contestId = contestId;
	FinalContest.findById(contestId)
	.then(contest => {
		contest.addToParticipant(req.userId);
		contest.populate('questions.questionId')
		.execPopulate()
		.then(contest => {
			const questions = contest.questions;
			res.status(200).json({
				message: 'Fetched Contest Questions Successfully',
				questions: questions
			});
		})
		.catch(err => {
      next(err);
    });
	})
	.catch(err => {
      next(err);
    });
}

exports.getAllContests = (req, res, next) => {
	AllContest.find({ 'admin.adminId': req.adminId })
	.then(contests => {
		res.status(200).json({
				message: 'Fetched question successfully!',
				allcontest: contests
		});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Faild to fetch all contest';
    next(error);
  });
}

exports.postAllContests = (req, res, next) => {
	const contestId = req.body.contestId;
	FinalContest.findById(contestId)
		.then(contest => {
			contest.sortUsers();
			const allcontest = new AllContest({
				admin: contest.admin,
				questions: contest.questions,
				contestName: contest.contestName,
				participant: contest.participant
			});
			return allcontest.save();
		})
		.then(result => {
			FinalContest
			.deleteOne({ _id: contestId })
			.then(function(){ 
			   res.status(200).json({
			   	message: 'Contest deleted'
			   }) 
			 })
			.catch(function(err){ 
				const error = new Error;
			  error.message = 'faild to delete contest'
        next(error);
			}); 
		})
		.catch(err => {
			const error = new Error;
			error.message = 'faild to find contest'
      next(error);
    });
}

exports.getAllContestsQuestions = (req, res, next) => {
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
		.catch(err => {
			const error = new Error;
			error.message = 'Faild to fetch all contest questions'
      next(error);
    });
	})
	.catch(err => {
      const error = new Error;
			error.message = 'Faild to fetch Admin';
			error.statusCode = 400;
      next(error);
    });
}

exports.getResult = (req, res, next) => {
	const contestId = req.params.contestId;
	AllContest.findById(contestId)
	.then(contest => {
		contest.populate('participant.users.userId')
		.execPopulate()
		.then(contest => {
			const participants = contest.participant.users;
			res.status(200).json({
				message: 'Fetched Participant Successfully',
				participants: participants
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to fetch participants'
			next(error);
		})
	})
	.catch(err => {
	    const error = new Error;
			error.message = 'Failed to fetch result' 
      next(error);
    });
}