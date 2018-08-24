import express from 'express';
import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';

const signup = (req, res) => {
	const	username= req.body.username;
  const email = req.body.email;
  const password = req.body.password;
	const request = {
    text: 'SELECT * FROM users'
      + ' WHERE email = $1 OR username = $2',
    values: [
    	email,
      username,
    ],
  };

	db.one(request.text, request.values)
    .then((data) => {
      const validPassword = bcrypt.compareSync(password, data.password);
      if (data.id===undefined){
        res.status(404);
        res.json({
          status: 'failed',
          message: 'User not found',
        });
      } else if (!validPassword){
        res.status(401);
        res.json({
          status: 'failed',
          message: 'Incorrect password',
          metadata: {
            auth: false,
            token: null,
          }
        });
      } else {
      	//create a token
      	const token = jwt.sign(
      		{ id: data.id },
      		config.secret,
      		{ expiresIn: 86400 }//expires in 24hours
      	);
      	
        res.status(200);
        res.json({
          status: 'successful',
          message: 'User has been logged in',
          data: {
          	username: data.username,
          },
          metadata: {
          	auth: true,
          	token: token,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({
        status: 'failed',
        message: 'Server could not complete request',
        data: {
        	username: req.body.username,
        	email: req.body.email,
        },
      });
    });
}

export default signup;
