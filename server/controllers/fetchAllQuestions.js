import express from 'express';
import { data } from '../../data/data';
/**
 * [allQuestions description]
 * @type {[type]}
 */
const allQuestions = data.questions;
const fetchAllQuestionsCtrl = (req, res) => {
  res.status(200);
  res.json({
  	status: 'successful',
    message: 'Questions found',
  	data: allQuestions,
  });
};

export { fetchAllQuestionsCtrl };
