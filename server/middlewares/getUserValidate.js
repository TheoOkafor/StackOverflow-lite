import db from '../db';

const getUserValidate = (req, res, next) => {
  const userId = req.params.id;

  db.multi(`
    SELECT username, email, created, modified FROM users WHERE id = $1;
    SELECT * FROM questions WHERE userid = $1;
    SELECT * FROM answers WHERE userid = $1`, userId)
    .then((data) => {
      if (!data[0][0]) {
        res.status(404);
        res.json({
          statusCode: 404,
          error: 'User not found',
        });
        return res;
      } if (data[0] && data[1].length <= 0 || data[2].length <= 0) {
        data[0][0].questions = data[1];
        data[0][0].answers = data[2];
        res.status(200);
        res.json({
          statusCode: 200,
          message: 'User found',
          data: data[0][0],
        });
        return res;
      }
      return next();
    });
};

export default getUserValidate;
