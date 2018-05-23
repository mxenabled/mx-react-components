import FocusManagement from '../FocusManagement';
import { mount } from 'enzyme';
import React from 'react';

describe('FocusManagement utils', () => {
  let page;
  let child;
  let button;
  let link;
  let focusableDiv;
  let select;
  let textArea;
  let input;

  beforeEach(() => {
    button = mount(<button>Child Button</button>);
    link = mount(<a href='url'>link in content</a>);
    focusableDiv = mount(<div tabIndex={0}>Focusable Div</div>);
    select = mount(<select />);
    textArea = mount(<textarea />);
    input = mount(<input />);

    child = mount(
      <div>
        Child content
        {button}
      </div>
    );

    page = mount(
      <div>
        <div>Content {link}</div>
        <div aria-hidden={true} tabIndex={0}>Aria hidden with tab index</div>
        <div tabIndex={-1}>Aria visible but tab index of -1</div>
        {focusableDiv}
        {child}
        {select}
        {textArea}
        {input}
      </div>
    );
  });

  describe('getFocusableNodesInElement', () => {
    it('should find all focusable nodes that are NOT aria-hidden or have tabIndex 0f -1', () => {
      const focusableNodes = FocusManagement.getFocusableNodesInElement(page.instance());
      const expectedArrayOfNodes = [
        link.instance(),
        focusableDiv.instance(),
        button.instance(),
        select.instance(),
        textArea.instance(),
        input.instance()
      ];

      expect(focusableNodes).toHaveLength(6);
      expect(focusableNodes).toEqual(expectedArrayOfNodes);
    });
  });
});