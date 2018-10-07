import db from '../db';

const logout = (req, res) => {
  res.status(200);
  res.header('x-access-token', null);
  res.json({
    statusCode: 200,
    message: 'User has been logged out',
  });
};

export default logout;
