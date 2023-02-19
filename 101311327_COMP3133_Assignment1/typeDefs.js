const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Query {
    getAllEmployees: [Employee]
    getAllUsers: [User]
    getEmployee(id: ID): Employee
    getUser(id: ID): User
  }

  input EmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  type Mutation {
    createEmployee(employee: EmployeeInput): Employee
    deleteEmployee(id: ID): String
    updateEmployee(id: ID, employee: EmployeeInput): Employee

    createUser(user: UserInput): User
    deleteUser(id: ID): String
    updateUser(id: ID, user: UserInput): User
  }
`;

module.exports = typeDefs;
