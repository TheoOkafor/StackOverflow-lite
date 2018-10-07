CREATE TABLE answers (
  ID SERIAL PRIMARY KEY,
  questionID INTEGER REFERENCES questions(ID) ON DELETE CASCADE,
  body TEXT,
  timeSubmitted TIMESTAMP,
  username VARCHAR (20) REFERENCES users(username) ON DELETE CASCADE,
  userid INTEGER NOT NULL REFERENCES users(id),
  accepted BOOLEAN
);

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
    1,
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    2,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
    1,
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    2,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
    1,
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    2,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

  INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	1,
  	'shadhs gattuso is good',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'TheoOkafor',
    1,
  	'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	2,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'coko-maiko',
    2,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	3,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );

INSERT INTO answers (questionID, body, timeSubmitted, username, userid, accepted)
  VALUES (
  	4,
    'Lorem ipsum dolor sit amet, ',
    'Wed, 22 Aug 2018 11:13:09 GMT',
    'chanpion',
    3,
    'false'
  );
