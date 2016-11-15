(function(api) {

  function Polling(interval) {

    this.instances = {};
    this.interval = interval || 60000;
    this.timeout = null;
    this.active = false;
  }

  Polling.prototype.start = function() {
    if (this.active) return;
    this.active = true;
    setTimeout(this.poll.bind(this), 500);
  };

  Polling.prototype.poll = function() {

    var endpoints = Object.keys(this.instances);

    if (endpoints.length < 1) {
      this.active = false;
      return;
    };

    var start = +new Date();

    var promises = [];

    var self = this;
    endpoints.forEach(function(endpoint) {

      var registered = self.instances[endpoint];
      if (!registered) return;

      registered.forEach(function(r) {
        r.onPollingStart();
      });

      var promise = api.raw(endpoint)
       .then(function(result) {

         registered.forEach(function(r) {
           r.onPollingUpdate(result);
         });

       }, function() {

         // handle error? or do nothing?

       });

      promises.push(promise);

    });

    Q.all(promises).done(function() {

      var end = +new Date();
      var timeout = self.interval - (end - start);
      self.timeout = setTimeout(self.poll.bind(self), Math.max(timeout, 0));

    });

  };

  Polling.prototype.register = function(endpoint, webComponent) {

    if (!this.instances[endpoint]) {
      this.instances[endpoint] = [];
    }

    if (this.instances[endpoint].indexOf(webComponent) < 0) {
      this.instances[endpoint].push(webComponent);
    }

  };

  Polling.prototype.unregister = function(endpoint, webComponent) {

    var index = this.instances[endpoint] ? this.instances[endpoint].indexOf(webComponent) : -1;

    if (index >= 0) {

      this.instances[endpoint].splice(index, 1);

      if (this.instances[endpoint].length == 0) {
        delete this.instances[endpoint];
      }

      if (Object.keys(this.instances).length < 1) {
        this.active = false;
        clearTimeout(this.timeout);
      };

    }

  }

  ForgeWebComponents.Polling = Polling;

})(ForgeWebComponents.Api);
