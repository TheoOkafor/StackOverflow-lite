import express from 'express';
import {data} from '../data/data';

const allQuestions = data.questions;
const getQuestionCtrl = (req, res) => {
	res.status(200)
  res.json({
  	status: 'successful',
  	questions: allQuestions
  });
};

export {getQuestionCtrl};