const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const finalContestSchema = new Schema({
	questions: [
		{
			questionId: {
				type: Schema.Types.ObjectId,
				ref: 'Question',
				required: true
			}
		}
	],
	admin: {
		name: {
			type: String,
			required: true
		},
		adminId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Admin'
		}
	},
	participant: {
		users: [
			{
				userId: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true
				},
				questions: [
					{
						questionId: {
							type: Schema.Types.ObjectId,
							ref: 'Question',
							required: true
						},
						score: {
							type: Number,
							required: true
						}
					}
				],
				totalScore: {
					type: Number,
					required: true
				}
			}
		]
	}
});

finalContestSchema.methods.addToParticipant = function(id) {
  const participantUserIndex = this.participant.users.findIndex(pu => {
    return pu.userId.toString() === id.toString();
  });
  const updatedParticipantUsers = [...this.participant.users];
  const ques = this.questions.map(i => {
  	return { questionId: i.questionId, score: 0 };
  });

  if(participantUserIndex < 0) {
    updatedParticipantUsers.push({
      userId: id,
      questions: ques,
      totalScore: 0
    });
  }
  const updatedParticipant = {
    users: updatedParticipantUsers
  };
  this.participant = updatedParticipant;
  return this.save();
};

finalContestSchema.methods.addScore = function(uid, qid) {
  const userIndex = this.participant.users.findIndex(pu => {
    return pu.userId.toString() === uid.toString();
  });
  const userQuestionIndex = this.participant.users[userIndex].questions.findIndex(puq => {
    return puq.questionId.toString() === qid.toString();
  });
  const updatedParticipantUsers = [...this.participant.users];

  updatedParticipantUsers[userIndex].questions[userQuestionIndex].score = 100;
  updatedParticipantUsers[userIndex].totalScore = 0;
  updatedParticipantUsers[userIndex].questions.map(i => {
  	updatedParticipantUsers[userIndex].totalScore += i.score;
  });
  const updatedParticipant = {
    users: updatedParticipantUsers
  };
  this.participant = updatedParticipant;
  return this.save();
};

module.exports = mongoose.model('FinalContest', finalContestSchema);