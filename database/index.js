const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'sdc',
    password: 'dragonstone',
    database: 'homes'
  }
});

// in the middle of a rewrite

const faker = require('faker');
const sampleData = require('./sampleData');

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
  knex
    .from('homes')
    .where({ id: id })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      throw err;
    });
}

const getTwelveHomes = (id, callback) => {
  knex
    .from('homes')
    .where('id', '>=', id)
    .andWhere('id', '<', id + 12)
    .limit(12)
    .then((res) => {
      if (res.length < 12) { // promise hell?
        knex
          .from('homes')
          .where('id', '>', 0)
          .limit(12 - res.length)
          .then((res2) => {
            const finalRes = res.concat(res2);
            callback(null, finalRes);
          })
          .catch((err) => {
            callback(err);
          });
      } else {
        callback(null, res);
      }
    })
    .catch((err) => {
      callback(err);
    });
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

const deleteHome = (id, callback) => {
  Home.remove({ _id: id }, (err, count) => {
    if (err) {
      callback(err);
    } else if (count.n === 0) {
      callback({ message: 'This object does not exist.' });
    } else {
      callback(null);
    }
  });
};

// purely for mongo script
const overrideCounter = (callback) => {
  Counter.findOne({ id: 'home_counter' }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      doc.seq = 10000000 - 1;
      doc.save((error, finalDoc) => {
        if (error) {
          callback(error);
        } else {
          callback(null, finalDoc);
        }
      });
    }
  });
};

module.exports = {
  assignUrl,
  saveHome,
  readAll,
  getOneHomeById,
  createHome,
  updateHome,
  deleteHome,
  getRandomId,
  overrideCounter,
  getTwelveHomes
};
