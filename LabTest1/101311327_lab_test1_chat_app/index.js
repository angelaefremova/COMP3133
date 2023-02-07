const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/Users.js");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const io = new Server(server);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://101311327-Angela:school@cluster0.sjruygg.mongodb.net/ChatterBox?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((success) => {
    console.log("Success Mongodb connection");
  })
  .catch((err) => {
    console.log("Error Mongodb connection");
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/logout", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
  });

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/views/register.html");
});

app.get("/chat", function (req, res) {
    res.sendFile(__dirname + "/chat.html");
  });


app.post("/register", async function (req, res) {
  try {
    if (!(await UserModel.find({username: req.body.username}))) {
        const new_user = new UserModel({ ...req.body, createon: Date.now() });
    var saved_user = new_user.save();
  //   res.status(200).send({
  //     status: true,
  //     message: `New user ${JSON.stringify(new_user)} created`,
  //   });
    res.sendFile(__dirname + "/index.html");
    } else {
        throw new Error(`User ${req.body.username} is not available. Please try something else!`)
    }
  } catch (err) {
      res.status(400).send({
          status: false,
          message: err.message
      })
  }
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", async (req, res) => {
    
    try {
        
        var saved_user = await UserModel.find({ username: req.body.username })
        res.sendFile(__dirname + "/index.html");
    } catch (err) {
        res.status(400).send({
            status: false,
            
            message: err.message
        })
    }
  });

// Socket.io
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
