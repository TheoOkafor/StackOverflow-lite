import express from 'express';
import updateAnswerValidate from '../middlewares/updateAnswerValidate';
import postQuestionValidate from '../middlewares/postQuestionValidate';
import deleteQuestionValidate from '../middlewares/deleteQuestionValidate';
import fetchAllQuestionsCtrl from '../controllers/fetchAllQuestions';
import postAnswerValidate from '../middlewares/postAnswerValidate';
import postCommentValidate from '../middlewares/postCommentValidate';
import getUserValidate from '../middlewares/getUserValidate';
import fetchQuestionCtrl from '../controllers/fetchQuestion';
import deleteQuestion from '../controllers/deleteQuestion';
import upvoteDownvote from '../controllers/upvoteDownvote';
import votesValidate from '../middlewares/votesValidate';
import acceptAnswer from '../controllers/acceptAnswer';
import postQuestion from '../controllers/postQuestion';
import authValidate from '../middlewares/authValidate';
import updateAnswer from '../controllers/updateAnswer';
import postComment from '../controllers/postComment';
import postAnswer from '../controllers/postAnswer';
import search from '../controllers/search';
import user from '../controllers/user';


const router = express.Router();

// GET ALL QUESTIONS
router.get('/questions', fetchAllQuestionsCtrl);

// GET A QUESTION
router.get('/questions/:id([0-9]{1,})', fetchQuestionCtrl);

// GET A USER
router.get('/users/:id', getUserValidate, user);

// POST A QUESTION
router.post('/questions', authValidate,
  postQuestionValidate, postQuestion);

// POST AN ANSWER
router.post('/questions/:id([0-9]{1,})/answers', authValidate,
  postAnswerValidate, postAnswer);

// UPVOTE OR DOWNVOTE AN ANSWER
router.post('/questions/:idQ([0-9]{1,})/answers/:idA([0-9]{1,})', authValidate,
  votesValidate, upvoteDownvote);

// POST COMMENT ON ANSWER
router.post('/questions/:idQ([0-9]{1,})/answers/:idA([0-9]{1,})/comments',
  authValidate, postCommentValidate, postComment);

// DELETE A QUESTION
router.delete('/questions/:id([0-9]{1,})',
  authValidate, deleteQuestionValidate, deleteQuestion);

// PUT AN ANSWER
router.put('/questions/:idQ([0-9]{1,})/answers/:idA([0-9]{1,})',
  authValidate, updateAnswerValidate, acceptAnswer, updateAnswer);

// SEARCH FOR QUESTION
router.get('/search', search);

export default router;
