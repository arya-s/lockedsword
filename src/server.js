var jsonfile   = require('jsonfile')
var moment     = require('moment'); // Easy to use date library
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var wd         = require("word-definition");
var app        = express();


var file = path.resolve(__dirname, 'bin/words.json');

app.use('/', express.static(path.join(__dirname, '../bin')));
app.use(bodyParser.json());

app.post('/all', cors(), function (request, response, next) {

  var words = jsonfile.readFileSync(file);
  response.json(words);

  next();

});

// Handles interacting with word definition
app.post('/word', cors(), function (request, response, next) {

  var payload  = request.body;
  var word     = payload.word;
  var language = payload.language || 'en';

  wd.getDef(word, language, null, function(data) {

    if (data.err) {

      response.status(500).send('Error looking up the word');
      return;

    }

    var wordObj = {word: word, definition: data.definition, date: moment().format('YYYY-MM-DD')};
    response.json(data.definition); next();

    var words = jsonfile.readFileSync(file);
    words.unshift(wordObj);
    jsonfile.writeFileSync(file, words, {spaces: 2})
    
  });
  
});

app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});
