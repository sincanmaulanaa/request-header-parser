// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.set('trust proxy', true);

app.get('/api/whoami', function (req, res) {
  let ipAddress = req.ip;
  console.log('IP ADDRESS ', ipAddress);
  const forwarded = req.headers['x-forwarded-for'];

  if (forwarded) {
    ipAddress = forwarded.split(',')[0].trim();
    console.log('FORWARDED IP ADDRESS ', ipAddress);
  }

  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software,
  });
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
