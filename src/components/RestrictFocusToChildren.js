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
  }

  componentDidMount () {
    const focusableNodesInDocument = getFocusableNodesInElement(document);
    const focusableNodesInWrapper = getFocusableNodesInElement(this._wrapper);

    this.focusableNodesInParent = reconcileNodeArrays(
      focusableNodesInDocument,
      focusableNodesInWrapper
    );

    this.focusableNodesInParent.forEach(node => {
      setNodeAttributes(node, { tabindex: -1, 'aria-hidden': true });
    });
  }

  componentWillUnmount () {
    this.focusableNodesInParent.forEach(node => {
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