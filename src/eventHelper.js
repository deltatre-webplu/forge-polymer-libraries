(function() {

  "use strict";

  var eventHelper = {
    changeLanguage: function(lang) {
      var evt = document.createEvent("CustomEvent");
      evt.initEvent("ForgeLanguageChanged", true, true); //true for can bubble, true for cancelable
      evt.language = lang;
      document.dispatchEvent(evt);
    }
  };

  window.ForgeWebComponents = window.ForgeWebComponents || {};
  window.ForgeWebComponents.Helpers = window.ForgeWebComponents.Helpers || {};
  window.ForgeWebComponents.Helpers.EventHelper = eventHelper;

})();
