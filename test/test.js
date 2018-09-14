// Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const loginDetails = {
  email: 'testertheo@email.com',
  password: 'password',
};

const registerDetails = {
  email: 'testertheo@email.com',
  username: 'testertheo',
  password: 'password',
};

const otherSignup = {
  email: 'teddy12@email.com',
  username: 'teddy12',
  password: 'password',
};

let token = '';
let otherToken = '';
// Parent block for QUESTIONS
describe('Questions', () => {
  describe('GET QUESTIONS', () => {
    // Test the /GET route

    describe('GET /v1/questions/gabyy', () => {
      it('it should return error 400', (done) => {
        chai.request(app).get('/v1/questions/gabyy').end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Bad URL and/or request method');
          done(err);
        });
      });
    });

    describe('GET /v1/questions', () => {
      it('it should return error 405', (done) => {
        chai.request(app).patch('/v1/questions').end((err, res) => {
          chai.expect(res).to.have.status(405);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.statusCode).to.equal(405);
          chai.expect(res.body.error).to
            .equal('Current HTTP request method is not allowed on this URI');
          done(err);
        });
      });
    });

    // Test the /GET route
    describe('GET /questions', () => {
      it('it should GET all the questions', (done) => {
        chai.request(app).get('/v1/questions').end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.statusCode).to.equal(200);
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
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.statusCode).to.equal(200);
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.message).to.equal('Question 2 found');
          chai.expect(res.body).to.have.property('data');
          done(err);
        });
      });
    });

    describe('/GET /v1/questions/100', () => {
      it('it should return Question 100 Not Found', (done) => {
        chai.request(app).get('/v1/questions/100').end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).be.a('object');
          chai.expect(res.body.statusCode).to.equal(404);
          chai.expect(res.body.error).to.equal('Question 100 Not Found');
          done(err);
        });
      });
    });
  });

  // POST QUESTIONS TEST
  describe('POST QUESTIONS', () => {
    describe('POST /v1/auth/signup', () => {
      it('it should SIGNUP user if required details are provided', (done) => {
        chai.request(app).post('/v1/auth/signup')
          .send(registerDetails).end((err, res) => {
            chai.expect(res).to.have.status(201);
            token = res.header['x-access-token'];
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should SIGNUP user if required details are provided', (done) => {
        chai.request(app).post('/v1/auth/signup')
          .send(otherSignup).end((err, res) => {
            chai.expect(res).to.have.status(201);
            otherToken = res.header['x-access-token'];
            done(err);
          });
      });
    });


    describe('/POST /v1/questions', () => {
      it('it should NOT POST Question if the TITLE is Not'
        + ' provided', (done) => {
        const question = {
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .set('x-access-token', token)
          .send(question)
          .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.error).to
              .equal('Question must have title and body');
            done(err);
          });
      });
    });

    describe('/POST /v1/questions', () => {
      it('it should NOT POST Question if the TITLE provided'
        + ' is empty', (done) => {
        const question = {
          title: '     ',
          body: 'hghsg hsghsdg shdgshdgssgdh',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .set('x-access-token', token)
          .send(question)
          .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.error).to
              .equal('Question title and body must not be empty');
            done(err);
          });
      });
    });

    describe('/POST /v1/questions', () => {
      it('it should POST Question if all the required'
       + ' fields are provided', (done) => {
        const question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .set('x-access-token', token)
          .send(question)
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.statusCode).to.equal(201);
            chai.expect(res.body.message).to.equal('New question added');
            done(err);
          });
      });
    });

    describe('POST /v1/questions', () => {
      it('it should NOT POST question IF NOT LOGGED IN', (done) => {
        const question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .send(question).end((err, res) => {
            chai.expect(res).to.have.status(403);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.property('auth');
            chai.expect(res.body.error).to.equal('Token not provided');
            done(err);
          });
      });
    });

    describe('POST /v1/questions', () => {
      it('it should NOT POST question IF INCORRECT AUTH', (done) => {
        const question = {
          title: 'Why do people hate reading?',
          body: 'Lorem ipsum dolor sit amet, consectetur',
          username: 'TheoOkafor',
        };
        chai.request(app).post('/v1/questions')
          .set('x-access-token', null)
          .send(question)
          .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.error).to
              .equal('could not authenticate the token');
            done(err);
          });
      });
    });

    describe('DELETE /v1/questions/100', () => {
      it('it should NOT DELETE question 100', (done) => {
        chai.request(app).delete('/v1/questions/100')
          .set('x-access-token', token)
          .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.statusCode).to.equal(404);
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.error).to.equal('Question 100 not found');
            done(err);
          });
      });
    });

    describe('DELETE /v1/questions/3', () => {
      it('it should NOT DELETE question 3', (done) => {
        chai.request(app).delete('/v1/questions/3')
          .set('x-access-token', token)
          .end((err, res) => {
            chai.expect(res).to.have.status(403);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.statusCode).to.equal(403);
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.error).to
              .equal('You are not authorised to complete this action');
            done(err);
          });
      });
    });

    describe('DELETE /v1/questions/5', () => {
      it('it should DELETE question 5', (done) => {
        chai.request(app).delete('/v1/questions/5')
          .set('x-access-token', token)
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body.statusCode).to.equal(201);
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body.message).to.equal('Question 5 deleted');
            done(err);
          });
      });
    });
  });
});
// Parent block for ANSWERS
describe('POST Answers', () => {
  // TESTS FOR ANSWERS
  //
  describe('/POST /v1/questions', () => {
    it('it should POST Question if all the required'
       + ' fields are provided', (done) => {
      const question = {
        title: 'Why do people hate reading?',
        body: 'Lorem ipsum dolor sit amet, consectetur',
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions')
        .set('x-access-token', token)
        .send(question)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to.equal('New question added');
          done(err);
        });
    });
  });

  describe('/POST /v1/questions/100/answers', () => {
    it('it should NOT POST Answer if question does not exist', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur',
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/100/answers')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.error).to.equal('Question 100 Not Found');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers', () => {
    it('it should NOT POST Answer if the BODY is empty', (done) => {
      const answer = {
        body: '    ',
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/6/answers')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Answer body must not be empty');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers', () => {
    it('it should NOT POST Answer if the BODY is Not provided', (done) => {
      const answer = {
        username: 'TheoOkafor',
      };
      chai.request(app).post('/v1/questions/6/answers')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to.equal('Answer must have a body');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers', () => {
    it('it should POST answer if all the required'
      + ' fields are provided', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'TheoOkafor',
      };

      chai.request(app).post('/v1/questions/6/answers')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to.equal('New answer added');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers', () => {
    it('it should POST answer if all the required'
      + ' fields are provided', (done) => {
      const answer = {
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
      };

      chai.request(app).post('/v1/questions/6/answers')
        .set('x-access-token', otherToken)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to.equal('New answer added');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should ACCEPT answer if all the required'
      + ' fields are provided', (done) => {
      const answer = {
        value: true,
      };
      chai.request(app).put('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('Answer 19 has been accepted');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should UNACCEPT answer if all the required'
      + ' fields are provided', (done) => {
      const answer = {
        value: false,
      };
      chai.request(app).put('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          // chai.expect(res).to.have.status(201);
          // chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('Answer 19 has been unaccepted');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should NOT ACCEPT answer if invalid value'
      + ' fields are provided', (done) => {
      const answer = {
        value: 'true',
      };
      chai.request(app).put('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Expected a request body with {value: true || false}');
          done(err);
        });
    });
  });

  // Update Answer
  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should UPDATE answer if all the required'
      + ' fields are provided', (done) => {
      const update = {
        body: 'This is how it goes',
      };
      chai.request(app).put('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('Answer 19 has been updated');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should not UPDATE answer if body is empty spaces',
      (done) => {
        const update = {
          body: '  ',
        };
        chai.request(app).put('/v1/questions/6/answers/19')
          .set('x-access-token', token)
          .send(update)
          .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('Answer body must not be empty');
            done(err);
          });
      });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should not UPDATE answer if answer is not there',
      (done) => {
        const update = {
          body: ' Technical reeber ',
        };
        chai.request(app).put('/v1/questions/6/answers/90')
          .set('x-access-token', token)
          .send(update)
          .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(404);
            chai.expect(res.body.error).to
              .equal('Question 6 or answer 90 not found');
            done(err);
          });
      });
  });

  describe('PUT /v1/questions/6/answers/20', () => {
    it('it should not UPDATE answer if body is not provided',
      (done) => {
        const update = {
          value: 'bigger you I pray',
        };
        chai.request(app).put('/v1/questions/6/answers/20')
          .set('x-access-token', otherToken)
          .send(update)
          .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('Answer must have a body');
            done(err);
          });
      });
  });

  describe('PUT /v1/questions/6/answers/19', () => {
    it('it should NOT ACCEPT answer if user is not authenticated', (done) => {
      const answer = {
        value: true,
      };
      const fakeToken = otherToken;

      chai.request(app).put('/v1/questions/6/answers/19')
        .set('x-access-token', fakeToken)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(403);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(403);
          chai.expect(res.body.error).to
            .equal('You are not authorised to complete this action');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/61/answers/19', () => {
    it('it should NOT ACCEPT answer if No Question', (done) => {
      const answer = {
        value: true,
      };
      chai.request(app).put('/v1/questions/61/answers/19')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.error).to
            .equal('Question 61 or answer 19 not found');
          done(err);
        });
    });
  });

  describe('PUT /v1/questions/6/answers/31', () => {
    it('it should NOT ACCEPT answer if No Answer'
      + ' fields are provided', (done) => {
      const answer = {
        value: true,
      };
      chai.request(app).put('/v1/questions/6/answers/31')
        .set('x-access-token', token)
        .send(answer)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.error).to
            .equal('Question 6 or answer 31 not found');
          done(err);
        });
    });
  });
});

