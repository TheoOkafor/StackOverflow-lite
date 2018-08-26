import express from 'express';
/**
 * This middleware validates the accept answer endpoint
 * @param  {JSON Object}   req - contains the request body from user
 * @param  {JSON Object}   res - contains the response to the request
 * @param  {Function} next moves to the next middleware if the request is valid
 * @return {JSON object}
 */

const acceptAnswerValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;
  /**
   * Is true if request has no value property or 
   * value of the value property is not boolean.
   * @type {boolean}
   */
  const invalidReq = reqBody.value === undefined
    || typeof reqBody.value !== "boolean";
    /**
     * Checks to see if the value property is defined and has boolean value
     * @param  {boolean} invalidReq 
     * @return {JSON object} - containing error message
     */
  if (invalidReq) {
    const err = new Error('Bad Request. '
      + 'Expected a request body with {value: true || false}');
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

export { acceptAnswerValidate };
