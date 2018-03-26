import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';

const { MXFocusTrap, WrappedMXFocusTrap } = require('../MXFocusTrap');

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
