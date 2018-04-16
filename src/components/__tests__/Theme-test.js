import PropTypes from 'prop-types';
import React from 'react';
import { mount } from 'enzyme';

import { ThemeProvider, withTheme } from '../Theme';

const ThemedFunctionalComponent = withTheme(({ theme }) => (
  <div style={{ color: theme ? theme.Colors.PRIMARY : DEFAULT_COLOR }}>
    Hello Functional Theme!
  </div>
));

const ThemedComponent = withTheme(
  class Hello extends React.Component {
    static propTypes = { theme: PropTypes.object }

    render () {
      const theme = this.props.theme;

      return (
        <div style={{ color: theme ? theme.Colors.PRIMARY : DEFAULT_COLOR }}>
          Hello Theme!
        </div>
      );
    }
  }
);

const DEFAULT_COLOR = '#F00';
const THEME = {
  Colors: {
    PRIMARY: '#C0FFEE'
  }
};

describe('Theme', () => {
  it('makes the theme available when set on the ThemeProvider', () => {
    const wrapper = mount(
      <ThemeProvider theme={THEME}>
        <ThemedComponent />
      </ThemeProvider>
    );
    const div = wrapper.find(ThemedComponent).find('div').first();

    expect(div.prop('style')).toEqual({ color: THEME.Colors.PRIMARY });
  });

  it('does not pass a theme when ThemeProvider is not used', () => {
    const wrapper = mount(<ThemedComponent />);
    const div = wrapper.find(ThemedComponent).find('div').first();

    expect(div.prop('style')).toEqual({ color: DEFAULT_COLOR });
  });

  it('works with refs on React.Component components', () => {
    let elementRef;

    mount(<div><ThemedComponent ref={ref => (elementRef = ref)} /></div>);
    expect(elementRef).toBeInstanceOf(ThemedComponent);
  });

  it('works with refs on functional stateless components', () => {
    let elementRef;

    mount(<div><ThemedFunctionalComponent ref={ref => (elementRef = ref)} /></div>);
    expect(elementRef).toBeInstanceOf(ThemedFunctionalComponent);
  });
});
