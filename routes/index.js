import express from 'express';
import { data } from '../data/data';
import { fetchAllQuestionsCtrl } from '../controllers/fetchAllQuestions';
import { fetchQuestionCtrl } from '../controllers/fetchQuestion';
import { postQuestion } from '../controllers/postQuestion';
import { postQuestionValidate } from '../middlewares/postQuestionValidate';

const router = express.Router();

router.route('/questions')
  // GET ALL QUESTIONS
  .get(fetchAllQuestionsCtrl)
  // POST A QUESTION
  .post(postQuestionValidate, postQuestion);

// GET A QUESTION
router.route('/questions/:id([0-9]{1,})')
  .get(fetchQuestionCtrl)

/*
// POST AN ANSWER
questionRouter.post('/questions', 
});


// POST AN ANSWER
questionRouter.post('/v1/questions/:id([0-9]{1,})/answers', (req, res) => {
  const reqBody = req.body;
  const requestId = req.params.id;
  const invalidReq = reqBody.body === null || reqBody.body === '' || reqBody.body === undefined;

  // Find the question with the request id.
  const currQuestion = questions.filter((question) => {
    if (question.id === parseInt(requestId)) {
      return true;
    }
  });

  if (currQuestion.length < 1) {
    res.status(404);// Set status to 404 as question was not found
    res.json({ message: `Question ${requestId} Not Found` });
  } else if (invalidReq) {
    res.status(400);
    res.json({ message: 'Bad Request. Answer must have a body.' });
  } else {
  	const answers = currQuestion[0].answers;
    const newId = answers[answers.length - 1].id + 1;
    const timeNow = new Date();
    const timeStr = timeNow.toUTCString();
    answers.push({
      id: newId,
      body: reqBody.body,
      username: reqBody.username,
      timeAnswered: timeStr,
      accepted: false,
    });
    res.status(201);
    res.json({ message: `New answer: ${reqBody.body} added`, question: `${currQuestion[0].title}` });
  }
});
*/
export {router};
