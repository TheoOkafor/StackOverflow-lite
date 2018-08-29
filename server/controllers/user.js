import express from 'express';
import db from '../db';

const user = (req, res, next) => {
	User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err){
    	res.status(500);
    	res.json({
    		status: 'failed',
    		massage: 'Error occurred while finding user',
    	});
    }
    if (!user) { 
    	res.status(404);
    	res.json({
    		status: 'failed',
    		message: 'User not found',
    	});
    }
    res.status(200);
    res.json({
    		status: 'successful',
    		message: 'User found',
    		data: user,
    });
  });
}

export default user;
