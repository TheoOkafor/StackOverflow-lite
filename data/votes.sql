CREATE TABLE votes (
  ID SERIAL PRIMARY KEY,
  vote TEXT NOT NULL,
  answerID INTEGER,
  questionID INTEGER,
  username VARCHAR (20),
  userid INTEGER NOT NULL,
  timeSubmitted TIMESTAMP
);
