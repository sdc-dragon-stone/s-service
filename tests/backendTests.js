/* eslint-disable array-callback-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

chai.use(chaiHttp);

const mongoose = require('mongoose');
const faker = require('faker');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const server = require('../server/index.js');

mongoose.connect('mongodb://localhost/node-test', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

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

function saveHome(homeUrl) {
  const newHome = new Home({
    pictureUrl: homeUrl,
    typeOfHome: `entire ${faker.lorem.word()}`,
    city: faker.address.city(),
    description: faker.random.words(3),
    price: faker.random.number({ min: 35, max: 150 }),
    rating: `Stars: ${faker.random.number({ min: 3.5, max: 5 })}`,
    reviews: faker.random.number({ min: 20, max: 50 })
  });

  newHome.save();
}

describe('GET request to /', () => {
  it('should return response status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Seeding the database', () => {
  beforeEach(() => {
    saveHome('https://samplepic.com');
  });

  afterEach(() => {
    mongoose.connection.on('open', () => {
      mongoose.connection.db.dropDatabase();
    });
  });

  it('should save a document in the database using saveHome function', () => {
    Home.find((err, results) => {
      should.exist(results[0]);
      results[0].should.be.an('object');
      results[0].should.have.property('pictureUrl');
      results[0].should.have.property('typeOfHome');
      results[0].should.have.property('city');
      results[0].should.have.property('description');
      results[0].should.have.property('price');
      results[0].should.have.property('rating');
      results[0].should.have.property('reviews');
    });
  });
});
