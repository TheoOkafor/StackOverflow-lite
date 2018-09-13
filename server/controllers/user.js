import express from 'express';
import db from '../db';

const user = (req, res, next) => {
	const requestId = req.params.id;

  db.task('get-user-everything', t => {
  	return t.multi(`SELECT username, email, created, modified FROM users
    WHERE ID=$1; SELECT * FROM answers	WHERE USERID=$1;`, req.params.id)
      .then(result => {
      	const user = [];
      	user.push(result);
		  	return t.map(`SELECT * FROM questions	WHERE USERID=$1;`, req.params.id, question => {
		  		return t.any('SELECT * FROM answers WHERE questionid=$1', question.id)
		  			.then(answers => {
		  				question.answers = answers;
		  				user.push(question);
		  				return user;
		  			})
		  	});
  		}).then(t.batch);
  })
  	.then(output => {
    	let result = output[0];
    	let questions = [];
    	for (let i=1; i<result.length; i++) {
    		questions.push(result[i]);
    	}
    	let data = result[0][0][0];
    	data.questions = questions;
    	data.answers = result[0][1];

			res.status(200);
	    res.json({
	    		statusCode: 200,
	    		message: 'User found',
	    		data,
	    });
	    return res;
  	})
	  .catch( error => {
	  	console.log(error);
	  });
}

export default user;
