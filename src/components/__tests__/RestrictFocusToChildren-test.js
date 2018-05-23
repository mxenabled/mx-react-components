import React from 'react';
import { mount } from 'enzyme';

const RestrictFocusToChildren = require('../RestrictFocusToChildren');

class TestComponent extends React.Component {
  state = {
    showContent: false
  }

  render () {
    return (
      <div>
        <button
          id='open-button'
          onClick={e => {
            //Enzyme simulate click was not focusing the button
            e.target.focus();
            this.setState({ showContent: true });
          }}
        >
          Open Content
        </button>
        {this.state.showContent ? (
          <RestrictFocusToChildren>
            <div>
              <button id='close-button' onClick={() => this.setState({ showContent: false })}>
                Close Content
              </button>
            </div>
          </RestrictFocusToChildren>
        ) : null}
      </div>
    );
  }
}

describe('RestrictFocusToChildren', () => {
  let openButton;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TestComponent />, { attachTo: window.document });
    openButton = wrapper.find('#open-button').first();

    openButton.simulate('click');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should remember the last focused node', () => {
    expect(wrapper.find(RestrictFocusToChildren).first().instance().previousFocusedNode)
      .toEqual(openButton.instance());
  });

  it('should return focus to the last focused node on unmount', () => {
    const closeButton = wrapper.find('#close-button').first();

    closeButton.simulate('click');

    expect(window.document.activeElement).toEqual(openButton.instance());
  });

  it('should hide content in parent that is focusable when child is rendered', () => {
    const buttonHTML = openButton.html();

    expect(buttonHTML).toContain('tabindex="-1"');
    expect(buttonHTML).toContain('aria-hidden="true"');
  });

  it('should unhide content in parent that is focusable when child is removed', () => {
    const closeButton = wrapper.find('#close-button').first();

    closeButton.simulate('click');

    const openButtonHTML = openButton.html();

    expect(openButtonHTML).not.toContain('tabindex');
    expect(openButtonHTML).not.toContain('aria-hidden');
  });
});