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

      /**
       * We focus modal and drawer wrapping divs on mount in some cases so if we aria hide
       * that div, all the children inherit the hidden attribute.  To get around that we
       * use the `contains` function on the node to determine if the node contains the wrapper.
       */
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