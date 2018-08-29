// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';

chai.use(chaiHttp);

// Parent block for QUESTIONS
describe('Questions', () => {
  describe('GET QUESTIONS', () => {
    // Test the /GET route
    describe('GET /questions', () => {
      it('it should return error 500', (done) => {
        chai.request(app).get('/questions').end((err, res) => {
          //chai.expect(res).to.have.status(500);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.status).to.equal('failed');
          done(err);
        });
      });
    });

    describe('GET /v1/questions/gabyy', () => {
      it('it should return error 400', (done) => {
        chai.request(app).get('/v1/questions/gabyy').end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.status).to.equal('failed');
          chai.expect(res.body.message).to.equal('Bad Request,'
            + ' URL id: must an integer');
          done(err);
        });
      });
    });

    // Test the /GET route
    describe('GET /questions', () => {
      it('it should GET all the questions', (done) => {
        chai.request(app).get('/v1/questions').end((err, res) => {
          //chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.status).to.equal('successful');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.message).to.equal('Questions found');
          done(err);
        });
      });
    });

    // GET A QUESTION FROM QUESTIONS TEST
    describe('GET /v1/questions/2', () => {
      it('it should GET the question with id = 2', (done) => {
        chai.request(app).get('/v1/questions/2').end((err, res) => {
          //chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.status).to.equal('successful');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.message).to.equal('Question 2 found');
          chai.expect(res.body).to.have.property('data');
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/100', () => {
      it('it should return \'Question 100 Not Found\'', (done) => {
        chai.request(app).get('/v1/questions/100').end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.status).to.equal('failed');
          chai.expect(res.body.message).to.equal('Question 100 Not Found');
          done(err);
        });
      });
    });
  });

  // POST QUESTIONS TEST
  describe('POST QUESTIONS', () => {
    describe('/POST /v1/questions', () => {
      it('it should NOT POST Question if the TITLE is Not'
        + ' provided', (done) => {
        const question = {
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions').send(question)
          .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.message).to.equal('Bad Request.'
            + ' Question must have a title');
          done(err);
        });
      });
    });

    describe('/POST /v1/questions', () => {
      it('it should POST Question if all the required'
       +' fields are provided', (done) => {
        const question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .send(question).end((err, res) => {
            //chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body).to.have.property('metadata');
            chai.expect(res.body.status).to.equal('successful');
            chai.expect(res.body.message).to.equal('New question added');
            done(err);
          });
      });
    });

    describe('GET /v1/questions/5', () => {
      it('it should GET the question 5 that was just POSTed', (done) => {
        chai.request(app).get('/v1/questions/5')
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.status).to.equal('successful');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.data).to.have.property('title');
            chai.expect(res.body.data.title).to
              .equal('Why do people hate reading?');
            done(err);
          });
      });
    });

    describe('DELETE /v1/questions/20', () => {
      it('it should NOT DELETE question 20', (done) => {
        chai.request(app).delete('/v1/questions/20')
          .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body.message).to.equal('Question 20 not found');
            done(err);
          });
      });
    });

    describe('DELETE /v1/questions/4', () => {
      it('it should DELETE question 4', (done) => {
        chai.request(app).delete('/v1/questions/4')
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.status).to.equal('successful');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body.message).to.equal('Question 4 deleted');
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
        body: 'Lorem ipsum dolor sit amet, consectetur',
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/16/answers').send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.message).to.equal('Question 16 Not Found');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/1/answers', () => {
    it('it should NOT POST Answer if the BODY is Not provided', (done) => {
      const answer = {
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/1/answers').send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.status).to.equal('failed');
          chai.expect(res.body.message).to.equal('Bad Request.'
        + ' Answer must have a body.');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/1/answers', () => {
    it('it should POST answer if all the required'
      + ' fields are provided', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/1/answers').send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body).to.have.property('metadata');
          chai.expect(res.body.status).to.equal('successful');
          chai.expect(res.body.message).to.equal('New answer added');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/1/answers/1', () => {
    it('it should ACCEPT answer 1 in question 1', (done) => {
      const request = {
        value: true,
      };
      chai.request(app).put('/v1/questions/1/answers/1').send(request)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('metadata');
          chai.expect(res.body).to.have.property('status');
          chai.expect(res.body.status).to.equal('successful');
          chai.expect(res.body.message).to.equal('Answer 1 has been accepted');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/100/answers/1', () => {
    it('it should return error message for inexistent questions',
     (done) => {
      const request = {
        value: true,
      };
      chai.request(app).put('/v1/questions/100/answers/1').send(request)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('status');
          chai.expect(res.body.status).to.equal('failed');
          chai.expect(res.body.message).to.equal('Question 100 not found');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/100/answers/1', () => {
    it('it should return error messages when no/bad value',
      (done) => {
      const request = {
        value: 'true',
      };
      chai.request(app).put('/v1/questions/2/answers/2').send(request)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('status');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body.status).to.equal('failed');
          chai.expect(res.body.message).to
            .equal('Bad Request. '
            + 'Expected a request body with {value: true || false}');
          done(err);
        });
    });
  });
});

// Parent block for AUTHENTICATION
describe('USER AUTHENTICATION', () => {

  //SIGN UP
  describe('USER SIGN-UP', () => {
    describe('POST /v1/auth/signup', () => {
      it('it should SIGNUP user if required details are provided', (done) => {
        const userReq = {
          username: "umeryui646",
          email: "gheti3123@yahoo.com",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body).to.have.property('metadata');
            chai.expect(res.body.metadata).to.have.property('auth');
            chai.expect(res.body.metadata).to.have.property('token');
            chai.expect(res.body.metadata.auth).to.equal(true);
            chai.expect(res.body.status).to.equal('successful');
            chai.expect(res.body.message).to
              .equal('New user created.');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL is not provided', (done) => {
        const userReq = {
          username: "umeryui",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to.deep
            .equal('Bad request. username, email and password are all required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if USERNAME is not provided', (done) => {
        const userReq = {
          username: "umeryui",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to.deep
            .equal('Bad request. username, email and password are all required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL already exists', (done) => {
        const userReq = {
          username: "Nchabomo",
          email: "gheti31@yahoo.com",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(409);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to
            .equal('Conflict. Email already exists, consider sign-in');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if USERNAME already exists', (done) => {
        const userReq = {
          username: "umeryui",
          email: "gheti312@yahoo.com",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(409);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to
            .equal('Conflict. Username already exists, consider sign-in');
            done(err);
          });
      });
    });
  });

  //SIGN IN
  describe('USER SIGNIN', () => {
    describe('POST /v1/auth/signin', () => {
      it('it should SIGNIN user if required details are provided', (done) => {
        const userReq = {
          username: "TheoOkafor",
          password: "gattusosgood",
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body).to.have.property('metadata');
            chai.expect(res.body.metadata).to.have.property('auth');
            chai.expect(res.body.metadata).to.have.property('token');
            chai.expect(res.body.metadata.auth).to.equal(true);
            chai.expect(res.body.status).to.equal('successful');
            chai.expect(res.body.message).to
              .equal('User has been logged in');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if USERNAME or EMAIL is not provided', (done) => {
        const userReq = {
          password: "password",
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to.deep
            .equal('Bad request. username, email and password are all required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if EMAIL does not exists', (done) => {
        const userReq = {
          email: "grabby@yahoo.com",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to
            .equal('User not found, consider signing up.');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if USERNAME does not exists', (done) => {
        const userReq = {
          username: "umeryuiwe",
          password: "password",
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.status).to.equal('failed');
            chai.expect(res.body.message).to
            .equal('User not found, consider signing up.');
            done(err);
          });
      });
    });
  });

});
