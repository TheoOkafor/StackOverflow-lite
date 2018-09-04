CREATE TABLE users (
  ID SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR (20) NOT NULL UNIQUE,
  email VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created TIMESTAMP NOT NULL,
  modified TIMESTAMP
);

INSERT INTO users (username, email, password, created, modified)
  VALUES (
  	'TheoOkafor',
  	'gattuso@is.good',
  	'gattusosgood',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'Wed, 22 Aug 2018 11:13:09 GMT'
  );

INSERT INTO users (username, email, password, created, modified)
  VALUES (
    'coko-maiko',
  	'gattusddo@is.good',
  	'gattusddosgood',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'Wed, 22 Aug 2018 11:13:09 GMT'
  );

INSERT INTO users (username, email, password, created, modified)
  VALUES (
    'chanpion',
  	'gattudasso@is.good',
  	'gattusosdfgood',
  	'Wed, 22 Aug 2018 11:13:09 GMT',
  	'Wed, 22 Aug 2018 11:13:09 GMT'
  );
