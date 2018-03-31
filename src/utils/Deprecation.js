module.exports = {
  deprecatePrimaryColor (props, primaryColorPropName = 'primaryColor') {
    if (props[primaryColorPropName]) {
      console.warn(`${primaryColorPropName} is deprecated and will be removed in a future release. Use theme instead.`);
    }
  },
  deprecateSimpleInputIcon (props, iconPropName = 'icon') {
    if (props[iconPropName]) {
      console.warn(`The ${iconPropName} prop is deprecated and will be removed in a future release. Use prefix and suffix props instead. http://mxenabled.github.io/mx-react-components/#/components/simple-input`);
    }
  }
};
