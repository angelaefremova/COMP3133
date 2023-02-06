const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
  from_user: {
    type: String
  },
  room: {
    type: String
  },
  message: {
    type: String
  },
  date_sent: {
    type: Date
  }
});

const Group = mongoose.model("Group", groupsSchema);
module.exports = Group;