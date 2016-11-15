(function(http) {

  var api = window.ForgeWebComponents.Api = window.ForgeWebComponents.Api || {};

  function addRootUrl(sourceUrl) {

    if (!ForgeWebComponents.Settings.RootUrl) return sourceUrl;
    if (sourceUrl.startsWith("http")) return sourceUrl;

    var rootUrl = (ForgeWebComponents.Settings.RootUrl + "").replace(/\/+$/, "");
    sourceUrl = sourceUrl.replace(/^\/+/, "");
    return rootUrl + '/' + sourceUrl;

  }

  api.addRootUrl = addRootUrl;
  api.raw = function(url) {
    return http.get(addRootUrl(url));
  };

  api.HeartBeats = {
    fetchByRoleType: function() {
      return http.get(api.addRootUrl('/api/heartbeats/groupBy/RoleType'));
    },
    reset: function() {
      return http.post(api.addRootUrl('/api/heartbeats/reset'));
    }
  };

})(window.ForgeWebComponents.Http);
