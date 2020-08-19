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
		.catch(err => console.log(err));
};

exports.postNewContest = (req, res, next) => {
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
		.catch(err => console.log(err));
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
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
};

exports.postNewContestDeleteQuestion = (req, res, next) => {
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
	FinalContest.find({ 'admin.adminId' : req.adminId })
	.then(contest => {
		res.status(200).json({
				message: 'Fetched question successfully!',
				finalcontest: contest
		});
	})
	.catch(err => console.log(err));
}

exports.getUserFinalContest = (req, res, next) => {
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
		.catch(err => console.log(err)); 
	})
	.catch(err => console.log(err));
}

exports.postAllContests = (req, res, next) => {
	const contestId = req.body.contestId;
	FinalContest.findById(contestId)
		.then(contest => {
			const allcontest = new AllContest({
				admin: contest.admin,
				questions: contest.questions,
				participant: contest.participant
			});
			return allcontest.save();
		})
		.then(result => {
			return FinalContest.deleteOne(
				{ _id: contestId },
				function (err) {
					if(err) console.log(err);
					console.log("Successful deletion");
			});
		})
		.catch(err => console.log(err));
}

exports.getAllContests = (req, res, next) => {
	AllContest.find({ 'admin.adminId': req.adminId })
	.then(contests => {
		res.status(200).json({
				message: 'Fetched question successfully!',
				allcontest: contests
		});
	})
	.catch(err => console.log(err));
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
		.catch(err => console.log(err)); 
	})
	.catch(err => console.log(err));
}

exports.getResult = (req, res, next) => {
	const contestId = req.params.contestId;
	AllContest.findById(contestId)
	.then(contest => {
		const participants = contest.participant.users;
		res.status(200).json({
			message: 'Fetched Participant Successfully',
			participants: participants
		});
	})
	.catch(err => console.log(err));
}