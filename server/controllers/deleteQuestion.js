import db from '../db';
/**
 * This controller handles the deletion of questions
 * @param  {JSON | object}   req  - request parameters and body
 * The req body contains the URL parameter which is the question ID
 * @param  {JSON | object}   res  - response to the user
 * @return {JSON | object}     Success or error message.
 */
const deleteQuestion = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const request = 'DELETE FROM questions WHERE ID = $1';

  db.result(request, id)
    .then((result) => {
      res.status(201);
      res.json({
        statusCode: 201,
        message: `Question ${id} deleted`,
      });
      return res;
    })

    /**
     * Catches error from the database
     * @param  {Object} error - contains the details on the error
     * @return {JSON | object} - Contains the error message respons to the user
     */
    .catch((error) => {
      console.log(error);
    });
};

export default deleteQuestion;
