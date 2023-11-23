// Imports
const EXPRESS = require('express');

// Constants
const APP = EXPRESS();
const PORT = 8080;

// Dictionary for storing number of streams oppened by given user.
// This should be substituted by REDIS to not keep this data in memory,
// instead using the database suited for it, but for simple proof of
// concept it will work.
const STREAM_COUNT = {};

// setup json middleware for reading body of incoming requests
APP.use(EXPRESS.json());

APP.post('/api/stream/open', (req, res) => {
  console.log(req.body);
  console.log(req.body['test']);
  res.send({"Over_Limit": false});
});

APP.post('/api/stream/close', (req, res) => {
  res.send('Files');
});

APP.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});