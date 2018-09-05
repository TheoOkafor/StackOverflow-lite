import express from 'express';
import * as emailValidator from 'email-validator';
/**
 * This function checks the users request body.
 * If the request body does not contain the necessary
 * Information required for the request to go through
 * The request will fail.
 * @param  {JSON | object}   req  - request parameters and body
 * The request body should have email, username and password.
 * @param  {JSON | object}   res  - response to the user
 * @param  {Function} next - callback function
 * @return {function}        returns the next middleware or controller
 * on the route for execution.
 */
const signinReqValidate = (req, res, next) => {
  const reqBody = req.body;
  if ( reqBody.email && reqBody.password) {
    // Check if all fields are provided and are valid:
    const invalidReq = !reqBody.email.trim() || !reqBody.password.trim();

    if (invalidReq) {
      res.status(400);
      res.json({
        statusCode: 400,
        error: 'email or password should not be empty',
      });
    } else if (!emailValidator.validate(reqBody.email)) {
      res.status(400);
      res.json({
        statusCode: 400,
        error: 'The email provided is invalid',
      });
    } else {
      return next();
    }
  } else {
    res.status(400);
    res.json({
      statusCode: 400,
      error: 'email and password are required',
    });
  }
};

export { signinReqValidate };
