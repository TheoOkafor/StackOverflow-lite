DROP DATABASE IF EXISTS stackLite;
CREATE DATABASE stackLite;

\c stackLite;

CREATE TABLE questions (
  ID SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  timeSubmitted TIMESTAMP,
  username VARCHAR (20),
  answers INTEGER[]
);

INSERT INTO questions (title, body, timeSubmitted, username, answers)
  VALUES (
  	'what is my name?',
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
  	'{2, 3, 4}'
  );

INSERT INTO questions (title, body, timeSubmitted, username, answers)
  VALUES (
    'Why do people Suffer in Nigeria?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    '{5, 6, 7}'
  );

INSERT INTO questions (title, body, timeSubmitted, username, answers)
  VALUES (
    'Why do you do yoga?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    '{8, 9, 10, 11, 12}'
  );

  INSERT INTO questions (title, body, timeSubmitted, username, answers)
  VALUES (
    'How can one learn it all so fast?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    '{13, 14, 15, 16, 17}'
  );
