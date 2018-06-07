const React = require('react');
const PropTypes = require('prop-types');

import { css } from 'glamor';

import { withTheme } from './Theme';

const Icon = require('./Icon');
const Spin = require('./Spin');

const { buttonTypes, themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class Button extends React.Component {
  static propTypes = {
    'aria-label': PropTypes.string,
    actionText: PropTypes.string,
    buttonRef: PropTypes.func,
    className: PropTypes.string,
    elementProps: PropTypes.object,
    icon: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    style: PropTypes.object,
    theme: themeShape,
    type: PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    elementProps: {},
    onClick () {},
    isActive: false,
    type: 'primary'
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  _windowSizeIsSmall = (theme) => {
    const windowSize = StyleUtils.getWindowSize(theme.BreakPoints);

    return !(windowSize === 'medium' || windowSize === 'large');
  };

  _childIsVisible = child =>
    !child.props || child.props.className !== 'visuallyHidden';

  _hasVisibleChildren = () => {
    if (!this.props.children) {
      return false;
    }

    if (!Array.isArray(this.props.children)) {
      return this._childIsVisible(this.props.children);
    }

    return this.props.children.some(this._childIsVisible);
  };

  render () {
    // Manually consume everything that isn't going to be passed down to the button so we don't have to keep adding props one at a time.
    // Keep elementProps for backwards compatibility.
    const { actionText, buttonRef, children, className, elementProps, icon, isActive, primaryColor, style, theme, ...rest } = this.props;
    const mergedTheme = StyleUtils.mergeTheme(theme, primaryColor);
    const styles = this.styles(mergedTheme);

    return (
      <button
        className={css({ ...styles.component, ...styles[this.props.type], ...style }) + ' ' + className}
        disabled={this.props.type === 'disabled'}
        ref={buttonRef}
        {...rest}
        {...elementProps}
      >
        <div style={styles.children}>
          {(icon && !isActive) && (
            <Icon
              size={20}
              style={styles.icon}
              type={icon}
            />
          )}
          {isActive && (
            <Spin direction='counterclockwise'>
              <Icon size={20} type='spinner' />
            </Spin>
          )}
          <div style={styles.buttonText}>
            {isActive ? actionText : children}
          </div>
        </div>
      </button>
    );
  }

  styles = (theme) => {
    const windowSizeIsSmall = this._windowSizeIsSmall(theme);

    return {
      component: Object.assign({
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'transparent',
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: '4px 14px',
        fontSize: theme.FontSizes.MEDIUM,
        fontFamily: theme.Fonts.SEMIBOLD,
        cursor: this.props.type === 'disabled' ? 'default' : 'pointer',
        transition: 'all .2s ease-in',
        minWidth: 16,
        position: 'relative'
      }, this.props.style),
      children: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        lineHeight: '20px'
      },
      primary: {
        backgroundColor: theme.Colors.PRIMARY,
        borderColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE,
        fill: theme.Colors.WHITE,
        transition: 'all .2s ease-in',

        ':hover': windowSizeIsSmall ? null : {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -15),
          borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
          borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
          transition: 'all .2s ease-in'
        }
      },
      primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: theme.Colors.PRIMARY,
        color: theme.Colors.PRIMARY,
        fill: theme.Colors.PRIMARY,
        transition: 'all .2s ease-in',

        ':hover': windowSizeIsSmall ? null : {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE,
          fill: theme.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
          borderColor: StyleUtils.adjustColor(theme.Colors.PRIMARY, -30),
          color: theme.Colors.WHITE,
          fill: theme.Colors.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      primaryInverse: {
        backgroundColor: theme.Colors.WHITE,
        borderColor: theme.Colors.WHITE,
        color: theme.Colors.PRIMARY,
        fill: theme.Colors.PRIMARY,
        transition: 'all .2s ease-in',

        ':hover': windowSizeIsSmall ? null : {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.WHITE, -15),
          borderColor: StyleUtils.adjustColor(theme.Colors.WHITE, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.WHITE, -30),
          borderColor: StyleUtils.adjustColor(theme.Colors.WHITE, -30),
          transition: 'all .2s ease-in'
        }
      },
      secondary: {
        backgroundColor: theme.Colors.GRAY_300,
        borderColor: 'transparent',
        color: theme.Colors.GRAY_700,
        fill: theme.Colors.GRAY_500,
        transition: 'all .2s ease-in',
        ':hover': windowSizeIsSmall ? null : {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_300, -15),
          borderColor: 'transparent',
          fill: theme.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_300, -30),
          borderColor: 'transparent',
          fill: theme.Colors.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      base: {
        backgroundColor: 'transparent',
        color: theme.Colors.PRIMARY,
        fill: theme.Colors.PRIMARY,
        transition: 'all .2s ease-in',
        borderColor: 'transparent',
        borderRadius: 2,
        borderWidth: 1,
        ':hover': windowSizeIsSmall ? null : {
          color: StyleUtils.adjustColor(theme.Colors.PRIMARY, -8),
          fill: StyleUtils.adjustColor(theme.Colors.PRIMARY, -8),
          transition: 'all .2s ease-in',
          borderColor: theme.Colors.GRAY_300
        },
        ':active': {
          color: StyleUtils.adjustColor(theme.Colors.PRIMARY, -16),
          fill: StyleUtils.adjustColor(theme.Colors.PRIMARY, -16),
          transition: 'all .2s ease-in',
          backgroundColor: theme.Colors.GRAY_100
        }
      },
      neutral: {
        backgroundColor: 'transparent',
        borderColor: theme.Colors.GRAY_300,
        borderRadius: 2,
        borderWidth: 1,
        color: theme.Colors.PRIMARY,
        fill: theme.Colors.PRIMARY,
        ':hover': windowSizeIsSmall ? null : {
          backgroundColor: theme.Colors.GRAY_100
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.Colors.GRAY_100, -15)
        }
      },
      disabled: {
        backgroundColor: 'transparent',
        borderColor: theme.Colors.GRAY_300,
        color: theme.Colors.GRAY_300,
        fill: theme.Colors.GRAY_300
      },
      icon: {
        marginLeft: this._hasVisibleChildren() ? -4 : 0,
        marginRight: this._hasVisibleChildren() ? 5 : 0
      },
      buttonText: {
        marginLeft: (this.props.isActive && this.props.actionText) ? 10 : 0
      }
    };
  };
}

module.exports = withTheme(Button);
