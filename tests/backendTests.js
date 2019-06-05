const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

chai.use(chaiHttp);

const server = require('../server/index.js');

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

// describe('GET request to /allhomes', () => {
//   before(() => {
//     seedDb();
//   });
//   it('should return all homes from the database', (done) => {
//     chai.request(server)
//       .get('/allhomes')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('array');
//         res.body[0].should.have.property('pictureUrl');
//         res.body[0].should.have.property('typeOfHome');
//         res.body[0].should.have.property('city');
//         res.body[0].should.have.property('description');
//         res.body[0].should.have.property('price');
//         res.body[0].should.have.property('rating');
//         res.body[0].should.have.property('reviews');
//         done();
//       });
//   });
// });

// describe('GET request to /morehomes', () => {
//   before(() => {
//     seedDb();
//   });
//   it('should return 12 homes from the database', (done) => {
//     chai.request(server)
//       .get('/morehomes')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('array');
//         res.body[0].should.have.property('pictureUrl');
//         res.body[0].should.have.property('typeOfHome');
//         res.body[0].should.have.property('city');
//         res.body[0].should.have.property('description');
//         res.body[0].should.have.property('price');
//         res.body[0].should.have.property('rating');
//         res.body[0].should.have.property('reviews');
//         res.body.length.should.equal(12);
//         done();
//       });
//   });
// });

// describe('Seeding the database', () => {
//   before(() => {
//     db.saveHome(sampleHome);
//   });

//   it('should save a document in the database using saveHome function', () => {
//     setTimeout(() => {
//       ModelSample.find((err, results) => {
//         console.log('RESULTS', results);
//         should.exist(results[0]);
//         results[0].should.be.an('object');
//         results[0].should.have.property('pictureUrl');
//         results[0].should.have.property('typeOfHome');
//         results[0].should.have.property('city');
//         results[0].should.have.property('description');
//         results[0].should.have.property('price');
//         results[0].should.have.property('rating');
//         results[0].should.have.property('reviews');
//       });
//     }, 1000);
//   });
// });

describe('POST route', () => {
  it('should return 400 if a required parameter is missing', (done) => {
    chai.request(server)
      .post('/home')
      .send({
        typeOfHome: 'entire est',
        city: 'Port Wallace',
        description: 'approach deposit connect',
        price: 59
      })
      .end((err, res) => {
        const message = res.body.message; // appease the chai gods
        res.should.have.status(400);
        message.should.equal('Your image URL is missing or malformed');
        // console.log('---------------- RESPONSE ----------------', res);
        done();
      });
  });

  it('should return 400 if an extra parameter is added', (done) => {
    chai.request(server)
      .post('/home')
      .send({
        foo: 'bar'
      })
      .end((err, res) => {
        const message = res.body.message; // appease the chai gods
        res.should.have.status(400);
        message.should.equal('Your house object contains bad key values! Please ensure it only uses [pictureUrl, typeOfHome, city, description, price]');
        done();
      });
  });
});

describe('PUT route', () => {
  it('should return 400 if object does not exist', (done) => {
    chai.request(server)
      .put('/home/-1') // "cheating" to always get a number that won't exist in the db
      .send({
        typeOfHome: 'entire est',
        city: 'Port Wallace',
        description: 'approach deposit connect',
        price: 59
      })
      .end((err, res) => {
        const message = res.body.message; // appease the chai gods
        res.should.have.status(400);
        message.should.equal('This object does not exist. Please POST to create the object.');
        // console.log('---------------- RESPONSE ----------------', res);
        done();
      });
  });
});
