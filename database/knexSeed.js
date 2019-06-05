
const faker = require('faker');
const sampleData = require('./sampleData.js');
const db = require('./index.js');

const loadData = () => {
  knex.raw('TRUNCATE TABLE homes RESTART IDENTITY')
    .then(async () => {
      // define a bunch of vars so we don't clog up memory with reassignments
      let j;
      let k;
      const insertArray = [];
      let numOfStars;
      let photoId;

      for (let i = 0; i < 1667; i += 1) {
        console.log('loop', i);
        insertArray.length = 0;
        // quick math
        // eslint-disable-next-line no-unused-expressions
        (i === 1666) ? (k = 4000) : (k = 6000);

        for (j = 0; j < k; j += 1) {
          // randomize photos
          photoId = db.getRandomId(0, 110);
          numOfStars = db.getRandomId(0, 1);

          // build home
          insertArray[j] = {
            pictureUrl: sampleData.homes[photoId], // need to randomize this hoice
            typeOfHome: `entire ${faker.lorem.word()}`,
            city: faker.address.city(),
            description: faker.random.words(3),
            price: faker.random.number({ min: 35, max: 150 }),
            rating: sampleData.stars[numOfStars], // need to move this over
            reviews: faker.random.number({ min: 20, max: 50 })
          };
        }
        // eslint-disable-next-line no-await-in-loop
        await knex('homes').insert(insertArray)
          .then((success) => {
            console.log('success --- ', success.rowCount);
          })
          .catch((err) => {
            console.log('error', err);
          });
      }
      console.log('complete');
      process.exit();
    })
    .catch((err) => { throw err; });
};

knex.schema.hasTable('homes').then((exists) => {
  if (!exists) {
    return knex.schema.createTable('homes', (t) => {
      t.increments('id').primary();
      t.string('pictureUrl');
      t.string('typeOfHome');
      t.string('city');
      t.string('description');
      t.integer('price');
      t.string('rating');
      t.integer('reviews');
    });
  }
})
  .then(() => {
    loadData();
  })
  .catch((err) => {
    throw err;
  });
