const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  last_name: {
    type: String,
    require: true,
  },
  email:{
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    uppercase: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  gender:{
    type: String,
    enum: ['male', 'female', 'other'],
  },
  salary: {
    type: Number,
    require: true,
  }
});

const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;