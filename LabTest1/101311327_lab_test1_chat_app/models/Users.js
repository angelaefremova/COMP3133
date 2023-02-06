const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  password: {
    type: String
  },
  createon: {
    type: Date
  }
});

const User = mongoose.model("User", usersSchema);
module.exports = User;