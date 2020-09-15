const React = require('react');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');
const { themeShape } = require('../constants/App');

const StyleUtils = {
  adjustColor (col, amt) {

    let color = col
    let usePound = false

    if (color[0] === '#') {
      // remove hash sign
      color = color.slice(1)
      usePound = true;
    }

    // turn it into a 6 digit string
    const colorPadded = color.padStart(6, '0')

    // subtract amount from each individual red green blue value
    let intRVal = parseInt(colorPadded.slice(0,2), 16) + amt  
    let intGVal = parseInt(colorPadded.slice(2,4), 16) + amt
    let intBVal = parseInt(colorPadded.slice(4,6), 16) + amt

    if (intRVal > 255) {
      intRVal = 255;
    } else if (intRVal < 0) {
      intRVal = 0;
    }
    if (intGVal > 255) {
      intGVal = 255;
    } else if (intGVal < 0) {
      intGVal = 0;
    }

    if (intBVal > 255) {
      intBVal = 255;
    } else if (intBVal < 0) {
      intBVal = 0;
    }
    
    // pad each 2 digit hex value to ensure it is in the correct format for css
    const hexR = intRVal.toString(16).padStart(2, '0') 
    const hexG = intGVal.toString(16).padStart(2, '0')
    const hexB = intBVal.toString(16).padStart(2, '0')

    // concatenate the 3 values
    return (usePound ? '#' : '') + (hexR + hexG + hexB)
  },

  adjustHexOpacity (color, opacity) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
  },

  linearGradient (startColor, startOpacity = 0.8, endColor = startColor, endOpacity = 1) {
    return `linear-gradient(${StyleUtils.adjustHexOpacity(startColor, startOpacity)}, ${StyleUtils.adjustHexOpacity(endColor, endOpacity)})`;
  },

  getWindowSize (breakPoints) {
    const width = window.innerWidth;
    let windowSize = 'small';

    if (width >= breakPoints.large) {
      windowSize = 'large';
    } else if (width >= breakPoints.medium) {
      windowSize = 'medium';
    }

    return windowSize;
  },

  /**
   * Abstraction to simplify merging theme colors.
   *
   * @param {Object} theme - Override keys in StyleConstants
   * @returns {Object}
   */
  mergeTheme (theme) {
    return _merge({}, StyleConstants, theme);
  },

  /**
   * Inject a theme object that has already merged StyleConstants
   * @param {*} Component - a React component
   */
  withMergedTheme (Component) {
    const WrappedComponent = (props) => {
      const theme = StyleUtils.mergeTheme(props.theme);

      return <Component {...props} theme={theme} />;
    };

    WrappedComponent.propTypes = {
      theme: themeShape
    };

    return WrappedComponent;
  }
};

module.exports = StyleUtils;
