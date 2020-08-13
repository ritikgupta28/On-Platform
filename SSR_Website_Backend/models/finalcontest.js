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
	}
});

finalContestSchema.methods.clearFinalContest = function() {
  this.questions = [];
  this .admin = {};
  return this.save();
}

module.exports = mongoose.model('FinalContest', finalContestSchema);