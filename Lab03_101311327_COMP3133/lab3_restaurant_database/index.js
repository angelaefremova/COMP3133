const express = require('express');
const mongoose = require('mongoose');
const restaurantsRoutes = require('./routes/RestaurantsRoutes.js');

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb+srv://USER:PASSWORD@cluster0.sjruygg.mongodb.net/Restuarants?retryWrites=true&w=majority' , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(restaurantsRoutes);

app.listen(3000, () => { console.log('Server is running...') });
