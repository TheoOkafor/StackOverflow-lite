import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const signup = (req, res) => {
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	const timeNow = new Date().toUTCString();
	const	username= req.body.username;
	const email = req.body.email;
	const created = timeNow;
	const modified = timeNow;
	const request = {
    text: 'INSERT INTO users'
      + ' (username, email, password, created, modified)'
      + ' VALUES ($1, $2, $3, $4, $5)'
      + ' RETURNING ID',
    values: [
    	username,
    	email,
    	hashedPassword,
    	created,
    	modified,
    ],
  };

	db.one(request.text, request.values)
    .then((data) => {
    	//create a token
    	const token = jwt.sign(
    		{ id: data.id },
    		config.secret,
    		{ expiresIn: 86400 }//expires in 24hours
    	);

      res.status(201);
      res.json({
        status: 'successful',
        message: 'New user created.',
        data: {
        	userID: data.id,
        },
        metadata: {
        	auth: true,
        	token: token,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({
        status: 'failed',
        message: 'Server could not register user',
        data: {
        	username: req.body.username,
        	email: req.body.email,
        },
      });
    });
}

export default signup;
