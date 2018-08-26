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
 * This function represents the signup controller
 * @param  {JSON object}   req  - request parameters and body
 * The request body should have email or username, and password.
 * @param  {JSON object}   res  - response to the user
 */
const signup = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const timeNow = new Date().toUTCString();
  const	username = req.body.username;
  const email = req.body.email;
  const created = timeNow;
  const modified = timeNow;

  //The SQL request to the database
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
    	// create a token
    	const token = jwt.sign(
    		{ id: data.id },
    		config.secret,
    		{ expiresIn: 86400 }, // expires in 24hours
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
      const usernameExists = `Key (username)=(${username}) already exists.`;
      const emailExists = `Key (email)=(${email}) already exists.`;
      if (error.detail === emailExists) {
        res.status(409);
        res.json({
          status: 'failed',
          message: 'Conflict. Email already exists, consider sign-in',
          data: userData,
        });
      } else if (error.detail === usernameExists) {
        res.status(409);
        res.json({
          status: 'failed',
          message: 'Conflict. Username already exists, consider sign-in',
          data: userData,
        });
      } else {
        res.status(500);
        res.json({
          status: 'failed',
          message: 'Server could not register user',
          data: userData,
        });
      }
    }); 
};

export default signup;
