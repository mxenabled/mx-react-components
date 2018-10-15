"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = require('react');

var _merge = require('lodash/merge');

var StyleConstants = require('../constants/Style');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var doubleHexCode = function doubleHexCode(color) {
  return color.split('').map(function (char) {
    return char + char;
  }).join('');
};

var StyleUtils = {
  adjustColor: function adjustColor(col, amt) {
    var color = col;
    var usePound = false;

    if (color[0] === '#') {
      color = color.slice(1);
      if (color.length === 3) color = doubleHexCode(color);
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
    return "linear-gradient(".concat(StyleUtils.adjustHexOpacity(startColor, startOpacity), ", ").concat(StyleUtils.adjustHexOpacity(endColor, endOpacity), ")");
  },
  getWindowSize: function getWindowSize(breakPoints) {
    var width = window.innerWidth;
    var windowSize = 'small';

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
  mergeTheme: function mergeTheme(theme) {
    return _merge({}, StyleConstants, theme);
  },

  /**
   * Inject a theme object that has already merged StyleConstants
   * @param {*} Component - a React component
   */
  withMergedTheme: function withMergedTheme(Component) {
    var WrappedComponent = function WrappedComponent(props) {
      var theme = StyleUtils.mergeTheme(props.theme);
      return React.createElement(Component, _extends({}, props, {
        theme: theme
      }));
    };

    WrappedComponent.propTypes = {
      theme: themeShape
    };
    return WrappedComponent;
  }
};
module.exports = StyleUtils;