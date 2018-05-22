const React = require('react');
const {
  getFocusableNodesInElement,
  reconcileNodeArrays,
  setNodeAttributes
} = require('utils/FocusManagement');

module.exports = class RestrictFocusToChildren extends React.Component {
  constructor (props, context) {
    super(props, context);

    this._wrapper = React.createRef();
    this.focusableNodesInParent = [];
    this.preservedTabIndexValues = [];
  }

  componentDidMount () {
    const focusableNodesInDocument = getFocusableNodesInElement(document);
    const focusableNodesInWrapper = getFocusableNodesInElement(this._wrapper);

    this.focusableNodesInParent = reconcileNodeArrays(
      focusableNodesInDocument,
      focusableNodesInWrapper
    );

    this.focusableNodesInParent.forEach(node => {
      this.preservedTabIndexValues.push(node.getAttribute('tabindex'));
      setNodeAttributes(node, { tabindex: -1, 'aria-hidden': !node.contains(this._wrapper) });
    });
  }

  componentWillUnmount () {
    this.focusableNodesInParent.forEach((node, index) => {
      if (this.preservedTabIndexValues[index] === null) {
        node.removeAttribute('tabindex');
      } else {
        node.setAttribute('tabindex', this.preservedTabIndexValues[index]);
      }

      node.removeAttribute('aria-hidden');
    });
  }

  render () {
    return (
      <div ref={ref => this._wrapper = ref}>
        {this.props.children}
      </div>
    );
  }
};