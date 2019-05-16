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
  // need to decide structure + also think through image upload?
  res.send('post route');
});

app.put('/home/:id', (req, res) => {
  res.send('put route');
});

app.delete('/home/:id', (req, res) => {
  res.send('delete route');
});

module.exports = app.listen(port, console.log(`listening on port ${port}`));
