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
        		const error = new Error;
        		error.message = 'Failed to fetch questions'
        		next(error);
        	});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Admin not found'
			next(error);
		});
};

exports.createQuestion = (req, res, next) => {
	const { title, content, sinput, soutput, inputfile, outputfile } = req.body;
	if(!title || !content || !sinput || !soutput || !inputfile || !outputfile) {
		const error = new Error;
		error.message = 'Enter valid credentials!'
    	next(error);
	}
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
			 return Admin.findById(req.adminId).then(admin => {
				admin.totalQuestions++;
				admin.questions.push(question);
				return admin.save();
			})
		})
		.then(result => {
				res.status(200).json({
				message: 'Question created successfully!'
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to add question'
			next(error);
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
      const error = new Error;
			error.message = 'Failed to fetch question'
      next(error);
    });
};

exports.postNewContest = (req, res, next) => {
	const quesId = req.body.questionId;
	Question.findById(quesId)
		.then(result => {
			return Admin.findById(req.adminId)
				.then(admin => {
				  return admin.addToContest(result);
			  })
		})
		.then(resData => {
			res.status(200).json({
				message: 'Add question successfully!'
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to add question';
      next(error);
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
					message: 'successfully',
					questions: questions
				});
			})
			.catch(err => {
				const error = new Error;
				error.message = 'Failed to fetch question';
				next(error);
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to find admin';
			next(error);
		});
};

exports.postNewContestDeleteQuestion = (req, res, next) => {
	const quesId = req.body.questionId;
	Admin.findById(req.adminId)
		.then(admin => {
			admin.removeFromContest(quesId)
			.then(result => {
				res.status(200).json({
					message: 'Remove question successfully!',
				});
			})
			.catch(err => {
				const error = new Error;
				error.message = 'failed to remove question';
				next(error);
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to find admin';
			next(error);
		});
};

exports.postFinalContest = (req, res, next) => {
	const cName = req.body.cName;
	const csdate = req.body.csdate;
	const cstime = req.body.cstime;
	const cedate = req.body.cedate;
	const cetime = req.body.cetime;
	if(!cName || !csdate || !cstime || !cedate || !cetime) {
		const error = new Error;
		error.message = 'Enter valid credentials!';
	 	error.statusCode = 400;
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
				const error = new Error;
		 		error.statusCode = 400;
	 			error.message = 'Please add questions!';
	 			throw error;
			}
			const finalcontest = new FinalContest({
				admin: {
					name: admn.name,
					adminId: req.adminId
				},
				contestName: cName,
				contestStartDate: csdate,
				contestStartTime: cstime,
				contestEndDate: cedate,
				contestEndTime: cetime,
				questions: questions
			});
			return finalcontest.save();
		})
		.then(result => {
			res.status(200).json({
				message: 'Successfully added'
			})
			return admn.clearContest();
		})
		.catch(err => {
	 		const error = new Error;
	 		error.message = 'Failed to add contest';
	 		next(error);
	 	});
	})
	.catch(err => {
	 	const error = new Error;
		error.message = 'Failed to fetch admin';
		next(error);
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
		error.message = 'Failed to fetch contests';
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
		const error = new Error;
		error.message = 'Failed to fetch contests'
		next(error);
	});
}

exports.getUserFinalContestRegistration = (req, res, next) => {
	const contestId = req.params.contestId;
	req.contestId = contestId;
	FinalContest.findById(contestId)
	.then(contest => {
		contest.addToParticipant(req.userId);
		res.status(200).json({
			message: 'Registeration Successfully!',
		});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Registeration Unuccessfull';
		next(error);
  });
}

exports.getFinalContestQuestions = (req, res, next) => {
	const contestId = req.params.contestId;
	FinalContest.findById(contestId)
	.then(contest => {
		contest.populate('questions.questionId')
		.execPopulate()
		.then(contest => {
			const ceDate = contest.contestEndDate;
			const ceTime = contest.contestEndTime;
			const questions = contest.questions;
			res.status(200).json({
				message: 'Fetched Contest Questions Successfully',
				ceDate: ceDate,
				ceTime: ceTime,
				questions: questions
			});
		})
		.catch(err => {
    		const error = new Error;
    		error.message = 'Failed to fetch questions';
    		next(error);
    	});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Failed to fetch contest'
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
			const ceDate = contest.contestEndDate;
			const ceTime = contest.contestEndTime;
			const questions = contest.questions;
			res.status(200).json({
				message: 'Fetched Contest Questions Successfully',
				ceDate: ceDate,
				ceTime: ceTime,
				questions: questions
			});
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to fetch contest questions';
			next(error);
		});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Failed to fetch contest';
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
				contestStartDate: contest.contestStartDate,
				contestStartTime: contest.contestStartTime,
				contestEndDate: contest.contestEndDate,
				contestEndTime: contest.contestEndTime,
				participant: contest.participant
			});
			return allcontest.save();
		})
		.then(result => {
			FinalContest
			.deleteOne({ _id: contestId })
			.then(function() { 
				res.status(200).json({
					message: 'Contest Deleted!'
				}) 
			})
			.catch(function(err) { 
				const error = new Error;
				error.message = 'Failed to delete contest!'
				next(error);
			}); 
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed!'
			next(error);
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
		error.message = 'Failed to fetch all contest';
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
			error.message = 'Failed to fetch all contest questions';
			next(error);
		});
	})
	.catch(err => {
		const error = new Error;
		error.message = 'Failed to fetch Contest';
		error.statusCode = 400;
		next(error);
    });
}

exports.getResult = (req, res, next) => {
	const contestId = req.params.contestId;
	AllContest.findById(contestId)
	.then(contest => {
		contest.populate('participant.users.questions.questionId')
		.execPopulate()
		.then(contest => {
			contest.populate('participant.users.userId')
			.execPopulate()
			.then(contest => {
				const participants = contest.participant.users;
				res.status(200).json({
					message: 'Fetched Participant Successfully',
					participants: participants,
					count: contest.participant.users.length
				});
			})
		})
		.catch(err => {
			const error = new Error;
			error.message = 'Failed to fetch participants';
			next(error);
		})
	})
	.catch(err => {
	    const error = new Error;
		error.message = 'Failed to fetch result';
		next(error);
    });
}