var util = require('./utility');
var API  = require('./api');


exports.main = function() {

  var form  = document.getElementById('word-form');
  var input = document.getElementById('add-input');
  var words = document.getElementById('words');

  form.onsubmit = function (event) {

    // Prevent default form submission so we don't refresh the page
    event.preventDefault(); 

    // Get the user input and store it in the variable word
    var word = input.value;

    // Reset the input
    input.value = '';

    // Add the looked up word
    addWord(word);

  };


  // This function looks up the word's definition, creates a HTML element and adds it to the words list
  function addWord (word) {

    // lookup the definition via the api
    API.lookup(word, function (error, definition) {

      if (error) {

        console.log('error fetching word.', error);
        return;

      }

      var outputElement = util.wordContainer(word, definition);

      // insert the newly created output element as first child in the list of words
      words.insertBefore(outputElement, words.firstChild);

    });
  
  }

}

exports.main();
