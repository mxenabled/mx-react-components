const React = require("react");
const _merge = require("lodash/merge");

const StyleConstants = require("../constants/Style");
const { themeShape } = require("../constants/App");

const doubleHexCode = color =>
  color
    .split("")
    .map(char => char + char)
    .join("");

const StyleUtils = {
  adjustColor(col, amt) {
    let color = col;
    let usePound = false;

    if (color[0] === "#") {
      color = color.slice(1);
      if (color.length === 3) color = doubleHexCode(color);
      usePound = true;
    }

    const num = parseInt(color, 16);

    let r = (num >> 16) + amt;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    let g = (num & 0x0000ff) + amt;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  },

  adjustHexOpacity(color, opacity) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
  },

  linearGradient(
    startColor,
    startOpacity = 0.8,
    endColor = startColor,
    endOpacity = 1
  ) {
    return `linear-gradient(${StyleUtils.adjustHexOpacity(
      startColor,
      startOpacity
    )}, ${StyleUtils.adjustHexOpacity(endColor, endOpacity)})`;
  },

  getWindowSize(breakPoints) {
    const width = window.innerWidth;
    let windowSize = "small";

    if (width >= breakPoints.large) {
      windowSize = "large";
    } else if (width >= breakPoints.medium) {
      windowSize = "medium";
    }

    return windowSize;
  },

  /**
   * Abstraction to simplify merging theme colors.
   *
   * @param {Object} theme - Override keys in StyleConstants
   * @param {String} primaryColor - Deprecated, will be removed in a future release once it has been replaced by `theme` in each component
   * @returns {Object}
   */
  mergeTheme(theme, primaryColor) {
    const primaryColorTheme = primaryColor && {
      Colors: { PRIMARY: primaryColor }
    };

    return _merge({}, StyleConstants, primaryColorTheme, theme);
  },

  /**
   * Inject a theme object that has already merged StyleConstants
   * @param {*} Component - a React component
   */
  withMergedTheme(Component) {
    const WrappedComponent = props => {
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
