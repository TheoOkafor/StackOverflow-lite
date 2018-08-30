import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db';
import config from '../../config';

const authValidate = (req, res, next) => {
  try {
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
            error: "could not authenticate the token"
          })
        }
        req.userId = decoded.id;
    	  next();
  	  });
  } catch (error) {
    res.status(500);
    res.json({
      auth: false,
      error: 'Server failed to authenticate token',
    });
    return res;
  }
};

export default authValidate;
