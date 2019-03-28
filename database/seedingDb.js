const sampleData = require('./sampleData.js');
const seed = require('./index.js');

function seedDb() {
  sampleData.homes.forEach((singleHome) => {
    seed.saveHome(singleHome);
  });
}

seedDb();
