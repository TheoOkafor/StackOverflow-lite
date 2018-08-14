// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const data = require('../data/data');
const app = require('../app');

chai.use(chaiHttp);
// Our parent block
describe('Questions', () => {
  // Test the /GET route
  describe('/GET questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
        .get('/questions')
        .end((err, res) => {
          chai.expect(200);
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
          chai.expect(200);
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
});
