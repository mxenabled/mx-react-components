const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');
const { css } = require('@mxenabled/cssinjs');

import { withTheme } from '../Theme';
const { themeShape } = require('../../constants/App');
const { isEnterOrSpaceKey } = require('../../utils/KeyPress');

const StyleUtils = require('../../utils/Style');

class Tab extends React.Component {
  static propTypes = {
    activeTabStyles: PropTypes.object,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.object,
    theme: themeShape
  }

  static defaultProps = {
    isActive: false,
    onClick: () => {},
    styles: {}
  }

  _handleSpaceAndEnter = (e) => {
    if (isEnterOrSpaceKey(e)) {
      this.props.onClick();
    }
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    let style = Object.assign({}, styles.tab, this.props.styles.tab);

    if (this.props.isActive)
      style = Object.assign({}, style, styles.activeTab, this.props.styles.activeTab);

    return (
      <button
        aria-label={`${this.props.children} tab`}
        className={`mx-tab ${css(style)}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }

  styles = (theme) => {
    return {
      tab: {
        backgroundColor: 'transparent',
        border: 'none',
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_500,
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: theme.FontSizes.MEDIUM,
        fontStyle: theme.Fonts.SEMIBOLD,
        padding: theme.Spacing.MEDIUM,
        whiteSpace: 'nowrap',
        ':hover': {
          color: theme.Colors.GRAY_700
        },
        ':focus': {
          backgroundColor: theme.Colors.GRAY_300,
          color: theme.Colors.GRAY_700
        }
      },
      activeTab: Object.assign({
        cursor: 'default',
        color: theme.Colors.PRIMARY,
        borderBottom: '2px solid ' + theme.Colors.PRIMARY,

        ':hover': {
          color: theme.Colors.PRIMARY
        }
      }, this.props.activeTabStyles)
    };
  }
}

module.exports = withTheme(Radium(Tab));
