const express = require("express");
const restaurantsModel = require("../models/Restaurants");
const app = express();

//http://localhost:3000/restaurants
app.get("/restaurants", async (req, res) => {
  const restaurants = await restaurantsModel.find({});

  try {
    console.log(restaurants[0].name);
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  const restaurants = await restaurantsModel.find({ cuisine: cuisine });

  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {
  const sortBy = req.query.sortBy.toLowerCase();
  const restaurants = await restaurantsModel
    .find({})
    .select("id cuisine name city restaurant_id")
    .sort({ restaurant_id: sortBy });

  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// http://localhost:3000/restaurants/Delicatessen
app.get("/restaurants/Delicatessen", async (req, res) => {
  const restaurants = await restaurantsModel
    .find({ cuisine: "Delicatessen", city: { $ne: "Brooklyn" }})
    .select("cuisine name city")
    .sort({ name: 1 });

  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
