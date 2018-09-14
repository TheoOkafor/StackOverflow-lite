import jwt from 'jsonwebtoken';
import config from '../../config';

const authValidate = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (!token) {
    res.status(403);
    res.json({
    	auth: false,
    	error: 'Token not provided',
    });
    return res;
  }
  	jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error: 'could not authenticate the token',
      });
    }
    req.userId = decoded.id;
      	return next();
  });
};

export default authValidate;
