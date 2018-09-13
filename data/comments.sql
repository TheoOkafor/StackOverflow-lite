CREATE TABLE comments (
  ID SERIAL PRIMARY KEY,
  answerID INTEGER,
  questionID INTEGER,
  body TEXT NOT NULL,
  username VARCHAR (20),
  userid INTEGER NOT NULL,
  timeSubmitted TIMESTAMP
);
