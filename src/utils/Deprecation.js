module.exports = {
  deprecateProp (props, deprecatedPropName, replacementPropName, componentDocsURL) {
    if (props[deprecatedPropName]) {
      console.warn(`The ${deprecatedPropName} prop is deprecated and will be removed in a future release. Use ${replacementPropName} instead. http://mxenabled.github.io/mx-react-components/#/components/${componentDocsURL}`);
    }
  },
  deprecatePropWithMessage (props, deprecatedPropName, message, componentDocsURL) {
    if (props[deprecatedPropName]) {
      console.warn(`The ${deprecatedPropName} prop is deprecated and will be removed in a future release. ${message} http://mxenabled.github.io/mx-react-components/#/components/${componentDocsURL}`);
    }
  }
};