// Parent Block for COMMENTS
describe('COMMENTS', () => {
  describe('POST /v1/questions/6/answers/20/comments', () => {
    it('it should post COMMENT', (done) => {
      const update = {
        body: ' Technical reeber, haha',
      };
      chai.request(app).post('/v1/questions/6/answers/20/comments')
        .set('x-access-token', otherToken)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('New comment added');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/19/comments', () => {
    it('it should not post COMMENT without body', (done) => {
      const update = {
        body: '    ',
      };
      chai.request(app).post('/v1/questions/6/answers/19/comments')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Comment body must not be empty');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/19/comments', () => {
    it('it should not post COMMENT without body', (done) => {
      const update = {
        value: 'How we role',
      };
      chai.request(app).post('/v1/questions/6/answers/19/comments')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Comment must have a body');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/19/answers/19/comments', () => {
    it('it should not post COMMENT if Question do not exist', (done) => {
      const update = {
        body: 'How we role',
      };
      chai.request(app).post('/v1/questions/19/answers/19/comments')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(404);
          chai.expect(res.body.error).to
            .equal('Question 19 or answer 19 not found');
          done(err);
        });
    });
  });
}); // End of COMMENTS block


// Parent Block for VOTES
describe('VOTES', () => {
  describe('POST /v1/questions/6/answers/20', () => {
    it('it should post UPVOTE', (done) => {
      const update = {
        vote: 'upvote',
      };
      chai.request(app).post('/v1/questions/6/answers/20')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('Answer 20 upvoted');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/20', () => {
    it('it should post DOWNVOTE', (done) => {
      const update = {
        vote: 'downvote',
      };
      chai.request(app).post('/v1/questions/6/answers/20')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body.statusCode).to.equal(201);
          chai.expect(res.body.message).to
            .equal('Answer 20 downvoted');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/20', () => {
    it('it should not post vote more than once', (done) => {
      const update = {
        vote: 'upvote',
      };
      chai.request(app).post('/v1/questions/6/answers/20')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(409);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(409);
          chai.expect(res.body.error).to
            .equal('You have voted on this answer before');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/19/answers/19', () => {
    it('it should not post VOTE if Question do not exist', (done) => {
      const update = {
        vote: 'upvote',
      };
      chai.request(app).post('/v1/questions/19/answers/19')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(404);
          chai.expect(res.body.error).to
            .equal('Question 19 or answer 19 not found');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/19', () => {
    it('it should not post empty VOTE', (done) => {
      const update = {
        vote: '    ',
      };
      chai.request(app).post('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Vote must not be empty (UPVOTE or DOWNVOTE)');
          done(err);
        });
    });
  });

  describe('POST /v1/questions/6/answers/19', () => {
    it('it should not post if VOTE is not provided', (done) => {
      const update = {
        body: 'upvote',
      };
      chai.request(app).post('/v1/questions/6/answers/19')
        .set('x-access-token', token)
        .send(update)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(400);
          chai.expect(res.body.error).to
            .equal('Vote must be specified (UPVOTE or DOWNVOTE)');
          done(err);
        });
    });
  });
}); // End of Votes Block


// Parent block for AUTHENTICATION
//

describe('USER AUTHENTICATION', () => {
  // SIGN UP
  describe('USER SIGN-UP', () => {
    describe('POST /v1/auth/signup', () => {
      it('it should SIGNUP user if required details are provided', (done) => {
        const userReq = {
          username: 'umeryui',
          email: 'gheti31@yahoo.com',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.statusCode).to.equal(201);
            chai.expect(res.body.message).to
              .equal('New user created.');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL is not provided', (done) => {
        const userReq = {
          username: 'umeryui',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('Username, email and password are all required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it(`it should NOT SIGNUP user if EMAIL or USERNAME
        is provided is just spaces`, (done) => {
        const userReq = {
          email: '     ',
          username: 'umeryui',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('Username, email and/or password should not be empty');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL provided is bad', (done) => {
        const userReq = {
          email: 'theookafor@theo',
          username: 'theo',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('The email provided is invalid');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it(`it should NOT SIGNUP user if USERNAME 
          provided is too long`, (done) => {
        const userReq = {
          email: 'theookafor@theo.com',
          username: 'theowhisterrastatfaraiyihsgdhgjgjgnfgfh',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('The username provided is too long. (max-length: 19)');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it(`it should NOT SIGNUP user if USERNAME 
          provided is too short`, (done) => {
        const userReq = {
          email: 'theookafor@theo.com',
          username: 'theo',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('The username provided is too short. (min-length: 6)');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it(`it should NOT SIGNUP user if PASSWORD 
          provided is too short`, (done) => {
        const userReq = {
          email: 'theookafor@theo.com',
          username: 'theotester',
          password: 'pass',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('The password provided is too short. (min-length: 6)');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL is not provided', (done) => {
        const userReq = {
          username: 'umeryui',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('Username, email and password are all required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if EMAIL already exists', (done) => {
        const userReq = {
          username: 'Nchabomo',
          email: 'gheti31@yahoo.com',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(409);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(409);
            chai.expect(res.body.error).to
              .equal('Account already exists, consider signing in');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signup', () => {
      it('it should NOT SIGNUP user if USERNAME already exists', (done) => {
        const userReq = {
          username: 'umeryui',
          email: 'gheti312@yahoo.com',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signup')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(409);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(409);
            chai.expect(res.body.error).to
              .equal('Account already exists, consider signing in');
            done(err);
          });
      });
    });
  });

  // SIGN IN
  describe('USER SIGNIN', () => {
    describe('POST /v1/auth/signin', () => {
      it('it should SIGNIN user if required details are provided', (done) => {
        chai.request(app).post('/v1/auth/signin')
          .send(loginDetails).end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.header).to.have.property('x-access-token');
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('message');
            chai.expect(res.body).to.have.property('data');
            chai.expect(res.body.statusCode).to.equal(200);
            chai.expect(res.body.message).to
              .equal('User has been logged in');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if EMAIL provided is bad', (done) => {
        const userReq = {
          email: 'theookafor@theo',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('The email provided is invalid');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if EMAIL or password provided is empty', 
          (done) => {
        const userReq = {
          email: '       ',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('email or password should not be empty');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if PASSWORD is incorrect', (done) => {
        const userReq = {
          email: 'testertheo@email.com',
          password: 'password1',
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(401);
            chai.expect(res.body.error).to
              .equal('Incorrect password');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it(`it should NOT SIGNIN user if USERNAME or EMAIL is 
          not provided`, (done) => {
        const userReq = {
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(400);
            chai.expect(res.body.error).to
              .equal('email and password are required');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/signin', () => {
      it('it should NOT SIGNIN user if EMAIL does not exists', (done) => {
        const userReq = {
          email: 'theo234@yahoo.com',
          password: 'password',
        };
        chai.request(app).post('/v1/auth/signin')
          .send(userReq).end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.body).to.have.property('error');
            chai.expect(res.body.statusCode).to.equal(404);
            chai.expect(res.body.error).to
              .equal('User not found, consider signing up.');
            done(err);
          });
      });
    });

    describe('POST /v1/auth/logout', () => {
      it('it SIGNOUT user', (done) => {
        chai.request(app).get('/v1/auth/logout')
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.header['x-access-token']).to.equal('null');
            chai.expect(res.body.statusCode).to.equal(200);
            chai.expect(res.body.message).to.equal('User has been logged out');
            done(err);
          });
      });
    });
  });
});

// Parent block for USERS
describe('GET User', () => {
  // TESTS FOR USER
  describe('POST /v1/users/2', () => {
    it('it should GET USER', (done) => {
      chai.request(app).get('/v1/users/2')
        .send(loginDetails).end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('message');
          chai.expect(res.body).to.have.property('data');
          chai.expect(res.body.statusCode).to.equal(200);
          chai.expect(res.body.message).to.equal('User found');
          done(err);
        });
    });
  });

  describe('POST /v1/users/100', () => {
    it('it should not GET USER that does not exist', (done) => {
      chai.request(app).get('/v1/users/100')
        .send(loginDetails).end((err, res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.be.a('object');
          chai.expect(res.body).to.have.property('error');
          chai.expect(res.body.statusCode).to.equal(404);
          chai.expect(res.body.error).to.equal('User not found');
          done(err);
        });
    });
  });
});
