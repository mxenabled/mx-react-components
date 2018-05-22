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

    this.state = {
      focusableDOMNodes: []
    };
  }

  componentDidMount () {
    this.setState({ focusableDOMNodes: reconcileNodeArrays(
      getFocusableNodesInElement(document),
      getFocusableNodesInElement(this._wrapper.current))
    }, () => {
      this.state.focusableDOMNodes.forEach(node => {
        setNodeAttributes(node, { tabindex: -1, 'aria-hidden': true });
      });
    });
  }

  componentWillUnmount () {
    this.state.focusableDOMNodes.forEach(node => {
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