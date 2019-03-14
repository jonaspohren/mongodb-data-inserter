const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  company: String,
  companySize: Number,
  jobTitle: String,
  updatedAt: Date,
  email: String,
  password: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;