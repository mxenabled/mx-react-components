const DeprecatedColors = {
  // GRAYSCALE
  SLATE: '#2C353F',
  CHARCOAL: '#474F59',
  ASH: '#959CA6',
  FOG: '#DFE3E8',
  PORCELAIN: '#F5F6F8',
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
  OTHER: '#959CA6',
  PETS: '#85507B',
  PERSONAL_CARE: '#338B7A',
  SHOPPING: '#CF5F84',
  TAXES: '#32588D',
  TRAVEL: '#e37434',
  UNCATEGORIZED: '#FA5555'
};

const Style = {
  BreakPoints: {
    large: 1200,
    medium: 768,
    small: 320
  },

  // TODO: deprecate exporting DeprecatedColors
  Colors: Object.assign({}, DeprecatedColors, {
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
    SCRIM: 'rgba(247,248,248,0.9)'
  }),

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
  }
};

module.exports = Style;
