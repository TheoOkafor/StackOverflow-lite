import express from 'express';
/**
 * This function checks the users request body.
 * If the request body does not contain the necessary
 * Information required for the request to go through
 * The request will fail.
 * @param  {JSON object}   req  - request parameters and body
 * The request body should have email, username and password.
 * @param  {JSON object}   res  - response to the user
 * @param  {Function} next - callback function
 * @return {function}        returns the next middleware or controller
 * on the route for execution.
 */
const signupReqValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.email === undefined
    || reqBody.username === undefined || reqBody.password === undefined;

  if (invalidReq) {
    res.status(400);
    res.json({
      status: 'failed',
      message: 'Bad request. username, email and password are all required',
      data: {
        email: reqBody.email,
        username: reqBody.username,
      },
    });
  } else {
    return next();
  }
};

export { signupReqValidate };
