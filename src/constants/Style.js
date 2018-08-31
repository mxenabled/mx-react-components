const Style = {
  AccessibilityStyles: {

    /**
     * Recommended way to hide elements visually but
     * still allow screen readers to read them.
     * Verified working in Chrome, Firefox, Safari, IE 11, and Edge
     *
     * See https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
     *
     * We've used the HTML 5 boiler plate version here as it has corrected some minor
     * issues with the version in the linked article above.
     * https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css#L130
     **/
    VISUALLY_HIDDEN: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1,
      whiteSpace: 'nowrap'
    }
  },

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
  ShadowLow: '0 1px 3px rgba(87,102,117,0.20)',
  ShadowMed: '0 3px 8px rgba(87,102,117,0.15)',
  ShadowHigh: '0 10px 20px rgba(87,102,117,0.16)',

  Spacing: {
    XLARGE: 30,
    LARGE: 20,
    MEDIUM: 15,
    SMALL: 10,
    XSMALL: 5
  }
};

module.exports = Style;
