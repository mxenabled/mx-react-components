import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';

const MXFocusTrap = require('../MXFocusTrap');

/**
 * Simple testing component to make test below easier.
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

describe('MXFocusTrap', () => {
  it('should pause and un-pause parent trap when child trap mounts and unmounts', () => {
    expect.assertions(2);

    /**
     * WrappedMXFocusTrap renders a MXFocusTrap within a MXFocusTrap
     * and provides a way to unmount the child trap by setting
     * state on the wrapper.
     **/
    const wrapper = mount(<WrappedMXFocusTrap />);
    const parentTrap = wrapper.find(MXFocusTrap).first().instance();

    // Parent should be un-paused when child is unmounted.
    wrapper.setState({ renderChildTrap: false });
    expect(parentTrap.state.paused).toEqual(false);

    // Parent should be paused when child is mounted.
    wrapper.setState({ renderChildTrap: true });
    expect(parentTrap.state.paused).toEqual(true);
  });
});
