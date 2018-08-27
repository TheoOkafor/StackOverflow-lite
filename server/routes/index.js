import express from 'express';
import { acceptAnswerValidate } from '../middlewares/acceptAnswerValidate';
import { postQuestionValidate } from '../middlewares/postQuestionValidate';
import { fetchAllQuestionsCtrl } from '../controllers/fetchAllQuestions';
import { postAnswerValidate } from '../middlewares/postAnswerValidate';
import { fetchQuestionCtrl } from '../controllers/fetchQuestion';
import { deleteQuestion } from '../controllers/deleteQuestion';
import { acceptAnswer } from '../controllers/acceptAnswer';
import { postQuestion } from '../controllers/postQuestion';
import { postAnswer } from '../controllers/postAnswer';
import { fetchDocs } from '../controllers/fetchDocs';


const router = express.Router();
//GET THE DOCUMENTATION

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

// ACCEPT AN ANSWER
router.put('/questions/:idQ([0-9]{1,})/answers/:idA([0-9]{1,})',
acceptAnswerValidate, acceptAnswer);

export { router };
