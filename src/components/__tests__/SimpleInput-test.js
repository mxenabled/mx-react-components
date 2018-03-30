import React from 'react'; // eslint-disable-line no-unused-vars
import { mount, shallow } from 'enzyme';

const Icon = require('../Icon');
const SimpleInput = require('../SimpleInput');

describe('SimpleInput', () => {
  it('should render a input', () => {
    const wrapper = shallow(<SimpleInput />);

    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should render a prefix to the left of the input if prop provided', () => {
    const wrapper = shallow(<SimpleInput prefix={(<span>Prefix</span>)} />);

    expect(wrapper.children().first().html()).toEqual('<span>Prefix</span>');
  });

  it('should render a suffix to the right of the input if prop provided', () => {
    const wrapper = shallow(<SimpleInput suffix={(<span>Suffix</span>)} />);

    expect(wrapper.children().last().html()).toEqual('<span>Suffix</span>');
  });

  it('should render a icon to the left of the input if icon prop provided', () => {
    const wrapper = shallow(<SimpleInput icon='cash' />);

    expect(wrapper.children().first().type()).toEqual(Icon);
  });

  it('should render a icon to the right of the input if rightIcon prop provided', () => {
    const wrapper = shallow(<SimpleInput rightIcon='cash' />);

    expect(wrapper.children().last().type()).toEqual(Icon);
  });

  it('should provide a ref to the input via the elementRef prop', () => {
    let inputRef;

    const wrapper = mount(<SimpleInput elementRef={ref => inputRef = ref} />);

    expect(inputRef).toEqual(wrapper.instance().elementRef);
  });
});
