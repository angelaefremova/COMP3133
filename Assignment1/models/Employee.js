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
  },
  gender:{
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  }
});

const Employee = mongoose.model("employee", EmployeeSchema);
module.exports = Employee;