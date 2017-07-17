'use strict';

var Styles = {
  checkForDeprecated: function checkForDeprecated(props) {
    return props.style && console.warn('The style prop is deprecated and will be removed in a future release. Please use styles.');
  }
};

module.exports = Styles;