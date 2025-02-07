const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();

let requestCount = 0;

const CountRequestsMiddleware = (req, res, next) => {
  requestCount += 1;
  next();
}

app.use(CountRequestsMiddleware)

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable


// routes -------------------------------------------------

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

module.exports = app;