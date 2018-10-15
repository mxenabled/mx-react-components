"use strict";

module.exports = {
  deprecatePrimaryColor: function deprecatePrimaryColor(props) {
    var primaryColorPropName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'primaryColor';

    if (props[primaryColorPropName]) {
      console.warn("".concat(primaryColorPropName, " is deprecated and will be removed in a future release. Use theme instead."));
    }
  },
  deprecateProp: function deprecateProp(props, deprecatedPropName, replacementPropName, componentDocsURL) {
    if (props[deprecatedPropName]) {
      console.warn("The ".concat(deprecatedPropName, " prop is deprecated and will be removed in a future release. Use ").concat(replacementPropName, " instead. http://mxenabled.github.io/mx-react-components/#/components/").concat(componentDocsURL));
    }
  },
  deprecatePropWithMessage: function deprecatePropWithMessage(props, deprecatedPropName, message, componentDocsURL) {
    if (props[deprecatedPropName]) {
      console.warn("The ".concat(deprecatedPropName, " prop is deprecated and will be removed in a future release. ").concat(message, " http://mxenabled.github.io/mx-react-components/#/components/").concat(componentDocsURL));
    }
  }
};