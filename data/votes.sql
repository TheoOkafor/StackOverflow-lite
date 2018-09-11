CREATE TABLE votes (
  ID SERIAL PRIMARY KEY,
  vote TEXT NOT NULL,
  answerID INTEGER REFERENCES answers(ID) ON DELETE CASCADE,
  questionID INTEGER REFERENCES questions(ID) ON DELETE CASCADE,
  username VARCHAR (20) REFERENCES users(username) ON DELETE CASCADE,
  userid INTEGER NOT NULL REFERENCES users(id),
  timeSubmitted TIMESTAMP
);

-- INSERT INTO votes (vote, answerID, questionID, username, userid)
--   VALUES (
--   	'upvote',
--   	2,
--   	'Wed, 22 Aug 2018 11:13:09 GMT',
--   	'TheoOkafor',
--     1
--   );

-- INSERT INTO votes (vote, answerID, questionID, username, userid, timeSubmitted)
--   VALUES (
--   	2,
--     'Lorem ipsum dolor sit amet, ',
--     'Wed, 22 Aug 2018 11:13:09 GMT',
--     'coko-maiko',
--     2,
--     'false'
--   );

-- INSERT INTO votes (vote, answerID, questionID, username, userid, timeSubmitted)
--   VALUES (
--   	3,
--     'Lorem ipsum dolor sit amet, ',
--     'Wed, 22 Aug 2018 11:13:09 GMT',
--     'chanpion',
--     3,
--     'false'
--   );

-- INSERT INTO votes (vote, answerID, questionID, username, userid, timeSubmitted)
--   VALUES (
--   	4,
--     'Lorem ipsum dolor sit amet, ',
--     'Wed, 22 Aug 2018 11:13:09 GMT',
--     'chanpion',
--     3,
--     'false'
--   );

