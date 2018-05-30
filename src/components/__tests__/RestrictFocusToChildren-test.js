import React from 'react';
import { mount } from 'enzyme';

const RestrictFocusToChildren = require('../RestrictFocusToChildren');

const eventMap = {};

window.addEventListener = jest.genMockFn().mockImplementation((event, cb) => {
  eventMap[event] = cb;
});

class TestComponent extends React.Component {
  state = {
    showContent: false,
    showNewContent: false
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
        <div id='focusable-div' tabIndex={2}>Focusable Div</div>
        {this.state.showNewContent ? (<button id='new-button'>New focusable Button</button>) : null}
        {this.state.showContent ? (
          <RestrictFocusToChildren>
            <div>
              <button id='close-button' onClick={() => this.setState({ showContent: false })}>
                Close Content
              </button>
              <button
                id='add-new-node'
                onClick={e => {
                  //Enzyme simulate click was not focusing the button
                  e.target.focus();
                  this.setState({ showNewContent: true });
                }}
              >
                Add New Node
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

  it('should redirect focus on focusin event if node is not in focusable nodes array', () => {
    const closeButton = wrapper.find('#close-button').first();
    const addNewNodeButton = wrapper.find('#add-new-node').first();

    addNewNodeButton.simulate('click');

    const newButton = wrapper.find('#new-button').first().instance();

    eventMap.focusin({ target: newButton });

    expect(window.document.activeElement).toEqual(closeButton.instance());
  });
});