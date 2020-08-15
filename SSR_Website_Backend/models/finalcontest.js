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
  
  if(participantUserIndex < 0) {
    updatedParticipantUsers.push({
      userId: id,
    });
  }
  const updatedParticipant = {
    users: updatedParticipantUsers
  };
  this.participant = updatedParticipant;
  return this.save();
};

module.exports = mongoose.model('FinalContest', finalContestSchema);