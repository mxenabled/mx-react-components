import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';
import Icon from '../Icon';

describe('Button', () => {
  it('fires the onClick handler when clicked', () => {
    const onClick = jest.fn();
    const button = mount(<Button onClick={onClick} />);

    button.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('can show an Icon', () => {
    const withIcon = mount(<Button icon='add' />);
    const withoutIcon = mount(<Button />);

    expect(withIcon.find(Icon)).toBePresent();
    expect(withoutIcon.find(Icon)).toBeEmpty();
  });

  it('can support real button attributes', () => {
    const button = mount(<Button aria-pressed='false' />);

    expect(button.html()).toContain('aria-pressed');
  });

  describe('non element props', () => {
    it('should not pass down non element props being used elsewhere', () => {
      const button = mount(<Button icon='foo' />);

      expect(button.html()).not.toContain('foo');
    });

    it('should not pass down non element props being used elsewhere', () => {
      const button = mount(<Button actionText='foo' />);

      expect(button.html()).not.toContain('foo');
    });
  });
});
