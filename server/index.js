const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// This may not be needed, delete if unused
app.get('/allhomes', (req, res) => {
  db.readAll((err, results) => {
    if (err) {
      console.log('readAll error:', err);
      res.status(500).end();
    }
    res.status(200).send(results);
  });
});

// This will generate a random id to be the first home in the picture carousel
// Both the minimim and maximum are inclusive
function getRandomId(min, max) {
  const minId = Math.ceil(min);
  const maxId = Math.floor(max);
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}

app.get('/morehomes', (req, res) => {
  const id = getRandomId(1, 100);
  const selectedHomes = [];
  // Like airbnb, 12 homes will be added in the carousel
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

const server = app.listen(port, console.log(`listening on port ${port}`));

module.exports = {
  server,
  getRandomId
};
