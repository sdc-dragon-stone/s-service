require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

client.on('connect', () => {
  console.log('success');
});

client.on('error', (err) => { console.log(err); });

const getRecord = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      callback(err);
    } else {
      callback(null, reply);
    }
  });
};

const setRecord = (key, value, callback) => {
  client.set(key, value, (err, reply) => {
    if (err) {
      callback(err);
    } else {
      callback(null, reply);
    }
  });
};

module.exports = {
  getRecord,
  setRecord
};
