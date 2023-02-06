const express = require("express");
const mongoose = require('mongoose');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json()); 

mongoose.connect('mongodb+srv://101311327-Angela:school@cluster0.sjruygg.mongodb.net/Users?retryWrites=true&w=majority' , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
