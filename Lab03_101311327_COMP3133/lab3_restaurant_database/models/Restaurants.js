const mongoose = require('mongoose');

const restaurantsSchema = new mongoose.Schema({
  address: {
    building: {
      type: String
    },
    street: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  city: {
    type: String
  },
  cuisine: {
    type: String
  },
  name: {
    type: String
  },
  restaurant_id: {
    type: String
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantsSchema);
module.exports = Restaurant;