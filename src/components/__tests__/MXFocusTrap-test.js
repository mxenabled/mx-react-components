import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';

const MXFocusTrap = require('../MXFocusTrap');

/**
 * Simple testing component to make test below easier.
 **/
class WrappedMXFocusTrap extends React.Component {
  state = {
    renderParentTrap: false,
    renderChildTrap: false
  }

  render () {
    return (
      <div id='app'>
        <div>App Content</div>
        <div>
          Modal Content
          {this.state.renderParentTrap ? (
            <MXFocusTrap focusTrapOptions={{ portalTo: '#app' }}>
              {trapNumber => {
                return (
                  <div>
                    <button id='outer' style={{ zIndex: trapNumber }}>"Outer Focusable Button"</button>
                    {this.state.renderChildTrap ? (
                      <MXFocusTrap focusTrapOptions={{ portalTo: '#app' }}>
                        {secondTrapNumber => {
                          return (
                            <button id='inner' style={{ zIndex: secondTrapNumber }}>"Inner Focusable Button"</button>
                          );
                        }}
                      </MXFocusTrap>
                    ) : null}
                  </div>
                );
              }}
            </MXFocusTrap>
          ) : null}
        </div>
      </div>
    );
  }
}

describe('MXFocusTrap', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WrappedMXFocusTrap />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should set parentTrap as un-paused when initialy rendered with no child traps', () => {
    wrapper.setState({ renderParentTrap: true });
    const parentTrap = wrapper.find(MXFocusTrap).first().instance();

    expect(parentTrap.state.paused).toEqual(false);
  });

  it('should pause and un-pause parent trap when child trap mounts and unmounts', () => {
    wrapper.setState({ renderParentTrap: true });
    const parentTrap = wrapper.find(MXFocusTrap).first().instance();

    wrapper.setState({ renderChildTrap: true });
    expect(parentTrap.state.paused).toEqual(true);

    wrapper.setState({ renderChildTrap: false });
    expect(parentTrap.state.paused).toEqual(false);
  });

  it('should aria hide and un-hide parent trap when child trap mounts and unmounts', () => {
    wrapper.setState({ renderParentTrap: true });
    const parentTrap = wrapper.find(MXFocusTrap).first();

    wrapper.setState({ renderChildTrap: true });
    expect(parentTrap.html()).toContain('aria-hidden="true"');

    wrapper.setState({ renderChildTrap: false });
    expect(parentTrap.html()).toContain('aria-hidden="false"');
  });

  it('should have the correct zIndex based upon trap number', () => {
    wrapper.setState({ renderParentTrap: true });
    const outerButton = wrapper.find('#outer').first();

    expect(outerButton.html()).toContain('z-index: 1');

    wrapper.setState({ renderChildTrap: true });
    const innerButton = wrapper.find('#inner').first();

    expect(innerButton.html()).toContain('z-index: 2');
  });
});
