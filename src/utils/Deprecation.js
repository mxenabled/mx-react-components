module.exports = {
  deprecatePrimaryColor (props) {
    if (props.primaryColor) {
      console.warn('primaryColor is deprecated and will be removed in a future release. Use theme instead.');
    }
  }
};
