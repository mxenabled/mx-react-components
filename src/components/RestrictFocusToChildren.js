const React = require('react');
const {
  getFocusableNodesInElement,
  reconcileNodeArrays,
  setNodeAttributes
} = require('../utils/FocusManagement');

module.exports = class RestrictFocusToChildren extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.focusableNodesInParent = [];
    this.focusableNodesInWrapper = [];
    this.preservedTabIndexValues = [];
    this.previousFocusedNode = document.activeElement;
  }

  componentDidMount () {
    this.focusableNodesInWrapper = getFocusableNodesInElement(this._wrapper);
    this.focusableNodesInParent = reconcileNodeArrays(
      getFocusableNodesInElement(document),
      this.focusableNodesInWrapper
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

    this._tryFocusPreviousNode();
  }

  _tryFocusPreviousNode () {
    const node = this.previousFocusedNode || this.focusableNodesInWrapper[0];

    if (!node || !node.focus || node === document.activeElement) return;

    node.focus();
    if (node.tagName.toLowerCase() === 'input') {
      node.select();
    }
  }

  render () {
    return (
      <div ref={ref => this._wrapper = ref}>
        {this.props.children}
      </div>
    );
  }
};