const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  await mongoose.connect(
    "mongodb+srv://101311327-Angela:school@cluster0.sjruygg.mongodb.net/comp3133_assigment1",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log("Mongoose Connected");

  app.listen(4000, () => console.log("Server running on port 4000"));
}
startServer();
