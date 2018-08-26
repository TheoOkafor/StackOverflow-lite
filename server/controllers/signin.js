/**
 * The signup uses JSON Web Token to manage user authentication
 * Bcrypt is use to encrypt the password stored in the Database
 * DB is the Database setup
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';
import config from '../../config';

/**
 * This function represents the signin controller
 * @param  {JSON object}   req  - request parameters and body
 * The request body should have email or username, and password.
 * @param  {JSON object}   res  - response to the user
 */

const signup = (req, res) => {
  const	username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  //The SQL request to the database
  const request = {
    text: 'SELECT * FROM users'
      + ' WHERE email = $1 OR username = $2',
    values: [
    	email,
      username,
    ],
  };
  
  /**
   * [userData - The public part of the user request data]
   * @type {Object}
   */
  const userData = {
    username: req.body.username,
    email: req.body.email,
  };

  db.one(request.text, request.values)
    .then((data) => {
      const validPassword = bcrypt.compareSync(password, data.password);
      if (!validPassword) {
        res.status(401);
        res.json({
          status: 'failed',
          message: 'Incorrect password',
          data: userData,
          metadata: {
            auth: false,
            token: null,
          },
        });
      } else {
      	// create a token
      	const token = jwt.sign(
      		{ id: data.id },
      		config.secret,
      		{ expiresIn: 86400 }, // expires in 24hours
      	);
        res.status(200);
        res.json({
          status: 'successful',
          message: 'User has been logged in',
          data: userData,
          metadata: {
          	auth: true,
          	token: token,
          },
        });
      }
    })
    .catch((error) => {
      if (error.received === 0){
        res.status(404);
        res.json({
          status: 'failed',
          message: 'User not found, consider signing up.',
          data: userData,
        });
      } else {
        res.status(500);
        res.json({
          status: 'failed',
          message: 'Server could not complete request',
          data: userData,
        });
      }
    });
};

export default signup;
