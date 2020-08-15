const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allContestSchema = new Schema({
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

module.exports = mongoose.model('AllContest', allContestSchema);