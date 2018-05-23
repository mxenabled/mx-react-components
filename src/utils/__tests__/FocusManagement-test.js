import FocusManagement from '../FocusManagement';
import { mount } from 'enzyme';
import React from 'react';

describe('FocusManagement utils', () => {
  let page;
  let child;

  beforeEach(() => {
    child = mount(
      <div>
        Child content
        <button>Child Button</button>
      </div>
    );

    page = mount(
      <div>
        <button>click me</button>
        <div>Content <a href='url'>link in content</a></div>
        <div tabIndex={0}>Focusable Div</div>
        {child}
      </div>
    );
  });

  describe('getFocusableNodesInElement', () => {
    it('should find all focusable nodes', () => {
      const focusableNodes = FocusManagement.getFocusableNodesInElement(page.instance());

      expect(focusableNodes).toHaveLength(4);
    });
  });
});