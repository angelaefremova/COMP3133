const { title } = require("process");
const User = require("../models/User");

const userResolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    getUser: async (_parent, { id }, _context, _info) => {
      return await User.findById(id);
    },
  },
  Mutation: {
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

module.exports = userResolvers;
