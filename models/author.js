const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: String,
    lastName: String
  },
  aboutAuthor: String,
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'authors' });

module.exports = mongoose.model('Author', authorSchema);
