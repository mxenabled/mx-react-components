import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';

const SimpleInput = require('../SimpleInput');

describe('SimpleInput', () => {
  it('should render a input', () => {
    const wrapper = mount(<SimpleInput />);

    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should render a prefix to the left of the input if prop provided', () => {
    const wrapper = mount(<SimpleInput prefix={(<span>Prefix</span>)} />);
    const children = wrapper.find('.mx-simple-input').first().children();

    expect(children.first().html()).toEqual('<span>Prefix</span>');
  });

  it('should render a suffix to the right of the input if prop provided', () => {
    const wrapper = mount(<SimpleInput suffix={(<span>Suffix</span>)} />);
    const children = wrapper.find('.mx-simple-input').first().children();

    expect(children.last().html()).toEqual('<span>Suffix</span>');
  });

  it('should provide a ref to the input via the elementRef prop', () => {
    let inputRef;

    const wrapper = mount(<SimpleInput elementRef={ref => inputRef = ref} />);

    expect(inputRef).toEqual(wrapper.find('input').instance());
  });
});
