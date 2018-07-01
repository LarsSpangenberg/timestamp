// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date?", function (req, res) {
  let date = null;
  
  if(req.params.date === undefined) {
    date = new Date(Date.now());
  } else {
    let unix = parseInt(req.params.date);
    if(isNaN(req.params.date)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(unix) 
    }
  }
  let response = date === 'Invalid Date' ? 
      {error: 'Invalid Date'} :
      {unix: date.getTime(), utc: date.toUTCString()};
  
  res.json(response);
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});