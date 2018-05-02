const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  text: String,
  status: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'notes' });

module.exports = mongoose.model('Note', noteSchema);
