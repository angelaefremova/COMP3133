const { gql } = require("apollo-server-express");

const employeeDefs = gql`
  type Employee {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Number
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = employeeDefs;