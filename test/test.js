'use strict';

// Require the dev-dependencies

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _data = require('../data/data');

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = _data.data.questions;

_chai2.default.use(_chaiHttp2.default);
// Parent block for QUESTIONS
describe('Questions', function () {
  describe('GET QUESTIONS', function () {
    // Test the /GET route
    describe('/GET questions', function () {
      it('it should GET all the questions', function (done) {
        _chai2.default.request(_app.app).get('/questions').end(function (err, res) {
          _chai2.default.expect(res).to.have.status(200);
          _chai2.default.expect(res.body).be.a('array');
          _chai2.default.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
      });
    });

    describe('/GET v1/questions', function () {
      it('it should GET all the questions', function (done) {
        _chai2.default.request(_app.app).get('/v1/questions').end(function (err, res) {
          _chai2.default.expect(res).to.have.status(200);
          _chai2.default.expect(res.body).be.a('array');
          _chai2.default.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
      });
    });

    describe('/GET /v1', function () {
      it('it should GET all the questions', function (done) {
        _chai2.default.request(_app.app).get('/v1').end(function (err, res) {
          _chai2.default.expect(200);
          _chai2.default.expect(res.body).be.a('array');
          _chai2.default.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
      });
    });

    // GET A QUESTION FROM QUESTIONS TEST
    describe('/GET /v1/questions/2', function () {
      it('it should GET the question with id = 2', function (done) {
        _chai2.default.request(_app.app).get('/v1/questions/2').end(function (err, res) {
          _chai2.default.expect(res).to.have.status(200);
          _chai2.default.expect(res.body).be.a('object');
          _chai2.default.expect(res.body.id).to.equal(2);
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/100', function () {
      it('it should return \'Question 100 Not Found\'', function (done) {
        _chai2.default.request(_app.app).get('/v1/questions/100').end(function (err, res) {
          _chai2.default.expect(res).to.have.status(404);
          _chai2.default.expect(res.body).be.a('string');
          _chai2.default.expect(res.body).to.equal('Question 100 Not Found');
          done(err);
        });
      });
    });
  });

  // POST QUESTIONS TEST
  describe('POST QUESTIONS', function () {
    describe('/POST /v1/questions', function () {
      it('it should NOT POST Question if the TITLE is Not provided', function (done) {
        var question = {
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          username: 'TheoOkafor'
        };
        _chai2.default.request(_app.app).post('/v1/questions').send(question).end(function (err, res) {
          _chai2.default.expect(res).to.have.status(400);
          _chai2.default.expect(res.body).to.be.a('object');
          _chai2.default.expect(res.body).to.have.property('message');
          done(err);
        });
      });
    });

    describe('/POST /v1/questions', function () {
      it('it should POST Question if all the required fields are provided', function (done) {
        var question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          username: 'TheoOkafor'
        };
        _chai2.default.request(_app.app).post('/v1/questions').send(question).end(function (err, res) {
          _chai2.default.expect(res).to.have.status(200);
          _chai2.default.expect(res.body).to.be.a('object');
          _chai2.default.expect(res.body).to.have.property('message');
          _chai2.default.expect(res.body).to.have.property('location');
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/' + questions[questions.length - 1].id, function () {
      it('it should return GET the question ' + questions[questions.length - 1].id + ' that was just POSTed', function (done) {
        _chai2.default.request(_app.app).get('/v1/questions/' + questions[questions.length - 1].id).end(function (err, res) {
          _chai2.default.expect(res).to.have.status(200);
          _chai2.default.expect(res.body).to.be.a('object');
          _chai2.default.expect(res.body).to.have.property('id');
          _chai2.default.expect(res.body.title).to.equal('Why do people hate reading?');
          done(err);
        });
      });
    });
  });
});
// Parent block for ANSWERS
describe('POST Answers', function () {
  // TESTS FOR ANSWERS
  describe('/POST /v1/questions/16/answers', function () {
    it('it should NOT POST Answer if question does not exist', function (done) {
      var answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor'
      };
      _chai2.default.request(_app.app).post('/v1/questions/16/answers').send(answer).end(function (err, res) {
        _chai2.default.expect(res).to.have.status(404);
        _chai2.default.expect(res.body).to.be.a('object');
        _chai2.default.expect(res.body).to.have.property('message');
        _chai2.default.expect(res.body.message).to.equal('Question 16 Not Found');
        done(err);
      });
    });
  });

  describe('/POST /v1/questions/1/answers', function () {
    it('it should NOT POST Answer if the BODY is Not provided', function (done) {
      var answer = {
        username: 'TheoOkafor'
      };
      _chai2.default.request(_app.app).post('/v1/questions/1/answers').send(answer).end(function (err, res) {
        _chai2.default.expect(res).to.have.status(400);
        _chai2.default.expect(res.body).to.be.a('object');
        _chai2.default.expect(res.body).to.have.property('message');
        _chai2.default.expect(res.body.message).to.equal('Bad Request. Answer must have a body.');
        done(err);
      });
    });
  });

  describe('/POST /v1/questions/1/answers', function () {
    it('it should POST answer if all the required fields are provided', function (done) {
      var answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor'
      };
      _chai2.default.request(_app.app).post('/v1/questions/1/answers').send(answer).end(function (err, res) {
        _chai2.default.expect(res).to.have.status(200);
        _chai2.default.expect(res.body).to.be.a('object');
        _chai2.default.expect(res.body).to.have.property('message');
        _chai2.default.expect(res.body).to.have.property('question');
        done(err);
      });
    });
  });
});
