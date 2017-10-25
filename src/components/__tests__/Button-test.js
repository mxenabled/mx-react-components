import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';

import Button from '../Button';
import Icon from '../Icon';

describe('Button', () => {
  it('fires the onClick handler when clicked', () => {
    const onClick = jest.fn();
    const button = shallow(<Button onClick={onClick} />);

    button.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('can show an Icon', () => {
    const withIcon = shallow(<Button icon='add' />);
    const withoutIcon = shallow(<Button />);

    expect(withIcon.find(Icon)).toBePresent();
    expect(withoutIcon.find(Icon)).toBeEmpty();
  });
});