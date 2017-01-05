var API = function () {
};

API.prototype.getAll = function (callback) {

  var options = {
    headers: {
      'Accept': 'application/json'
    },
    method: 'POST'
  };

  // Lookup the word on the server
  fetch('/all', options).then(function (response) {

    response.json().then(function(data) {  
      callback(null, data);
    });  

  }).catch(function (error) {

    callback(error);

  });

};

API.prototype.lookup = function (word, callback) {

  var options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({word: word})
  };

  // Lookup the word on the server
  fetch('/word', options).then(function (response) {

    response.json().then(function(data) {  
      callback(null, data);
    });  

  }).catch(function (error) {

    callback(error);

  });

};

module.exports = new API();
