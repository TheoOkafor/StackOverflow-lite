import express from 'express';
import { data } from '../data/data';
import { fetchAllQuestionsCtrl } from '../controllers/fetchAllQuestions';
import { fetchQuestionCtrl } from '../controllers/fetchQuestion';
import { postQuestion } from '../controllers/postQuestion';
import { postQuestionValidate } from '../middlewares/postQuestionValidate';
import { postAnswer } from '../controllers/postAnswer';
import { postAnswerValidate } from '../middlewares/postAnswerValidate';
import { urlErrHandler } from '../middlewares/urlErrHandler';

const router = express.Router();

// GET ALL QUESTIONS
router.get('/questions', fetchAllQuestionsCtrl)

// GET A QUESTION
router.get('/questions/:id([0-9]{1,})', fetchQuestionCtrl);

// POST A QUESTION
router.post('/questions', postQuestionValidate, postQuestion);

// POST AN ANSWER
router.post('/questions/:id([0-9]{1,})/answers', postAnswerValidate, postAnswer);


// BAD GET A QUESTION REQUEST
router.get('/questions/:id([A-z]{1,})', urlErrHandler);

// BAD POST QUESTION REQUEST
router.post('/questions/:id([A-z0-9]{1,})', urlErrHandler);

// BAD POST ANSWER REQUEST
router.post('/questions/:id([^0-9]{1,})/answers', urlErrHandler);


export {router};