const React = require('react');
const _merge = require('lodash/merge');

const StyleConstants = require('../constants/Style');
const { themeShape } = require('../constants/App');

const doubleHexCode = color =>
  color.split('').map(char => char + char).join('');

const StyleUtils = {
  adjustColor (col, amt) {
    let color = col;
    let usePound = false;
    
    if (color[0] === '#') {
      color = color.slice(1).padStart(6, '0');
      // turn it into a 6 digit string
      usePound = true;
    }

    // subtract amount from each individual red green blue value
    let r = parseInt(color.slice(0,2), 16) + amt  
    let g = parseInt(color.slice(2,4), 16) + amt
    let b = parseInt(color.slice(4,6), 16) + amt

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    r = r.toString(16) 
    b = b.toString(16)
    g = g.toString(16)

      // concatenate string
     return (usePound ? '#' : '') + (r + g + b).padStart(6, '0')
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
