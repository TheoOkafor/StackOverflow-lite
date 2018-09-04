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
const signupReqValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = !reqBody.email.trim() || !reqBody.username.trim()
    || !reqBody.password.trim();

  if (invalidReq) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: 'Username, email and password are all required',
    });
    return res;
  // Check whether EMAIL is valid
  } if (!emailValidator.validate(reqBody.email)) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: 'The email provided is invalid',
    });
    return res;

  // Check whether EMAIL length is acceptable
  } if (reqBody.email.trim().length >= 40) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: `The email provided is too long.
       (${reqBody.email.trim().length})`,
    });
    return res;

  // Check whether USERNAME length is acceptable
  } if (reqBody.username.trim().length >= 19) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: `The username provided is too long.
       (${reqBody.username.trim().length})`,
    });
    return res;
  } if (reqBody.username.trim().length < 6) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: `The username provided is too short.
       (${reqBody.username.trim().length})`,
    });
    return res;

  // Check whether PASSWORD length is acceptable
  } if (reqBody.password.trim().length < 6) {
    res.status(400);
    res.json({
      statusCode: 400,
      error: `The password provided is too short.
       (${reqBody.password.trim().length})`,
    });
    return res;
  }
  return next();
};

export { signupReqValidate };
