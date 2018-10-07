import express from 'express';

const data = express();
data.questions = [
  {
    id: 1,
    title: 'Why do people Suffer in Nigeria?',
    body: 'Lorem ipsum dolor sit amet, ',
    timeSubmitted: '08:07AM, October 02, 2018',
    username: 'coko-maiko',
    answers: [
      {
        id: 1,
        body: 'Lorem ipsum dolor sit amet',
        username: 'john-champion',
        timeAnswered: '08:07AM, October 05, 2018',
        accepted: false,
      },
      {
        id: 2,
        body: 'Lorem ipsum dolor sit amet,',
        username: 'jim-berglin',
        timeAnswered: '08:07AM, October 15, 2018',
        accepted: true,
      },
      {
        id: 3,
        body: 'Lorem ipsum dolor sit amet,',
        username: 'jon-champion',
        timeAnswered: '08:07AM, October 14, 2018',
        accepted: false,
      },
      {
        id: 4,
        body: 'Lorem ipsum dolor sit amet,',
        username: 'champion',
        timeAnswered: '08:07AM, October 03, 2018',
        accepted: false,
      },
    ],
  },
  {
    id: 2,
    title: 'What is the best way to declare variables in Python?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    timeSubmitted: '08:07AM, October 02, 2018',
    username: 'jon-champion',
    answers: [
      {
        id: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'coko-maiko',
        timeAnswered: '08:07AM, October 05, 2018',
        accepted: false,
      },
      {
        id: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'champion',
        timeAnswered: '08:07AM, October 15, 2018',
        accepted: true,
      },
      {
        id: 3,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'jim-berglin',
        timeAnswered: '08:07AM, October 14, 2018',
        accepted: false,
      },
      {
        id: 4,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'tyrone',
        timeAnswered: '08:07AM, October 03, 2018',
        accepted: false,
      },
    ],
  },
  {
    id: 3,
    title: 'What is the best way to declare variables in Python?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    timeSubmitted: 'October 03, 2018',
    username: 'jim-berglin',
    answers: [
      {
        id: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user3',
        timeAnswered: '08:07AM, October 05, 2018',
        accepted: false,
      },
      {
        id: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user5',
        timeAnswered: '08:07AM, October 15, 2018',
        accepted: false,
      },
      {
        id: 3,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
        username: 'user2',
        timeAnswered: '08:07AM, October 14, 2018',
        accepted: false,
      },
      {
        id: 4,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user4',
        timeAnswered: '08:07AM, October 03, 2018',
        accepted: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Does scripting in Java mean that I can JavaScript?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    timeSubmitted: 'October 05, 2018',
    username: 'user4',
    answers: [
      {
        id: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user3',
        timeAnswered: '08:07AM, October 05, 2018',
        accepted: false,
      },
      {
        id: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user5',
        timeAnswered: '08:07AM, October 15, 2018',
        accepted: false,
      },
      {
        id: 3,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user2',
        timeAnswered: '08:07AM, October 14, 2018',
        accepted: true,
      },
      {
        id: 4,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        username: 'user4',
        timeAnswered: '08:07AM, October 03, 2018',
        accepted: false,
      },
    ],
  },
];


data.users = [
  {
    name: 'john-champion',
    id: 1,
    timeJoined: 'October 02, 2018',
    password: 'safaefKL12',
    questionsAuthoured: [2, 3], // Question ID array.
    answersAuthoured: [
      {
        questionID: 1,
        answerID: 1,
      },
      {
        questionID: 5,
        answerID: 4,
      },
    ],
  },

  {
    name: 'jim-berglin',
    id: 2,
    timeJoined: 'October 04, 2018',
    password: 'safaefKL12',
    questionsAuthoured: [4, 5], // Question ID array.
    answersAuthoured: [
      {
        questionID: 2,
        answerID: 1,
      },
      {
        questionID: 3,
        answerID: 4,
      },
    ],
  },

  {
    name: 'coko-maiko',
    id: 3,
    timeJoined: 'October 04, 2018',
    password: 'safaefKL12',
    questionsAuthoured: [1], // Question ID array.
    answersAuthoured: [
      {
        questionID: 2,
        answerID: 2,
      },
      {
        questionID: 3,
        answerID: 5,
      },
    ],
  },
];

export default data;
