const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allContestSchema = new Schema({
	questions: [
	  {
	  	question: { type: Object, required: true },
	  	quantity: { type: Number, required: true }
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

module.exports = mongoose.model('AllContest', allContestSchema);