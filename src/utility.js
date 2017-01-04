var moment = require('moment'); // Easy to use date library

// Helper function to create HTML elements
exports.createNode = function (type, className, content) {

  var element = document.createElement(type);

  if (className) {
    element.classList.add(className);
  }

  if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (content != null) {
    element.textContent = content;
  }

  return element;
  
};

// This function creates our basic word container, edit as you like
exports.wordContainer = function (word, definition, dateFormat) {

  var now = dateFormat ? moment().format(dateFormat) : moment().format('MMMM Do YYYY, HH:MM');

  var wrapper = exports.createNode('div', 'word-wrapper');
  var wordElm = exports.createNode('div', 'word', word);
  var defElm  = exports.createNode('div', 'definition', definition);
  var dateElm = exports.createNode('div', 'date', now);

  wrapper.appendChild(wordElm);
  wrapper.appendChild(defElm);
  wrapper.appendChild(dateElm);

  return wrapper;

};
