const mongoose = require('mongoose');

const privateSchema = new mongoose.Schema({
  from_user: {
    type: String
  },
  to_user: {
    type: String
  },
  message: {
    type: String
  },
  date_sent: {
    type: Date
  }
});

const Private = mongoose.model("Private", privateSchema);
module.exports = Private;