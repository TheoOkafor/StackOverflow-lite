import express from 'express';

const urlErrHandler = (req, res) => {
  const err = new Error('Bad Request, URL ID parameter must be integer');
  res.status(400);
  res.json({
    status: 'failed',
    message: err.message,
  });
};

export { urlErrHandler };
