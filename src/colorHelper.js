(function() {

  "use strict";

  function ColorObject(background, foreground) {
    this.background = "#" + background;
    this.foreground = "#" + foreground;
  }

  function fFore(hexcolor) {
		return (parseInt(hexcolor, 16) > 0xffffff / 2) ? '000000' : 'ffffff';
	};

  function fBack(str) {
    const hash = function (word) {
      var h = 0, i, chr, len;
      if (word.length === 0) return h;
      for (i = 0, len = word.length; i < len; i++) {
        chr = word.charCodeAt(i);
        h = ((h << 5) - h) + chr;
        h |= 0;
      }
      return h;
    };
    const shade = function (color, prc) {
      const num = parseInt(color, 16);
      const amt = Math.round(2.55 * prc);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16)
        .slice(1);

    };
    const int_to_rgba = function (i) {
      const color = ((i >> 24) & 0xFF).toString(16) +
      ((i >> 16) & 0xFF).toString(16) +
      ((i >> 8) & 0xFF).toString(16) +
      (i & 0xFF).toString(16);
      return color;
    };
    return shade(int_to_rgba(hash(str)), -10);

  };

  var colorHelper = {

    cache: {},
    colorFromString: function(inputString) {

  		const str = inputString.toLowerCase();

			var colorObject = colorHelper.cache[str];
			if (colorObject) {
				return colorObject;
			}

  		const back = fBack(str).slice(0, 6);
  		const fore = fFore(back);

  		colorObject = new ColorObject(back, fore);

  		colorHelper.cache[str] = colorObject;

  		return colorObject;

  	},
    colorFromGuid: function(guid) {
      return colorHelper.colorFromString(guid + guid);
    }

  };

  window.ForgeWebComponents = window.ForgeWebComponents || {};
  window.ForgeWebComponents.Helpers = window.ForgeWebComponents.Helpers || {};
  window.ForgeWebComponents.Helpers.ColorHelper = colorHelper;

})();
