const isImageUrl = require('is-image-url');
const logger = require('../server/winston.js');

let message;

const objectValidation = (req, res, next) => {
  let validation = true;
  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'pictureUrl' && keys[i] !== 'typeOfHome' && keys[i] !== 'city' && keys[i] !== 'description' && keys[i] !== 'price') {
      validation = false;
      message = 'Your house object contains bad key values! Please ensure it only uses [pictureUrl, typeOfHome, city, description, price]';
      logger.log('error', message, { tags: 'validation,request' });
      res.status(400).send({ message: message });
      i = keys.length;
    }
  }
  if (validation) { next(); }
};

const postValidation = (req, res, next) => {
  if (!(Object.prototype.hasOwnProperty.call(req.body, 'pictureUrl')) || isImageUrl(req.body.pictureUrl) === false) {
    message = 'Your image URL is missing or malformed';
    logger.log('error', message, { tags: 'post,validation,request' });
    res.status(400).send({ message: message });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'typeOfHome'))) {
    message = 'Your typeOfHome is missing! Please add a value';
    logger.log('error', message, { tags: 'post,validation,request' });
    res.status(400).send({ message: message });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'city'))) {
    message = 'Your city is missing! Please add a value';
    logger.log('error', message, { tags: 'post,validation,request' });
    res.status(400).send({ message: message });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'description'))) {
    message = 'Your description is missing! Please add a value';
    logger.log('error', message, { tags: 'post,validation,request' });
    res.status(400).send({ message: message });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'price')) || typeof req.body.price !== 'number') {
    message = 'Your price is missing or not a number! Please add a value';
    logger.log('error', message, { tags: 'post,validation,request' });
    res.status(400).send({ message: message });
  } else {
    next();
  }
};

const putValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'pictureUrl') && isImageUrl(req.body.pictureUrl) === false) {
    message = 'Your image URL is malformed';
    logger.log('error', message, { tags: 'put,validation,request' });
    res.status(400).send({ message: message });
  } else if (Object.prototype.hasOwnProperty.call(req.body, 'price') && typeof req.body.price !== 'number') {
    message = 'Your price is not a number! Please add a value';
    logger.log('error', message, { tags: 'put,validation,request' });
    res.status(400).send({ message: message });
  } else {
    next();
  }
};

module.exports = {
  objectValidation,
  postValidation,
  putValidation
};
