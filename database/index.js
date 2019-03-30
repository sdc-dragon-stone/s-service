const mongoose = require('mongoose');
const faker = require('faker');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost/morehomes', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const homeSchema = new mongoose.Schema({
  _id: Number,
  pictureUrl: String,
  typeOfHome: String,
  city: String,
  description: String,
  price: Number,
  rating: String,
  reviews: Number
}, { _id: false });

homeSchema.plugin(AutoIncrement);

const Home = mongoose.model('Home', homeSchema);

function assignUrl(homeUrl) {
  const newHome = new Home({
    pictureUrl: homeUrl,
    typeOfHome: `entire ${faker.lorem.word()}`,
    city: faker.address.city(),
    description: faker.random.words(3),
    price: faker.random.number({ min: 35, max: 150 }),
    rating: `Stars: ${faker.random.number({ min: 3.5, max: 5 })}`,
    reviews: faker.random.number({ min: 20, max: 50 })
  });

  return newHome;
}

function saveHome(oneHome) {
  oneHome.save((err) => {
    if (err) console.error(err);
    console.log('Saved in DB');
  });
}

module.exports = {
  homeSchema,
  saveHome,
  assignUrl
};
