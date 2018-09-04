# StackOverflow-lite
StackOverflow-lite is a platform where people can ask questions and provide answers. (Andela Developer Challenge)

[![Build Status](https://travis-ci.com/TheoOkafor/StackOverflow-lite.svg?branch=development)](https://travis-ci.com/TheoOkafor/StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/TheoOkafor/StackOverflow-lite/badge.svg?branch=ch-apis-refactoring-159912987)](https://coveralls.io/github/TheoOkafor/StackOverflow-lite?branch=ch-apis-refactoring-159912987)

## Features
1. User can ask questions on the platform
2. User can view questions
3. User can answer questions

## Technology Used
1. ES6
2. NodeJS/ExpressJS

## Getting Started
Assuming you already have `git` preinstalled in your local engine,

* Install the stable version of [`node`](https://nodejs.org/en/download/)
* Clone/download this [`repository`](https://github.com/TheoOkafor/StackOverflow-lite)
* Using your Command Line Interface `cd StackOverflow-lite`
* Run the command `npm start` or `npm run devstart` (to get the server started)

### Testable URIs
|HTTP Verb|Endpoint         |Description                   |
|---------|-----------------|------------------------------|
|GET      | /v1/questions    | Fetch all questions          |
|GET      | /v1/questions/:id | Fetch a particular question  |
|POST     | /v1/questions    | Add a question               |
|POST     | /v1/questions/:id | Add an answer to a question  |
|DELETE | /v1/questions/:id | Delete a question |
|PUT | /v1/questions/:id/answers/:id | Accept an answer |
|GET | /v1/users/:id | Fetch a user with the id |

Test the endpoints Using POSTMAN

### Live App
UI - https://theookafor.github.io/StackOverflow-lite/UI/home.html

API - https://stackoverflow-by-theo1.herokuapp.com/
