import express from 'express';

const acceptAnswerValidate = (req, res, next) => {
  const requestId = req.params.id;
  const reqBody = req.body;
  // Check if all fields are provided and are valid:
  const invalidReq = reqBody.value === undefined
    || typeof reqBody.value !== "boolean";

  if (invalidReq) {
    const err = new Error('Bad Request. '
      + 'Expected a request body with {value: true || false}');
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

export { acceptAnswerValidate };
