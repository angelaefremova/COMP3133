const { title } = require("process");
const bcrypt = require("bcrypt");
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
    login: async (_parent, {username, password}, _context, _info) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User Does Not Exist')
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid Password");
      }
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
    signup: async (parent, args, context, info) => {
      const user = User();
      user.username = args.username;
      user.email = args.email;
      user.password = await bcrypt.hash(args.password, 10, function(err, hash) {
        
    });
      return user.save();
    },
  },
};

module.exports = resolvers;
