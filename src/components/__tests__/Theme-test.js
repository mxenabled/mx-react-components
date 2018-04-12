import React from 'react';
import { mount } from 'enzyme';

import { ThemeProvider, withTheme } from '../Theme';

const ThemedComponent = withTheme(({ theme }) => (
  <div style={{ color: theme ? theme.Colors.PRIMARY : DEFAULT_COLOR }}>
    Hello Theme!
  </div>
));

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
});
