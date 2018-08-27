import express from 'express';

/**
 * This middleware validates the POST question request body
 * @param  {JSON | object}   req - The user request to the API
 * @param  {JSON | object}   res - The server response to the user
 * @param  {Function} next - sends the request to the next middleware
 *  or controller
 * @return {JSON | object} - Error message or next callback
 */
const postQuestionValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.title === null || reqBody.title === undefined;

  /**
   * Checks whether the request is valid or not
   * @param  {Boolean} invalidReq - ```true``` or ```false```
   * @return {JSON | object} - returns the error message or the next callback
   */
  if (invalidReq) {
    const err = new Error('Bad Request. Question must have a title');
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

export { postQuestionValidate };
