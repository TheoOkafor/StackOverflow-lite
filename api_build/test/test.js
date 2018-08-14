'use strict';

// Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var data = require('../data/data');
var app = require('../app');

chai.use(chaiHttp);
//Parent block
describe('Questions', function () {
  // Test the /GET route
  describe('/GET questions', function () {
    it('it should GET all the questions', function (done) {
      chai.request(app).get('/questions').end(function (err, res) {
        chai.expect(200);
        chai.expect(res.body).be.a('array');
        chai.expect(res.body).to.have.lengthOf(4);
        done(err);
      });
    });
  });

  describe('/GET v1/questions', function () {
    it('it should GET all the questions', function (done) {
      chai.request(app).get('/v1/questions').end(function (err, res) {
        chai.expect(200);
        chai.expect(res.body).be.a('array');
        chai.expect(res.body).to.have.lengthOf(4);
        done(err);
      });
    });
  });

  describe('/GET /v1', function () {
    it('it should GET all the questions', function (done) {
      chai.request(app).get('/v1').end(function (err, res) {
        chai.expect(200);
        chai.expect(res.body).be.a('array');
        chai.expect(res.body).to.have.lengthOf(4);
        done(err);
      });
    });
  });

  describe('/GET /v1/questions/2', function () {
    it('it should GET the question with id = 2', function (done) {
      chai.request(app).get('/v1/questions/2').end(function (err, res) {
        chai.expect(200);
        chai.expect(res.body).be.a('object');
        chai.expect(res.body).to.have.property('id').with.value(2);
        done(err);
      });
    });
  });
});
