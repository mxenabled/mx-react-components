const Style = {
  BreakPoints: {
    large: 1200,
    medium: 768,
    small: 320
  },

  Colors: {
    // Grayscale Colors
    WHITE: '#FFFFFF',
    GRAY_100: '#F5F6F8', // PORCELAIN
    GRAY_300: '#DFE3E8', // FOG
    GRAY_500: '#959CA6', // ASH
    GRAY_700: '#474F59', // CHARCOAL
    GRAY_900: '#2C353F', // SLATE

    // Accent Colors
    PRIMARY: '#359BCF', // BLUE
    SUCCESS: '#14C764', // LIME
    WARNING: '#FCBC19', // BANANA
    DANGER: '#EB3434', // STRAWBERRY
    ATTENTION: '#EF7625', // ORANGE

    // Light Accent Colors
    LIGHT_SUCCESS: '#97E9BB', // LIGHT_LIME
    LIGHT_WARNING: '#F7DD7C', // LIGHT_BANANA
    LIGHT_DANGER: '#FF6B61', // LIGHT_STRAWBERRY

    // Misc.
    BASE_ARC: '#F5F5F5',
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
<<<<<<< HEAD
=======
  },

  adjustColor (col, amt) {
    let color = col;
    let usePound = false;

    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);

    let r = (num >> 16) + amt;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    let b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    let g = (num & 0x0000FF) + amt;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  },


  adjustHexOpacity (color, opacity) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
  },

  linearGradient (startColor, startOpacity = 0.8, endColor = startColor, endOpacity = 1) {
    return `linear-gradient(${this.adjustHexOpacity(startColor, startOpacity)}, ${this.adjustHexOpacity(endColor, endOpacity)})`;
  },

  getWindowSize () {
    const breakPoints = this.BreakPoints;
    const width = window.innerWidth;
    let windowSize = 'small';

    if (width >= breakPoints.large) {
      windowSize = 'large';
    } else if (width >= breakPoints.medium) {
      windowSize = 'medium';
    }

    return windowSize;
>>>>>>> master
  }
};

module.exports = Style;
