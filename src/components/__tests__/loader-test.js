const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const Loader = require('../Loader');

describe('demo test', () => {
  it('should run a test', () => {
    expect(true).toEqual(true);
  });

  it('renders a div with a className prop', () => {
    const renderer = ReactTestUtils.createRenderer();

    renderer.render(<Loader isLoading={true} isRelative={true} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.className).toBe('mx-loader');
  });
});
