import express from 'express';
import { fetchAllQuestionsCtrl } from '../controllers/fetchAllQuestions';
import { fetchQuestionCtrl } from '../controllers/fetchQuestion';
import { postQuestion } from '../controllers/postQuestion';
import { postQuestionValidate } from '../middlewares/postQuestionValidate';
import { postAnswer } from '../controllers/postAnswer';
import { postAnswerValidate } from '../middlewares/postAnswerValidate';
import { deleteQuestion } from '../controllers/deleteQuestion';
import { acceptAnswer } from '../controllers/acceptAnswer';


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

// DELETE A QUESTION
router.delete('/questions/:id([0-9]{1,})', deleteQuestion);

// POST AN ANSWER
router.put('/questions/:idQ([0-9]{1,})/answers/:idA([0-9]{1,})', acceptAnswer);
export { router };
