import React from 'react';

const { themeShape } = require('../constants/App');

/**
 * Use ThemeProvider at the top-level of the application to
 * make theme available to all theme-able components without
 * the need to explicitly pass the theme prop.
 */
export class ThemeProvider extends React.Component {
  static propTypes = { theme: themeShape }
  static childContextTypes = { mxTheme: themeShape }

  getChildContext () {
    return { mxTheme: this.props.theme };
  }

  render () {
    return this.props.children;
  }
}

/**
 * ThemeContext is for use inside components that need access
 * to the theme.
 */
export class ThemeContext extends React.Component {
  static contextTypes = {
    mxTheme: themeShape
  }

  render () {
    return this.props.children(this.context.mxTheme);
  }
}