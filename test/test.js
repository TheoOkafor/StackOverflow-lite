// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import { data } from '../data/data';
import { app } from '../app';

const questions = data.questions;
chai.use(chaiHttp);

// Parent block for QUESTIONS
describe('Questions', () => {
  describe('GET QUESTIONS', () => {
    // Test the /GET route
    describe('GET /questions', () => {
      it('it should GET all the questions', (done) => {
        chai.request(app).get('/questions').end( (err, res) => {
          chai.expect(res).to.have.status(500);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body).to.have.lengthOf(4);
          done(err);
        });
      });
    });
  });
});
/*
    // GET A QUESTION FROM QUESTIONS TEST
    describe('GET /questions/2', () => {
      it('it should GET the question with id = 2', (done) => {
        chai.request(app).get('/questions/2').end( (err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.id).to.equal(2);
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/100', () => {
      it('it should return \'Question 100 Not Found\'', (done) => {
        chai.request(app).get('/questions/100').end( (err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).be.a('string');
          chai.expect(res.body).to.equal('Question 100 Not Found');
          done(err);
        });
      });
    });
  });

  // POST QUESTIONS TEST
  describe('POST QUESTIONS', () => {
    describe('/POST /v1/questions', () => {
      it('it should NOT POST Question if the TITLE is Not provided', (done) => {
        const question = {
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          username: 'TheoOkafor'
        };
        chai.request(app).post('/questions').send(question).end( (err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          //message value here
          done(err);
        });
      });
    });

    describe('/POST /v1/questions', () => {
      it('it should POST Question if all the required fields are provided', (done) => {
        const question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          username: 'TheoOkafor'
        };
        chai.request(app).post('/questions').send(question).end( (err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('location');
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/' + questions[questions.length - 1].id, () => {
      it('it should return GET the question ' + questions[questions.length - 1].id + ' that was just POSTed', (done) => {
        chai.request(app).get('/questions/' + questions[questions.length - 1].id)
        .end( (err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('id');
          chai.expect(res.body.title).to.equal('Why do people hate reading?');
          done(err);
        });
      });
    });
  });
});
// Parent block for ANSWERS
describe('POST Answers', () => {
  // TESTS FOR ANSWERS
  describe('/POST /v1/questions/16/answers', () => {
    it('it should NOT POST Answer if question does not exist', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor'
      };
      chai.request(app).post('/questions/16/answers').send(answer).end( (err, res) => {
        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('Question 16 Not Found');
        done(err);
      });
    });
  });

  describe('/POST /v1/questions/1/answers', () => {
    it('it should NOT POST Answer if the BODY is Not provided', (done) => {
      const answer = {
        username: 'TheoOkafor'
      };
      chai.request(app).post('/questions/1/answers').send(answer).end( (err, res) => {
        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body.message).to.equal('Bad Request. Answer must have a body.');
        done(err);
      });
    });
  });

  describe('/POST /v1/questions/1/answers', () => {
    it('it should POST answer if all the required fields are provided', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        username: 'TheoOkafor'
      };
      chai.request(app).post('/questions/1/answers').send(answer).end( (err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message');
        chai.expect(res.body).to.have.property('question');
        done(err);
      });
    });
  });
});*/