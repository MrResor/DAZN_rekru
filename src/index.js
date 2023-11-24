// Imports
const EXPRESS = require('express');
const FS = require('fs');

// Constants
const APP = EXPRESS();
const PORT = 8080;
const STDERR = FS.createWriteStream('./errorsLog.log', { flags: 'a' });
const LOGGER = new console.Console(stderr = STDERR);

// Dictionary for storing number of streams oppened by given user.
// This should be substituted by REDIS to not keep this data in memory,
// instead using the database suited for it, but for simple proof of
// concept it will work.
const STREAM_COUNT = {};

// setup json middleware for reading body of incoming requests
APP.use(EXPRESS.json());


// post is used mostly because asumptions is made that more data will be
// transported in body, and it can be safer than get, as well as there
// is body in response.
APP.post('/api/stream/open', (req, res) => {
  if (req.body['user'] === undefined) {
    // Checking if user field is in body just in case, but no validation of
    // user is done here as per task contents (in practical use, it would
    // probably be in the latter part).
    LOGGER.error('[', new Date(), '] Request without user field.\nHeaders:\n,',
      req.headers, '\nBody:\n', req.body);
    res.statusCode = 400;
    res.send();
  } else {
    const user = req.body['user'];
    if (STREAM_COUNT[user] === undefined) {
      // if user is not tracked at the moment, add him to the dictionary.
      STREAM_COUNT[user] = 0;
    }
    // returns false if user has 2 or less streams opened, true otherwise.
    res.send({ "Over_Limit": (STREAM_COUNT[user] > 2) });
    // no need to keep adding after 3, it is better to bound it
    STREAM_COUNT[user] += (0 + (STREAM_COUNT[user] < 3));
  }
});

APP.post('/api/stream/close', (req, res) => {
  if (req.body['user'] === undefined) {
    // Checking if user field is in body just in case, but no validation of
    // user is done here as per task contents (in practical use, it would
    // probably be in the "else" part).
    LOGGER.error('[', new Date(), '] Request without user field.\nHeaders:\n,',
      req.headers, '\nBody:\n', req.body);
    res.statusCode = 400;
    res.send();
  } else {
    const user = req.body['user'];
    if (STREAM_COUNT[user] === undefined) {
      // This should not be the case but it has to be guarded, otherwise there
      // would be NaNs in the dictionary and they would never go away unless
      // an API was restarted or a clenup procedure implemented.
      LOGGER.error('[', new Date(), '] Received id of user that is not ',
        'observed.\nHeaders:\n,', req.headers, '\nBody:\n', req.body);
      res.statusCode = 204;
    } else {
      STREAM_COUNT[user] -= 1;
      typeof a == typeof b && a <= b
      // can be non strict becuase STREAM_COUNT values are numbers for sure
      if (STREAM_COUNT[user] <= 0 || STREAM_COUNT === NaN) {
        delete STREAM_COUNT[user];
      }
      res.statusCode = 200;
    }
    res.send();
  }
});

APP.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});