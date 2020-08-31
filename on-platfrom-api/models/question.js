const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    sinput: {
      type: String,
      required: true
    },
    soutput: {
      type: String,
      required: true
    },
    inputfile: {
      type: String,
      required: true
    },
    outputfile: {
      type: String,
      required: true
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);