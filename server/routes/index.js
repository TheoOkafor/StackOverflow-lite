import express from 'express';
import { fetchAllQuestionsCtrl } from '../controllers/fetchAllQuestions';
import { fetchQuestionCtrl } from '../controllers/fetchQuestion';
import { postQuestion } from '../controllers/postQuestion';
import { postQuestionValidate } from '../middlewares/postQuestionValidate';
import { postAnswer } from '../controllers/postAnswer';
import { postAnswerValidate } from '../middlewares/postAnswerValidate';

const router = express.Router();

// GET ALL QUESTIONS
router.get('/questions', fetchAllQuestionsCtrl);

// GET A QUESTION
router.get('/questions/:id([0-9]{1,})', fetchQuestionCtrl);

// POST A QUESTION
router.post('/questions', postQuestionValidate, postQuestion);

// POST AN ANSWER
router.post('/questions/:id([0-9]{1,})/answers', postAnswerValidate,
  postAnswer);

export { router };
