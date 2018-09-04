import express from 'express';
/**
 * Handles the URL errors that comes with requests
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}   error message.
 */
const getValidate = (req, res, next) => {
	if (req.method !== 'GET') {
    res.status(405);
    res.json({
      statusCode: 405,
      error: 'Current HTTP request method is not allowed on this URI',
    });
    return res;
  } else {
  	return next();
  }
};

export default getValidate;
