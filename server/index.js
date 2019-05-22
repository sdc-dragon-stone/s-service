const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const isImageUrl = require('is-image-url');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/allhomes', (req, res) => {
  db.readAll((err, results) => {
    if (err) {
      console.log('readAll error:', err);
      res.status(500).end();
    }
    res.status(200).send(results);
  });
});

app.get('/morehomes', (req, res) => {
  let id = parseInt(req.query.id);
  const selectedHomes = [];

  if (!id) { id = 1; }

  for (let i = id; i < id + 12; i += 1) {
    db.getOneHomeById(i, (err, result) => {
      if (err) {
        console.log('getTwelveHomes error:', err);
        res.status(500).send('Error getting home by Id:', err);
      }
      selectedHomes.push(result);
    });
  }
  setTimeout(() => {
    res.status(200).send(selectedHomes);
  }, 50);
});

// part below for SDC
app.get('/home/:id', (req, res) => {
  db.getOneHomeById(req.params.id, (err, home) => {
    if (err) {
      res.status(500).send(err);
    } else if (home === null) {
      res.status(404).send({ message: 'This object does not exist' });
    } else {
      res.status(200).send(home);
    }
  });
});

app.post('/home', (req, res) => {
  // rough object structure validation
  let validation = true;
  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'pictureUrl' && keys[i] !== 'typeOfHome' && keys[i] !== 'city' && keys[i] !== 'description' && keys[i] !== 'price') {
      validation = false;
      res.status(400).send({ message: 'Your house object contains bad key values! Please ensure it only uses [pictureUrl, typeOfHome, city, description, price]' });
      i = keys.length;
    }
  }

  // rough API validation
  if (validation === true) {
    if (!(Object.prototype.hasOwnProperty.call(req.body, 'pictureUrl')) || isImageUrl(req.body.pictureUrl) === false) {
      res.status(400).send({ message: 'Your image URL is missing or malformed' });
    } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'typeOfHome'))) {
      res.status(400).send({ message: 'Your typeOfHome is missing! Please add a value' });
    } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'city'))) {
      res.status(400).send({ message: 'Your city is missing! Please add a value' });
    } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'description'))) {
      res.status(400).send({ message: 'Your description is missing! Please add a value' });
    } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'price')) || typeof req.body.price !== 'number') {
      res.status(400).send({ message: 'Your price is missing or not a number! Please add a value' });
    } else { // passed validation
      db.createHome(req.body, (err, home) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(home);
        }
      });
    }
  }
});

app.put('/home/:id', (req, res) => {
  res.send('put route');
});

app.delete('/home/:id', (req, res) => {
  res.send('delete route');
});

module.exports = app.listen(port, console.log(`listening on port ${port}`));

/*


  // check if body is faulty
    // does it have all props?
    // is price a number?
    // does the picture look like a URL?
  // add two props
    // rating: pic randomizer
    // review: num randomizer
  // write to DB

    ideal body:
  {
    "pictureUrl": "https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-500188952591/mashbnb/tiny-house-for-sale-nashville-tn-airbnb-cute-button.jpg",
    "typeOfHome": "entire est",
    "city": "Port Wallace",
    "description": "approach deposit connect",
    "price": 59,
  }
  add:
  {
    "rating":,
    "reviews":
  }
*/
