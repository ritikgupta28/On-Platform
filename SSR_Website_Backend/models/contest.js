const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestSchema = new Schema({
  questions: [
    {
      question: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Contest', orderContest);