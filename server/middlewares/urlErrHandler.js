import express from 'express';
/**
 * Handles the URL errors that comes with requests
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}   error message.
 */
const urlErrHandler = (req, res) => {
  const err = new Error('Bad Request, URL id: must an integer');
  res.status(400);
  res.json({
    status: 'failed',
    message: err.message,
  });
};

export { urlErrHandler };
