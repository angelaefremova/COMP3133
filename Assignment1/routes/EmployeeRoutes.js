const first = require("ee-first");
const { title } = require("process");
const Employee = require("../models/Employee");

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployee: async (_parent, { id }, _context, _info) => {
      return await Employee.findById(id);
    },
  },
  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      const { first_name, last_name, email, gender, salary } = args.employee;
      console.log(first_name, last_name, email, gender, salar);
      const employee = new Employee({ first_name, last_name, email, gender, salar });
      await employee.save();
      return employee;
    },
    deleteEmployee: async (parent, args, context, info) => {
      const { id } = args;
      await Employee.findByIdAndDelete(id);
      return "Employee was deleted";
    },
    updateEmployee: async (parent, args, context, info) => {
      const { id } = args;
      const { first_name, last_name, email, gender, salar } = args.employee;
      const updates = {};
      if (first_name !== undefined) {
        updates.first_name = first_name;
      }
      if (last_name !== undefined) {
        updates.last_name = last_name;
      }
      if (email !== undefined) {
        updates.email = email;
      }
      if (gender !== undefined) {
        updates.gender = gender;
      }
      if (salary !== undefined) {
        updates.salary = salary;
      }
      const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
      return employee;
    },
  },
};

module.exports = employeeResolvers;
