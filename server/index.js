require('dotenv').config();
require('newrelic');
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

  if (!id) { id = 1; }

  db.getTwelveHomes(id, (err, houses) => {
    if (err) { res.status(400).send(err); }
    res.status(200).send(houses);
  });
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
      res.status(400).send(err);
    } else {
      res.status(204).send();
    }
  });
});

app.delete('/home/:id', (req, res) => {
  db.deleteHome(req.params.id, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).send();
    }
  });
});

app.get('/loaderio-87a0cfe124f3907031bb40270f06c964/', (req, res) => {
  res.sendFile(__dirname + '/loaderio-87a0cfe124f3907031bb40270f06c964.txt');
});

module.exports = app.listen(port, console.log(`listening on port ${port}`));
