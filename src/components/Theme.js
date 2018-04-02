import React from 'react';

const ThemeContext = React.createContext('mxTheme');
const { themeShape } = require('../constants/App');

/**
 * Use ThemeProvider at the top-level of the application to
 * make theme available to all theme-able components without
 * the need to explicitly pass the theme prop.
 */
export class ThemeProvider extends React.Component {
  static propTypes = { theme: themeShape }

  render () {
    return (
      <ThemeContext.Provider value={this.props.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

/**
 * `withTheme` injects the `theme` from `ThemeProvider` as a prop into `Component`.
 *
 * `theme` can still be provided as a prop to the themed component to override the theme.
 */
export function withTheme (Component) {
  // "ref" is provided by React.forwardRef
  function ThemedComponent (props, ref) {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Component {...props} ref={ref} theme={props.theme || theme} />
        )}
      </ThemeContext.Consumer>
    );
  }
  ThemedComponent.propTypes = { theme: themeShape };
  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;

  // pass "ref" to ThemedComponent
  return React.forwardRef(ThemedComponent);
}