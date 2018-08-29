import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db';
import config from '../../config';

const validateToken = (req, res, next) => {
	const token = req.headers['x-access-token'];
  if (!token){
    res.status(403);
    res.json({ 
    	auth: false,
    	message: 'Token not provided'
    });
  } else {
  	jwt.verify(token, config.secret, (error, decoded) => {
	    if (error) {
  	    res.status(500)
  	  	res.json({ 
  	  		auth: false,
  	  		message: 'Failed to authenticate token'
  	  	});
  	  } else {
  	  	req.id = decoded.id;
	    	next();
  	  }
	  });
	}
}

export default validateToken;
