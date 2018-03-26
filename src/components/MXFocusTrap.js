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

module.exports = MXFocusTrap;