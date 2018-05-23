import FocusManagement from '../FocusManagement';
import { mount } from 'enzyme';
import React from 'react';

describe('FocusManagement utils', () => {
  let page;
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

    page = mount(
      <div>
        <div>Content {link}</div>
        <div aria-hidden={true} tabIndex={0}>Aria hidden with tab index</div>
        <div tabIndex={-1}>Aria visible but tab index of -1</div>
        {focusableDiv}
        <div id='button'>
          {button}
        </div>
        {select}
        {textArea}
        {input}
      </div>
    );
  });

  afterEach(() => {
    page.unmount();
    button.unmount();
    link.unmount();
    focusableDiv.unmount();
    select.unmount();
    textArea.unmount();
    input.unmount();
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

  describe('reconcileNodeArrays', () => {
    it('should filter out child nodes from parent nodes array', () => {
      const parentNodes = FocusManagement.getFocusableNodesInElement(page.instance());
      const childNodes = FocusManagement.getFocusableNodesInElement(page.childAt(4).instance());
      const filteredNodes = FocusManagement.reconcileNodeArrays(parentNodes, childNodes);
      const expectedFilteredNodes = [
        link.instance(),
        focusableDiv.instance(),
        select.instance(),
        textArea.instance(),
        input.instance()
      ];

      expect(filteredNodes).toHaveLength(5);
      expect(filteredNodes).toEqual(expectedFilteredNodes);
    });
  });
});