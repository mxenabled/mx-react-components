const React = require('react');
const _last = require('lodash/last');
const { getFocusableNodesInElement } = require('../utils/FocusManagement');

const handleFocusIn = e => {
  const lastInstance = _last(instances);
  const nodeBeingFocused = e.target;
  const nodeIsNotHandledInInstance = lastInstance.focusableNodesInWrapper.indexOf(nodeBeingFocused) === -1;

  /**
   * Nodes that are added to the DOM after an instance does
   * its thing have to be handled here in the focusIn event
   * handler.  If the node about to be focused isn't in the
   * last instance's focusable nodes array then we redirect
   * focus back to where it should be.
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

    this.focusableNodesInWrapper = [];
    this.previousFocusedNode = document.activeElement;
  }

  componentDidMount () {
    this.focusableNodesInWrapper = getFocusableNodesInElement(this._wrapper);
  }

  componentWillUnmount () {
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