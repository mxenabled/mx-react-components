let traps = [];

const React = require('react');
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
  state = {
    paused: false
  }

  componentWillMount () {
    // FocusTrap does it's own pausing but these React components also need to be paused
    traps.forEach(component => component.setState({ paused: true }));
    traps.push(this);
  }

  componentWillUnmount () {
    traps = traps.filter(component => component !== this);
    const lastTrap = traps[traps.length - 1];

    if (lastTrap) lastTrap.setState({ paused: false });
  }

  render () {
    return (
      <FocusTrap {...this.props} paused={this.state.paused}>
        {this.props.children}
      </FocusTrap>
    );
  }
}

/**
 * For testing purposes.  This provides an easy way to
 * unmount a child focus trap to ensure the parent is
 * unpaused. This component is only used in MXFocusTrap-test.js
 **/
class WrappedMXFocusTrap extends React.Component {
  state = {
    renderChildTrap: true
  }

  render () {
    return (
      <MXFocusTrap>
        <button>"Outer Focusable Button"</button>
        {this.state.renderChildTrap ? (
          <MXFocusTrap>
            <button>"Inner Focusable Button"</button>
          </MXFocusTrap>
        ) : null}
      </MXFocusTrap>
    );
  }
}


module.exports = {
  MXFocusTrap,
  WrappedMXFocusTrap
};