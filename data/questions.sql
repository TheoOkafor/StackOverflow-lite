CREATE TABLE questions (
  ID SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  timeSubmitted TIMESTAMP,
  username VARCHAR (20) REFERENCES users(username)
);

INSERT INTO questions (title, body, timeSubmitted, username)
  VALUES (
  	'what is my name?',
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor'
  );

INSERT INTO questions (title, body, timeSubmitted, username)
  VALUES (
    'Why do people Suffer in Nigeria?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko'
  );

INSERT INTO questions (title, body, timeSubmitted, username)
  VALUES (
    'Why do you do yoga?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion'
  );

  INSERT INTO questions (title, body, timeSubmitted, username)
  VALUES (
    'How can one learn it all so fast?',
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion'
  );
