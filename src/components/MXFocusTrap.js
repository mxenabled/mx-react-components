let traps = [];

const PropTypes = require('prop-types');
const React = require('react');
const ReactDOM = require('react-dom');
const FocusTrap = require('focus-trap-react');

/**
 * MXFocusTrap
 *
 * Why is this needed?
 *
 * FocusTrap does not un-pause the previous trap when the current trap is unmounted.
 * This ensures that the previously trapped component is un-paused.
 */
class MXFocusTrap extends React.Component {
  static propTypes = {
    portalTo: PropTypes.string
  }

  state = {
    paused: false
  }

  componentWillMount () {
    // FocusTrap does it's own pausing but these React components also need to be paused
    traps.forEach(component => {
      component.setState({ paused: true });
      ReactDOM.findDOMNode(component).setAttribute('aria-hidden', true);
    });
    traps.push(this);

    this._sibblingNodeToRenderNextTo = this._getSibblingNodeToRenderNextTo(this.props.portalTo);
    this._sibblingNodeToRenderNextTo.setAttribute('aria-hidden', true);
  }

  componentWillUnmount () {
    traps = traps.filter(component => component !== this);
    const lastTrap = traps[traps.length - 1];

    if (lastTrap) {
      lastTrap.setState({ paused: false });
      ReactDOM.findDOMNode(lastTrap).setAttribute('aria-hidden', false);
    } else {
      this._sibblingNodeToRenderNextTo.setAttribute('aria-hidden', false);
    }
  }

  _getSibblingNodeToRenderNextTo = queryString => {
    if (!queryString || typeof queryString !== 'string') {
      return this._getEmptyDivSibling();
    }

    const sibbling = document.querySelector(queryString);

    return sibbling && sibbling.setAttribute ? sibbling : this._getEmptyDivSibling();
  }

  _getEmptyDivSibling = () => {
    const emptyDiv = document.createElement('div');

    document.body.appendChild(emptyDiv);
    return emptyDiv;
  }

  render () {
    return (
      <FocusTrap {...this.props} paused={this.state.paused}>
        {this.props.children}
      </FocusTrap>
    );
  }
}

module.exports = MXFocusTrap;