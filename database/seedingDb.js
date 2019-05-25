const sampleData = require('./sampleData.js');
const db = require('./index.js');

function seedDb() {
  db.Home.deleteMany({}, (err) => {
    db.Home.counterReset('_id', (err) => {
      sampleData.homes.forEach((singleHomeUrl) => {
        const oneHome = db.assignUrl(singleHomeUrl);
        db.saveHome(oneHome);
      });
    });
  });
}

seedDb();

module.exports = seedDb;
