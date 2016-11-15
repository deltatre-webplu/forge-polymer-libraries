(function() {

  function _get(url, response) {

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    //request.timeout = something;
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var result = JSON.parse(request.responseText);
          response.resolve(result);
        } else {
          response.reject("HTTP " + request.status + " for " + url);
        }
      }
    };
    request.send(null);

  }

  function _post(url, response) {

    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    //request.timeout = something;
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var result = JSON.parse(request.responseText);
          response.resolve(result);
        } else {
          response.reject("HTTP " + request.status + " for " + url);
        }
      }
    };
    request.send(null);

  }

  http = {

    get: function(url, config) {

      var response = Q.defer();
      _get(url, response);
      return response.promise;

    },

    post: function(url, data, config) {

      var response = Q.defer();
      _post(url, response);
      return response.promise;

    }

  };

  window.ForgeWebComponents = window.ForgeWebComponents || {};
  window.ForgeWebComponents.Http = http;

})();
