const data = require('../data/data');
const questions = data.questions;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Questions', () => {

  //Test the /GET route
  describe('/GET questions', () => {
    it('it should GET all the questions', (done) => {
      chai.request(app)
     .get('/questions')
     .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
    });
  });

});