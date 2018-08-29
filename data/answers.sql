CREATE TABLE answers (
  ID SERIAL PRIMARY KEY,
  questionID INTEGER REFERENCES questions(ID) ON DELETE CASCADE,
  body TEXT,
  timeSubmitted TIMESTAMP,
  username VARCHAR (20) REFERENCES users(username),
  accepted BOOLEAN
);

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    'false'
  );
