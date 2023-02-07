const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
userModel = require("../models/Users");
const app = express();

mongoose.connect(
  "mongodb+srv://101311327-Angela:school@cluster0.sjruygg.mongodb.net/ChatterBox?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

app.use(require("express-session")({
  secret: "Hellooooooooo",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
 
// Showing secret page
app.get("/index", isLoggedIn, function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Showing register form
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/views/register.html");
});

// Handling user signup
app.post("/register", function (req, res) {
  try {
    var username = req.body.username
  var firstname = req.body.username
  var lastname = req.body.username
  var password = req.body.password
  var createon = Date
  User.register(new User({ username: username }),
          password, firstname, lastname, createon ,function (err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }

      passport.authenticate("local")(
          req, res, function () {
          res.render("secret");
      });
  });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: err.message
    })
  }
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = app;
