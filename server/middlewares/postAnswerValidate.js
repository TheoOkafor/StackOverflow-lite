import express from 'express';

/**
 * This middleware validates the POST answer request body
 * @param  {JSON | object}   req - The user request to the API
 * @param  {JSON | object}   res - The server response to the user
 * @param  {Function} next - sends the request to the next middleware
 *  or controller
 * @return {JSON | object} - Error message or next callback
 */
const postAnswerValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.body === null || reqBody.body === undefined;

  /**
   * Checks whether the request is valid or not
   * @param  {Boolean} invalidReq - ```true``` or ```false```
   * @return {JSON | object} - returns the error message or the next callback
   */
  if (invalidReq) {
    const err = new Error('Bad Request. Answer must have a body.');
    res.status(400);
    res.json({
      status: 'failed',
      message: err.message,
      data: reqBody,
    });
  } else {
    return next();
  }
};

export { postAnswerValidate };
