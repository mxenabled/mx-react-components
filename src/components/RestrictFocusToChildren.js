const React = require('react');
const _last = require('lodash/last');
const {
  getFocusableNodesInElement,
  reconcileNodeArrays,
  setNodeAttributes
} = require('../utils/FocusManagement');

const handleFocusIn = e => {
  const lastInstance = _last(instances);
  const nodeBeingFocused = e.target;
  const nodeIsNotHandledInInstance = lastInstance.focusableNodesInWrapper.indexOf(nodeBeingFocused) === -1;

  /**
   * Nodes that are added to the DOM after an instance does
   * its thing have to be handled here in the focusIn event
   * handler.  If the node about to be focused isn't in the
   * last instance's focusable nodes array then we move focus
   * back to where it should be.
   */
  if (nodeIsNotHandledInInstance) {
    const firstFocusableNodeInLastInstance = lastInstance.focusableNodesInWrapper[0];
    const lastFocusableNodeInLastInstance = _last(lastInstance.focusableNodesInWrapper);

    /**
     * The direction the user is tabbing matters so we have to check
     * which element was focused last and compare against the first
     * and last elements in the instances focusable nodes array.
     */

    // Tabbing in reverse (shift+tab)
    if (firstFocusableNodeInLastInstance === document.activeElement) {
      lastFocusableNodeInLastInstance.focus();
    // Tabbing forward (tab)
    } else {
      firstFocusableNodeInLastInstance.focus();
    }
  }
};

let instances = [];

module.exports = class RestrictFocusToChildren extends React.Component {
  constructor (props, context) {
    super(props, context);

    if (instances.length === 0) {
      window.addEventListener('focusin', handleFocusIn);
    }

    instances.push(this);

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

    instances = instances.filter(instance => instance !== this);

    if (instances.length === 0) {
      window.removeEventListener('focusin', handleFocusIn);
    }

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