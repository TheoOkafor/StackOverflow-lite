import express from 'express';

const postQuestionValidate = (req, res, next) => {
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.title === null || reqBody.title === undefined;
  if (invalidReq) {
    const err = new Error('Bad Request. Question must have a title');
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

export { postQuestionValidate };
