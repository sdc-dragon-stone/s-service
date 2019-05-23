const isImageUrl = require('is-image-url');

const objectValidation = (req, res, next) => {
  let validation = true;
  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'pictureUrl' && keys[i] !== 'typeOfHome' && keys[i] !== 'city' && keys[i] !== 'description' && keys[i] !== 'price') {
      validation = false;
      res.status(400).send({ message: 'Your house object contains bad key values! Please ensure it only uses [pictureUrl, typeOfHome, city, description, price]' });
      i = keys.length;
    }
  }
  if (validation) { next(); }
};

const postValidation = (req, res, next) => {
  if (!(Object.prototype.hasOwnProperty.call(req.body, 'pictureUrl')) || isImageUrl(req.body.pictureUrl) === false) {
    res.status(400).send({ message: 'Your image URL is missing or malformed' });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'typeOfHome'))) {
    res.status(400).send({ message: 'Your typeOfHome is missing! Please add a value' });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'city'))) {
    res.status(400).send({ message: 'Your city is missing! Please add a value' });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'description'))) {
    res.status(400).send({ message: 'Your description is missing! Please add a value' });
  } else if (!(Object.prototype.hasOwnProperty.call(req.body, 'price')) || typeof req.body.price !== 'number') {
    res.status(400).send({ message: 'Your price is missing or not a number! Please add a value' });
  } else {
    next();
  }
};

const putValidation = (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(req.body, 'pictureUrl') && isImageUrl(req.body.pictureUrl) === false) {
    res.status(400).send({ message: 'Your image URL is malformed' });
  } else if (Object.prototype.hasOwnProperty.call(req.body, 'price') && typeof req.body.price !== 'number') {
    res.status(400).send({ message: 'Your price is not a number! Please add a value' });
  } else {
    next();
  }
};

module.exports = {
  objectValidation,
  postValidation,
  putValidation
};
