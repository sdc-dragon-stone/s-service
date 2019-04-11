const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

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
  const id = parseInt(req.query.id);
  const selectedHomes = [];

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

module.exports = app.listen(port, console.log(`listening on port ${port}`));
