'use strict';

module.exports = {
  BreakPoints: {
    large: 1200,
    medium: 768,
    small: 320
  },

  Colors: {
    // GRAYSCALE
    SLATE: '#2F363E',
    CHARCOAL: '#56595A',
    ASH: '#ACB0B3',
    FOG: '#E3E6E7',
    PORCELAIN: '#F7F8F8',
    WHITE: '#FFFFFF',

    // ACCENTS
    PRIMARY: '#359BCF',
    BANANA: '#FCBC19',
    EGGPLANT: '#6C3F6F',
    LEMON: '#EBBE54',
    LIME: '#14C764',
    ORANGE: '#EF7625',
    PLUM: '#AE547A',
    STRAWBERRY: '#EB3434',
    TOMATO: '#CD5A57',

    // BUDGET ARC COLORS
    LIGHT_LIME: '#97E9BB',
    LIGHT_BANANA: '#F7DD7C',
    LIGHT_STRAWBERRY: '#FF6B61',

    // CHART COLORS
    BASE_ARC: '#F5F5F5',
    YELLOW: '#f6a01e',
    GREEN: '#00a89c',
    BLUE: '#359BCF',
    RED: '#EE4235',

    // CATEGORY COLORS
    AUTO_TRANSPORT: '#4B9DBC',
    BILLS_UTILITIES: '#EF9B2C',
    BUSINESS: '#B3DE8C',
    EDUCATION: '#F8AB3A',
    ENTERTAINMENT: '#AB5B89',
    FEES: '#FF9696',
    FINANCIAL: '#6BCDDB',
    FOOD_DINING: '#58AC7B',
    GIFTS_CHARITY: '#347AA5',
    HEALTH_FITNESS: '#5C446E',
    HOME: '#FFD84D',
    INCOME: '#133F49',
    INVESTMENTS: '#FF7070',
    KIDS: '#82D196',
    PETS: '#85507B',
    PERSONAL_CARE: '#338B7A',
    SHOPPING: '#CF5F84',
    TAXES: '#32588D',
    TRAVEL: '#e37434',
    UNCATEGORIZED: '#FA5555',

    // SCRIM
    SCRIM: 'rgba(247,248,248,0.9)'
  },

  FontSizes: {
    JUMBO: 30,
    XXLARGE: 21,
    XLARGE: 17,
    LARGE: 15,
    MEDIUM: 13,
    SMALL: 11,
    TINY: 10
  },

  Fonts: {
    THIN: 'ProximaNovaThin, Helvetica, Arial, sans-serif',
    LIGHT: 'ProximaNovaLight, Helvetica, Arial, sans-serif',
    REGULAR: 'ProximaNovaRegular, Helvetica, Arial, sans-serif',
    ITALIC: 'ProximaNovaRegularItalic, Helvetica, Arial, sans-serif',
    SEMIBOLD: 'ProximaNovaSemibold, Helvetica, Arial, sans-serif'
  },

  //Box Shadows
  ShadowLow: '0 1px 2px rgba(0,0,0,0.1)',
  ShadowMed: '0 2px 6px rgba(0,0,0,0.1)',
  ShadowHigh: '0 10px 30px 5px rgba(0,0,0,0.1)',

  Spacing: {
    XLARGE: 30,
    LARGE: 20,
    MEDIUM: 15,
    SMALL: 10,
    XSMALL: 5
  },

  adjustColor: function adjustColor(col, amt) {
    var color = col;
    var usePound = false;

    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }

    var num = parseInt(color, 16);

    var r = (num >> 16) + amt;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    var b = (num >> 8 & 0x00FF) + amt;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    var g = (num & 0x0000FF) + amt;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? '#' : '') + (g | b << 8 | r << 16).toString(16);
  },
  adjustHexOpacity: function adjustHexOpacity(color, opacity) {
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
  },
  linearGradient: function linearGradient(startColor) {
    var startOpacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.8;
    var endColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startColor;
    var endOpacity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    return 'linear-gradient(' + this.adjustHexOpacity(startColor, startOpacity) + ', ' + this.adjustHexOpacity(endColor, endOpacity) + ')';
  },
  getWindowSize: function getWindowSize() {
    var breakPoints = this.BreakPoints;
    var width = window.innerWidth;
    var windowSize = 'small';

    if (width >= breakPoints.large) {
      windowSize = 'large';
    } else if (width >= breakPoints.medium) {
      windowSize = 'medium';
    } else if (width <= breakPoints.small) {
      windowSize = 'xsmall';
    }

    return windowSize;
  }
};