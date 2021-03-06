/**
 * The signup uses JSON Web Token to manage user authentication
 * Bcrypt is use to encrypt the password stored in the Database
 * db is the Database setup module
 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';
import config from '../../config';

/**
 * This function represents the signup controller
 * @param  {JSON | object}   req  - request parameters and body
 * The request body should have email or username, and password.
 * @param  {JSON | object}   res  - response to the user
 */
const signup = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const timeNow = new Date().toUTCString();
  const	username = req.body.username;
  const email = req.body.email;
  const created = timeNow;
  const modified = timeNow;

  // The SQL request to the database
  const request = {
    text: `INSERT INTO users 
      (username, email, password, created, modified) 
      VALUES ($1, $2, $3, $4, $5) RETURNING ID`,
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
    	// create a token
    	const token = jwt.sign(
    		{ id: data.id },
    		config.secret,
    		{ expiresIn: 604800 }, // expires in 24hours
      );
      res.header('x-access-token', token);
      res.status(201);
      res.json({
        statusCode: 201,
        message: 'New user created.',
        data: {
          userID: data.id,
          username,
          'x-access-token': token,
        },
      });
    })
    /**
     * Catch Error call-back
     * @param  {Object} error handles the errors resulting from the request.
     * @return {JSON | object}  error 500 message.
     */
    .catch((error) => {
      const usernameExists = `Key (username)=(${username}) already exists.`;
      const emailExists = `Key (email)=(${email}) already exists.`;
      /**
       * This checks if the error object has the detail property
       * With the values being checked for
       * @param  {String} error.detail a string value
       * @return {JSON | object} Either 409 or 500 error message.
       */
      if (error.detail === emailExists || error.detail === usernameExists) {
        res.status(409);
        res.json({
          statusCode: 409,
          error: 'Account already exists, consider signing in',
        });
      }
    });
};

export default signup;
