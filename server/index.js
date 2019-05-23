const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const validation = require('../middleware/objectValidation.js');

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

app.post('/home', validation.objectValidation, validation.postValidation, (req, res) => {
  db.createHome(req.body, (err, home) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(home);
    }
  });
});

app.put('/home/:id', validation.objectValidation, validation.putValidation, (req, res) => {
  db.updateHome(req.params.id, req.body, (err, doc) => {
    if (err) {
      console.log('err', err);
      res.status(400).send(err);
    }
    console.log('doc', doc);
    res.status(200).send(doc);
  });
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
