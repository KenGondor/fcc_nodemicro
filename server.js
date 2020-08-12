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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//empty get request
app.get("/api/timestamp", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

// api route
app.get("/api/timestamp/:input", (req, res) => {
  let input = req.params.input;
  let returnObject = {};
  
  if (input.includes("-")) {
    /* Date String */
    let date = new Date(input);
    returnObject.unix = date.getTime();
    returnObject.utc = date.toUTCString();
    
  } else {
    /* TimeStamp */
    input = parseInt(input);
    let date = new Date(input);
    returnObject.unix = date.getTime();
    returnObject.utc = date.toUTCString();
  }
  
  if (!returnObject.unix || !returnObject.utc) {
    res.json({ error: "Invalid Date" });
  }
  
  res.json(returnObject);

});


app.enable("trust proxy");
/* --- HERE --- */
/* for req parser */
app.get("/api/whoami", (req, res) => {
  let resObj = { ipaddress: req.ip, language: req.get("accept-language"), software: req.get("user-agent") };
  
  res.json(resObj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
