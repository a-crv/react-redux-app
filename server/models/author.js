const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  aboutAuthor: String,
  created: {
    type: Date,
    default: Date.now
  }
}, { collection: 'authors' });

module.exports = mongoose.model('Author', authorSchema);
