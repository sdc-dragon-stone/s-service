const mongoose = require('mongoose');
const faker = require('faker');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const sampleData = require('./sampleData');

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

function getRandomId(min, max) {
  const minId = Math.ceil(min);
  const maxId = Math.floor(max);
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}

function assignUrl(homeUrl) {
  const numOfStars = getRandomId(0, 1);
  const newHome = new Home({
    pictureUrl: homeUrl,
    typeOfHome: `entire ${faker.lorem.word()}`,
    city: faker.address.city(),
    description: faker.random.words(3),
    price: faker.random.number({ min: 35, max: 150 }),
    rating: sampleData.stars[numOfStars],
    reviews: faker.random.number({ min: 20, max: 50 })
  });

  return newHome;
}

function saveHome(oneHome) {
  oneHome.save((err) => {
    if (err) console.error(err);
  });
}

// This is currently not in use, but leaving in for possible future use
function readAll(callback) {
  Home.find(callback);
}

function getOneHomeById(id, callback) {
  Home.findById(id, callback);
}

const createHome = (body, callback) => {
  const houseStats = { ...body };

  // add "server" stuff
  houseStats.rating = sampleData.stars[getRandomId(0, 1)];
  houseStats.reviews = faker.random.number({ min: 20, max: 50 });

  const house = new Home(houseStats);

  house.save((err, home) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, home);
    }
  });
};

const updateHome = (id, body, callback) => {
  Home.findOne({ _id: id }, (err, doc) => {
    if (err) {
      callback(err);
    } else if (doc === null) {
      callback({ message: 'This object does not exist. Please POST to create the object.' });
    } else {
      const keys = Object.keys(body);
      let key;
      for (let i = 0; i < keys.length; i += 1) {
        key = keys[i];
        doc[key] = body[key];
      }
      doc.save((saveErr, finalDoc) => {
        if (saveErr) {
          callback(err);
        } else {
          callback(null, finalDoc);
        }
      });
    }
  });
};

module.exports = {
  homeSchema,
  assignUrl,
  saveHome,
  readAll,
  getOneHomeById,
  Home,
  createHome,
  updateHome
};
