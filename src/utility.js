var moment = require('moment'); // Easy to use date library

// Helper function to create HTML elements
exports.createNode = function (type, className, content) {

  var element = document.createElement(type);

  if (className) {
    element.className = className;
  }

  if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (content != null) {
    element.textContent = content;
  }

  return element;
  
};

exports.quoteContainer = function (word, definition, date) {

  var wrapper       = exports.createNode('blockquote');
  var wordElm       = exports.createNode('h4', null, word);
  var definitionElm = exports.createNode('p', 'lead', definition);
  var dateElm       = exports.createNode('span', 'date', date);

  wrapper.appendChild(wordElm);
  wrapper.appendChild(definitionElm);
  wrapper.appendChild(dateElm);

  return wrapper;

};

// This function creates our basic word container, edit as you like
exports.wordContainer = function (word, definition, date) {

  var now     = date ? date : moment().format('YYYY-MM-DD');
  var wrapper = exports.createNode('div', 'container word');
  var wordElm = exports.quoteContainer(word, definition, now);

  wrapper.appendChild(wordElm);

  return wrapper;

};
