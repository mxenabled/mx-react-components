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
              <button>"Outer Focusable Button"</button>
              {this.state.renderChildTrap ? (
                <MXFocusTrap focusTrapOptions={{ portalTo: '#app' }}>
                  <button>"Inner Focusable Button"</button>
                </MXFocusTrap>
              ) : null}
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

  it('should aria hide and un-hide the application root div when parent trap is mounted and unmounted', () => {
    wrapper.setState({ renderParentTrap: true });
    expect(global.document.body.children[0].outerHTML).toContain('aria-hidden="true"');

    wrapper.setState({ renderParentTrap: false });
    expect(global.document.body.children[0].outerHTML).toContain('aria-hidden="false"');
  });

  it('should portal the focus trap to be a sibling with the root div container', () => {
    wrapper.setState({ renderParentTrap: true });
    const parentTrap = wrapper.find(MXFocusTrap).first();
    const parentOfRootNode = global.document.body;
    const lastChildOfParent = parentOfRootNode.children[parentOfRootNode.children.length - 1];

    expect(lastChildOfParent.outerHTML).toEqual(parentTrap.html());
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
});
