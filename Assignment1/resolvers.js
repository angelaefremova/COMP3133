const { title } = require("process");
const User = require("./models/User");
const Employee = require("./models/Employee");

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },
    getEmployee: async (_parent, { id }, _context, _info) => {
      return await Employee.findById(id);
    },
    getAllUsers: async () => {
      return await User.find();
    },
    getUser: async (_parent, { id }, _context, _info) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      const { first_name, last_name, email, gender, salary } = args.employee;
      console.log(first_name, last_name, email, gender, salary);
      const employee = new Employee({ first_name, last_name, email, gender, salary });
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
      const { first_name, last_name, email, gender, salary } = args.employee;
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
    createUser: async (parent, args, context, info) => {
      const { username, email, password } = args.user;
      console.log( username, email, password);
      const user = new User({  username, email, password});
      await user.save();
      return user;
    },
    deleteUser: async (parent, args, context, info) => {
      const { id } = args;
      await User.findByIdAndDelete(id);
      return "User Was Deleted";
    },
    updateUser: async (parent, args, context, info) => {
      const { id } = args;
      const {  username, email, password } = args.user;
      const updates = {};
      if (username !== undefined) {
        updates.username = username;
      }
      if (email !== undefined) {
        updates.email = email;
      }
      if (password !== undefined) {
        updates.password = password;
      }
      const user = await User.findByIdAndUpdate(id, updates, { new: true });
      return user;
    },
  },
};

module.exports = resolvers;
