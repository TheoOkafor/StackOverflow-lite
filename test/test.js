// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const data = require('../data/data');
const app = require('../app');

const questions = data.questions;

chai.use(chaiHttp);
// Parent block for QUESTIONS
describe('Questions', () => {
  // Test the /GET route
  describe('/GET questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
        .get('/questions')
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('array');
          chai.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
    });
  });

  describe('/GET v1/questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
        .get('/v1/questions')
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('array');
          chai.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
    });
  });

  describe('/GET /v1', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
        .get('/v1')
        .end((err, res) => {
          chai.expect(200);
          chai.expect(res.body).be.a('array');
          chai.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
    });
  });

  // GET A QUESTION FROM QUESTIONS TEST
  describe('/GET /v1/questions/2', () => {
    it('it should GET the question with id = 2', (done) => {
      chai.request(app)
        .get('/v1/questions/2')
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.id).to.equal(2);
          done(err);
        });
    });
  });

  describe('/GET /v1/questions/100', () => {
    it('it should return \'Question 100 Not Found\'', (done) => {
      chai.request(app)
        .get('/v1/questions/100')
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).be.a('string');
          chai.expect(res.body).to.equal('Question 100 Not Found');
          done(err);
        });
    });
  });

  // POST QUESTIONS TEST
  describe('/POST /v1/questions', () => {
    it('it should NOT POST Question if the TITLE is Not provided', (done) => {
      const question = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor',
      };
      chai.request(app)
        .post('/v1/questions')
        .send(question)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          done(err);
        });
    });
  });

  describe('/POST /v1/questions', () => {
    it('it should POST Question if all the required fields are provided', (done) => {
      const question = {
        title: 'Why do people hate reading?',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor',
      };
      chai.request(app)
        .post('/v1/questions')
        .send(question)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('location');
          done(err);
        });
    });
  });

  describe(`/GET /v1/questions/${questions[questions.length - 1].id}`, () => {
    it(`it should return GET the question ${questions[questions.length - 1].id} that was just POSTed`, (done) => {
      chai.request(app)
        .get(`/v1/questions/${questions[questions.length - 1].id}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('id');
          chai.expect(res.body.title).to.equal('Why do people hate reading?');
          done(err);
        });
    });
  });
});
