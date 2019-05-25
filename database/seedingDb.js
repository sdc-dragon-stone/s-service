const faker = require('faker');
const sampleData = require('./sampleData.js');
const db = require('./index.js');

const seedDb = () => {
  db.Home.deleteMany({}, async (err) => {
    // killswitch
    if (err) { throw err; }

    // define a bunch of vars so we don't clog up memory with reassignments
    let j;
    let homeData;
    const insertArray = [];
    let numOfStars;
    let photoId;

    for (let i = 0; i < 100; i += 1) {
      console.log('loop', i);
      insertArray.length = 0;
      for (j = 0; j < 100000; j += 1) {
        // randomize photos
        photoId = db.getRandomId(0, 110);
        numOfStars = db.getRandomId(0, 1);

        // build home
        homeData = new db.Home({
          pictureUrl: sampleData.homes[photoId], // need to randomize this hoice
          typeOfHome: `entire ${faker.lorem.word()}`,
          city: faker.address.city(),
          description: faker.random.words(3),
          price: faker.random.number({ min: 35, max: 150 }),
          rating: sampleData.stars[numOfStars], // need to move this over
          reviews: faker.random.number({ min: 20, max: 50 })
        });

        // put into array for insertMany
        insertArray.push(homeData);
      }
      // eslint-disable-next-line no-await-in-loop
      await db.Home.insertMany(insertArray);
    }
  });
};

seedDb();

module.exports = seedDb;
// 100 times:
  // create 100k records
    // stuff into array
      // await insert many