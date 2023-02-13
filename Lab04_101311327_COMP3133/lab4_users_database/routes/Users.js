const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: [4, "Username must contain minimum 4 characters!"],
  },
  email: {
    type: String,
    require: true,
    match: [/.+\@.+\..+/, "Email must follow your@email.com format!"],
  },
  city: {
    type: String,
    require: true,
    match: [/^[A-Za-z\s]+" "/, "City may only contain letters and spaces!"],
  },
  url: {
    type: String,
    require: true,
    match: [/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/, "Please input valid URL"],
  },
  zipCode: {
    type: String,
    require: true,
    validate: {
      validator: function (v) {
        return /\d{5}-\d{5}/.test(v);
      },
      message: (props) => `${props.value} is not a valid zip code`,
    },
  },
  phone: {
    type: String,
    require: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

const User = mongoose.model("User", usersSchema);
module.exports = User;

