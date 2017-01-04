var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var wd         = require("word-definition");
var app        = express();

app.use('/', express.static(path.join(__dirname, '../bin')));
app.use(bodyParser.json());

// Handles interacting with word definition
app.post('/word', cors(), function (request, response) {

  var payload  = request.body;
  var word     = payload.word;
  var language = payload.language || 'en';

  wd.getDef(word, language, null, function(data) {

    if (data.err) {

      response.status(500).send('Error looking up the word');
      return;

    }

    response.json(data.definition);
    
  });
  
});

app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});
