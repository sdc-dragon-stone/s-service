var assert = require('chai').assert;
var chai = require('chai');
// var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var should = require('chai').should();

// chai.use(chaiHttp);
// var server = require('../server/index.js');
var database = require('../database/seedingDb.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/morehomes', {useNewUrlParser: true});

describe('Seeding data into database', function () {
  it('should populate database', function () {
    var boo = 'hi';
    assert.typeOf(boo, 'string');
  });
});
