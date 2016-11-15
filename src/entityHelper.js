(function() {

  "use strict";

  window.ForgeWebComponents = window.ForgeWebComponents || {};
  window.ForgeWebComponents.Helpers = window.ForgeWebComponents.Helpers || {};
  window.ForgeWebComponents.Helpers.EntityHelper = {
    pluralize: pluralize,
    createLink: createLink
  };

  function pluralize(entityType) {

    if (entityType.endsWith("y")) {
      return entityType.substring(0, entityType.length - 1) + "ies";
    }
    return entityType + "s";

  }

  function createLink(entityType, entityCode, entityId, translationId) {

    var rootUrl = "#/wcm/";
    var result;

    switch (entityType) {
      case "story":
        result = rootUrl + pluralize(entityType) + "/" + translationId
        break;
      case "customentity":
        result = null;
        break;
      default:
        result = rootUrl + pluralize(entityType) + "/" + entityId;
        break;
    }

    return result;

  }

})();
