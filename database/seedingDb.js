var mongoose = require('mongoose');
var faker = require('faker');
var sampleData = require('./sampleData.js');
var AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost/morehomes', {useNewUrlParser: true});

var homeSchema = new mongoose.Schema({
  _id: Number,
  pictureUrl: String,
  typeOfHome: String,
  city: String,
  description: String,
  price: Number,
  rating: String,
  reviews: Number
}, {_id: false});

homeSchema.plugin(AutoIncrement);
var Home = mongoose.model('Home', homeSchema);

//the array of sample homes: sampleData.homes
var saveHome = function(homeUrl) {
  var newHome = new Home({
    pictureUrl: homeUrl,
    typeOfHome: `entire ${faker.lorem.word()}`,
    city: faker.address.city(),
    description: faker.random.words(3),
    price: faker.random.number({min: 35, max: 150}),
    rating: `Stars: ${faker.random.number({min: 3.5, max: 5})}`,
    reviews: faker.random.number({min: 20, max: 50})
  });

  newHome.save();

};

sampleData.homes.forEach(singleHome => {
  saveHome(singleHome);
});
