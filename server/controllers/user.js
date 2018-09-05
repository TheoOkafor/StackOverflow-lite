import express from 'express';
import db from '../db';

const user = (req, res, next) => {
	const request = {
    text: `SELECT username, email, created, modified FROM users
    WHERE ID=$1;
    SELECT * FROM questions WHERE userid=$1;
    SELECT * FROM answers WHERE userid=$1`,
    values: [req.params.id],
  };
	db.multi(request.text, request.values) 
		.then((user) => {
    	if (user[0].length<1) { 
	    	res.status(404);
	    	res.json({
	    		statusCode: 404,
	    		error: 'User not found',
	    	});
	    	return res;
	    } else {
	    	const userDetails = user[0][0];
	    	const data = {
	    		userDetails,
	    	};
	    	data.userDetails.questions= user[1];
	    	data.userDetails.answers= user[2];

		    res.status(200);
		    res.json({
		    		statusCode: 200,
		    		message: 'User found',
		    		data,
		    });
		    return res;
		  }
	  })
	  .catch( error => {
	  	if (error){
	    	res.status(500);
	    	res.json({
	    		statusCode: 500,
	    		error: 'Error occurred while finding user',
	    	});
	    	return res;
	    }
	  });
}

export default user;
