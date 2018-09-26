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

    expect(withIcon.find(Icon)).toExist();
    expect(withoutIcon.find(Icon)).not.toExist();
  });

  it('can support real button attributes', () => {
    const button = mount(<Button aria-pressed='false' />);

    expect(button.html()).toContain('aria-pressed');
  });

  it('merges className when provided as a prop', () => {
    const button = mount(<Button className='foo' />);
    const className = button.find('button').prop('className');

    expect(className).toContain('foo');
    // the glamor class should also be present
    expect(className).toContain('css-');
  });

  describe('non element props', () => {
    it('should not pass down non element props being used elsewhere', () => {
      const button = mount(<Button icon='foo' />);

      expect(button.html()).not.toContain('foo');
    });
  });
});
