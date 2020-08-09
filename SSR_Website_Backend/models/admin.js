const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contest: {
    items: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

adminSchema.methods.addToContest = function(question) {
  const contestQuestionIndex = this.contest.items.findIndex(cq => {
    return cq.questionId.toString() === question._id.toString();
  });
  let newQuantity = 1;
  const updatedContestItems = [...this.contest.items];

  if(contestQuestionIndex >= 0) {
    newQuantity = this.contest.items[contestQuestionIndex].quantity + 1;
    updatedContestItems[contestQuestionIndex].quantity = newQuantity;
  }
  else {
    updatedContestItems.push({
      questionId: question._id,
      quantity: newQuantity
    });
  }
  const updatedContest = {
    items: updatedContestItems
  };
  this.contest = updatedContest;
  return this.save();
};

adminSchema.methods.removeFromContest = function(questionId) {
  const updatedContestItems = this.contest.items.filter(item => {
    return item.questionId.toString() !== questionId.toString();
  });
  this.contest.items = updatedContestItems;
  return this.save();
};

module.exports = mongoose.model('Admin', adminSchema);