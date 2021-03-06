import db from '../db';

/**
 * This middleware validates the accept answer endpoint
 * @param  {JSON | object}   req - contains the request body from user
 * @param  {JSON | object}   res - contains the response to the request
 * @param  {Function} next moves to the next middleware if the request is valid
 * @return {JSON | object}
 */

const deleteQuestionValidate = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const reqId = parseInt(req.userId, 10);

  db.any('SELECT * FROM questions WHERE id = $1', [id])
    .then((data) => {
      const ownerId = parseInt(data[0].userid, 10);

      if (ownerId === reqId) {
        return next();
      }
      res.status(403);
      res.json({
        statusCode: 403,
        error: 'You are not authorised to complete this action',
      });
      return res;
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
      res.json({
        statusCode: 404,
        error: `Question ${id} not found`,
      });
      return res;
    });
};

export default deleteQuestionValidate;
