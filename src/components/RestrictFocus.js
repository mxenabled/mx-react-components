const React = require('react');
const {
  getFocusableNodesInElement,
  reconcileNodeArrays,
  setNodeAttributes
} = require('utils/FocusManagement');

module.exports = class RestrictFocus extends React.Component {
  constructor (props, context) {
    super(props, context);

    this._wrapper = React.createRef();
    this.focusableDOMNodes = [];
  }

  componentDidMount () {
    const focusableNodesInDocument = getFocusableNodesInElement(document);
    const focusableNodesInWrapper = getFocusableNodesInElement(this._wrapper);

    this.focusableDOMNodes = reconcileNodeArrays(
      focusableNodesInDocument,
      focusableNodesInWrapper
    );

    this.focusableDOMNodes.forEach(node => {
      setNodeAttributes(node, { tabindex: -1, 'aria-hidden': true });
    });

    console.log('DidMount Test', {
      focusableNodesInDocument,
      focusableNodesInWrapper,
      focusableDOMNodes: this.focusableDOMNodes
    });
  }

  componentWillUnmount () {
    this.focusableDOMNodes.forEach(node => {
      setNodeAttributes(node, { tabindex: 0, 'aria-hidden': false });
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