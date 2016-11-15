(function() {

  "use strict";

  var systemRoles = {
    ApplicationService: {
      icon: "icons:settings"
    },
    BackEnd: {
      icon: "device:storage"
    },
    FrontEnd: {
      icon: "social:public"
    },
    DistributionApi: {
      icon: "icons:cloud-circle"
    }
  };

  function ItemIcon(icon, color) {
    this.icon = icon;
    this.color = color || "#ccc";
  }

  var entityIcons = {
    story: new ItemIcon("icons:description", "dodgerblue"),
    photo: new ItemIcon("image:photo", "darkorange"),
    album: new ItemIcon("image:photo-album", "orangered"),
    tag: new ItemIcon("icons:label", "darkgreen"),
    selection: new ItemIcon("editor:format-list-bulleted", "#663300"),
    document: new ItemIcon("editor:attach-file", "blueviolet")
  };

  window.ForgeWebComponents = window.ForgeWebComponents || {};
  window.ForgeWebComponents.Settings = window.ForgeWebComponents.Settings || {};
  window.ForgeWebComponents.Settings.SystemRoles = systemRoles;
  window.ForgeWebComponents.Settings.EntityIcons = entityIcons;
  window.ForgeWebComponents.Settings.DefaultLocale = window.ForgeWebComponents.Settings.DefaultLocale || 'en';

})();
