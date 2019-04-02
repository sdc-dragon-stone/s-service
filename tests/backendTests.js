/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

chai.use(chaiHttp);

const mongoose = require('mongoose');
const faker = require('faker');
const server = require('../server/index.js');
const db = require('../database/index.js');
const seedDb = require('../database/seedingDb.js');

mongoose.connect('mongodb://localhost/morehomes', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const ModelSample = mongoose.model('ModelSample', db.homeSchema);

const sampleHome = new ModelSample({
  pictureUrl: 'https://samplepic.com',
  typeOfHome: `entire ${faker.lorem.word()}`,
  city: faker.address.city(),
  description: faker.random.words(3),
  price: faker.random.number({ min: 35, max: 150 }),
  rating: `Stars: ${faker.random.number({ min: 3.5, max: 5 })}`,
  reviews: faker.random.number({ min: 20, max: 50 })
});

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

describe('GET request to /allhomes', () => {
  before(() => {
    seedDb();
  });
  it('should return all homes from the database', (done) => {
    chai.request(server)
      .get('/allhomes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('pictureUrl');
        res.body[0].should.have.property('typeOfHome');
        res.body[0].should.have.property('city');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('price');
        res.body[0].should.have.property('rating');
        res.body[0].should.have.property('reviews');
        done();
      });
  });
});

describe('GET request to /morehomes', () => {
  before(() => {
    seedDb();
  });
  it('should return 12 homes from the database', (done) => {
    chai.request(server)
      .get('/morehomes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.have.property('pictureUrl');
        res.body[0].should.have.property('typeOfHome');
        res.body[0].should.have.property('city');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('price');
        res.body[0].should.have.property('rating');
        res.body[0].should.have.property('reviews');
        res.body.length.should.equal(12);
        done();
      });
  });
});

describe('Seeding the database', () => {
  before(() => {
    db.saveHome(sampleHome);
  });

  it('should save a document in the database using saveHome function', () => {
    setTimeout(() => {
      ModelSample.find((err, results) => {
        console.log('RESULTS', results);
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
    }, 1000);
  });
});
