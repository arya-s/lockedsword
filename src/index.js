// Ugly ugly polyfills
var Promise = require('promise-polyfill'); 

if (!window.Promise) {
  window.Promise = Promise;
}

var util = require('./utility');
var API  = require('./api');




exports.main = function() {

  var fieldset = document.getElementById('word-form-fieldset');
  var form     = document.getElementById('word-form');
  var input    = document.getElementById('add-input');
  var words    = document.getElementById('words');
  var loader   = document.getElementById('loader');

  form.onsubmit = function (event) {

    // Prevent default form submission so we don't refresh the page
    event.preventDefault(); 

    // Disable the form until we are done with adding
    fieldset.disabled = true;
    loader.style.visibility = 'visible';

    // Get the user input and store it in the variable word
    var word = input.value;

    // Reset the input
    input.value = '';

    // Add the looked up word
    addWord(word);

  };

  API.getAll(function (error, data) {

      if (error) {

        console.log('error fetching words.', error);
        return;

      }
  
    for (var i = 0; i < data.length; i++) {

      var wordObj = data[i];
      var outputElement = util.wordContainer(wordObj.word, wordObj.definition, wordObj.date);
      words.appendChild(outputElement);

    }

  });
  
  // This function looks up the word's definition, creates a HTML element and adds it to the words list
  function addWord (word) {

    // lookup the definition via the api
    API.lookup(word, function (error, definition) {

      // Enable the form again for future adding
      fieldset.disabled = false;
      loader.style.visibility = 'hidden';

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
