module.exports = {
  deprecatePrimaryColor (props, primaryColorPropName = 'primaryColor') {
    if (props[primaryColorPropName]) {
      console.warn(`${primaryColorPropName} is deprecated and will be removed in a future release. Use theme instead.`);
    }
  },
  deprecateProp (props, deprecatedPropName, replacementPropName, componentDocsURL) {
    if (props[deprecatedPropName]) {
      console.warn(`The ${deprecatedPropName} prop is deprecated and will be removed in a future release. Use ${replacementPropName} instead. http://mxenabled.github.io/mx-react-components/#/components/${componentDocsURL}`);
    }
  }
};
