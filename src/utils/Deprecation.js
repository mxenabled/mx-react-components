module.exports = {
  deprecatePrimaryColor(props, primaryColorPropName = 'primaryColor') {
    if (props[primaryColorPropName]) {
      console.warn(
        `${primaryColorPropName} is deprecated and will be removed in a future release. Use theme instead.`,
      )
    }
  },
}
