const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/Users.js");
const fs = require("fs");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://user:pass@cluster0.sjruygg.mongodb.net/Users?retryWrites=true&w=majority",
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

// http://localhost:3000/users
app.post("/users", async (req, res) => {
  try {
    let userData = fs.readFileSync("./UsersData.json");
    let jsonData = JSON.parse(userData);

    for (let user of jsonData) {
      if (
        await usersRoutes.findOne({
          $or: [
            {
              username: user.username,
            },
            {
              email: user.email,
            },
          ],
        })
      ) {
        console.log(
          `User ${user.username} (${user.name}) has registered with ${user.email}`
        );
      } else {
        let new_user = new usersRoutes(user);
        try {
          await new_user.validate(new_user);
        } catch (err) {
          console.log(err);
          break;
        }
        await new_user.save();
      }
    }
    res.status(201).send({
      status: true,
      message: "Users Added Successfully",
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      error: err.message,
    });
  }
});

app.use(usersRoutes);

app.listen(3000, () => {
  console.log("Server is running...");
});
