const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const { mount, shallow } = require('enzyme');
const jasmineEnzyme = require('jasmine-enzyme');
const Loader = require('../Loader');


describe('Loader Vanilla React Tools', () => {
  let renderer;
  let loaderComponentOutput;

  describe('testing with shallow render', () => {
    beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();

      renderer.render(<Loader isLoading={true} isRelative={true} />);
      loaderComponentOutput = renderer.getRenderOutput();
    });

    it('should run a test', () => {
      expect(true).toEqual(true);
    });

    it('renders a div with a className mx-loader', () => {
      expect(loaderComponentOutput.type).toBe('div');
      expect(loaderComponentOutput.props.className).toBe('mx-loader');
    });

    it('should have a click function', () => {
      expect(loaderComponentOutput.props.children.props.children[1].props.onClick).toBeDefined();
    });
  });

  describe('testing with actual render', () => {
    it('state.testClick should be false by default', () => {
      const component = ReactTestUtils.renderIntoDocument(<Loader isLoading={true} isRelative={true} />);

      expect(component.state.testClick).toBe(false);
    });

    it('should set state.testClick to true on click', () => {
      const onLoaderClick = jasmine.createSpy('onLoaderClick');
      const component = ReactTestUtils.renderIntoDocument(<Loader clickAction={onLoaderClick} isLoading={true} isRelative={true} />);
      const loaderDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'mx-loader-text');

      ReactTestUtils.Simulate.click(loaderDiv);
      expect(component.state.testClick).toBe(true);
      expect(onLoaderClick).toHaveBeenCalled();
    });
  });
});

describe('Loader Enzyme', () => {
  let wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = shallow(<Loader isLoading={true} isRelative={true} />);
  });

  describe('testing with shallow rendering', () => {
    it('renders a div with a className prop', () => {
      expect(wrapper.find('.mx-loader').length).toBe(1);
    });

    it('should have a click function on mx-loader-test', () => {
      expect(wrapper.find('.mx-loader-text').props().onClick).toBeDefined();
    });
  });

  describe('testing with actual render', () => {
    let wrapper;

    beforeEach(() => {
      const onLoaderClick = jasmine.createSpy('onLoaderClick');

      jasmineEnzyme();
      wrapper = mount(<Loader clickAction={onLoaderClick} isLoading={true} isRelative={true} />);
    });

    it('state.testClick should be false by default', () => {
      expect(wrapper.state('testClick')).toBe(false);
    });

    it('should set state.testClick to true on click', () => {
      wrapper.find('.mx-loader-text').simulate('click');
      expect(wrapper.state('testClick')).toBe(true);
    });
  });
});
