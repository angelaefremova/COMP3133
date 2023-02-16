const { gql } = require("apollo-server-express");

const userDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Query {
    hello: String

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

module.exports = userDefs;