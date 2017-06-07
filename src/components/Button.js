const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const Icon = require('./Icon');
const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');
const { buttonTypes } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class Button extends React.Component {
  static propTypes = {
    'aria-label': PropTypes.string,
    actionText: PropTypes.string,
    buttonRef: PropTypes.func,
    icon: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    primaryColor: PropTypes.string,
    style: PropTypes.object,
    theme: PropTypes.object,
    type: PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    onClick () {},
    isActive: false,
    theme: StyleConstants,
    type: 'primary'
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  _isLargeOrMediumWindowSize = () => {
    const windowSize = StyleUtils.getWindowSize(StyleConstants.BreakPoints);

    return windowSize === 'medium' || windowSize === 'large';
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
    const styles = this.styles();

    return (
      <button
        aria-label={this.props['aria-label']}
        onClick={this.props.type === 'disabled' ? null : this.props.onClick}
        ref={this.props.buttonRef}
        style={Object.assign({}, styles.component, styles[this.props.type], this.props.style)}
      >
        <div style={styles.children}>
          {(this.props.icon && !this.props.isActive) && (
            <Icon
              elementProps={{ 'aria-hidden': true }}
              size={20}
              style={styles.icon}
              type={this.props.icon}
            />
          )}
          {this.props.isActive && (
            <Spin direction='counterclockwise'>
              <Icon elementProps={{ 'aria-hidden': true }} size={20} type='spinner' />
            </Spin>
          )}
          <div style={styles.buttonText}>
            {this.props.isActive ? this.props.actionText : this.props.children}
          </div>
        </div>
      </button>
    );
  }

  styles = () => {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);

    return {
      component: Object.assign({
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'transparent',
        boxSizing: 'border-box',
        display: 'inline-block',
        padding: '4px 14px',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
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
        backgroundColor: theme.PRIMARY,
        borderColor: theme.PRIMARY,
        color: theme.WHITE,
        fill: theme.WHITE,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleUtils.adjustColor(theme.PRIMARY, -15),
          borderColor: StyleUtils.adjustColor(theme.PRIMARY, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.PRIMARY, -30),
          borderColor: StyleUtils.adjustColor(theme.PRIMARY, -30),
          transition: 'all .2s ease-in'
        }
      },
      primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: theme.PRIMARY,
        color: theme.PRIMARY,
        fill: theme.PRIMARY,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: theme.PRIMARY,
          color: theme.WHITE,
          fill: theme.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.PRIMARY, -30),
          borderColor: StyleUtils.adjustColor(theme.PRIMARY, -30),
          color: theme.WHITE,
          fill: theme.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      primaryInverse: {
        backgroundColor: theme.WHITE,
        borderColor: theme.WHITE,
        color: theme.PRIMARY,
        fill: theme.PRIMARY,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleUtils.adjustColor(theme.WHITE, -15),
          borderColor: StyleUtils.adjustColor(theme.WHITE, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.WHITE, -30),
          borderColor: StyleUtils.adjustColor(theme.WHITE, -30),
          transition: 'all .2s ease-in'
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: theme.GRAY_500,
        color: theme.GRAY_500,
        fill: theme.GRAY_500,
        transition: 'all .2s ease-in',
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: theme.GRAY_500,
          borderColor: theme.GRAY_500,
          color: theme.WHITE,
          fill: theme.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.GRAY_500, -30),
          borderColor: StyleUtils.adjustColor(theme.GRAY_500, -30),
          color: theme.WHITE,
          fill: theme.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      base: {
        backgroundColor: 'transparent',
        color: theme.PRIMARY,
        fill: theme.PRIMARY,
        transition: 'all .2s ease-in',
        borderColor: 'transparent',
        borderRadius: 2,
        borderWidth: 1,
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          color: StyleUtils.adjustColor(theme.PRIMARY, -8),
          fill: StyleUtils.adjustColor(theme.PRIMARY, -8),
          transition: 'all .2s ease-in',
          borderColor: theme.GRAY_300
        },
        ':active': {
          color: StyleUtils.adjustColor(theme.PRIMARY, -16),
          fill: StyleUtils.adjustColor(theme.PRIMARY, -16),
          transition: 'all .2s ease-in',
          backgroundColor: theme.GRAY_100
        }
      },
      neutral: {
        backgroundColor: 'transparent',
        borderColor: theme.GRAY_300,
        borderRadius: 2,
        borderWidth: 1,
        color: theme.PRIMARY,
        fill: theme.PRIMARY,
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: theme.GRAY_100
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(theme.GRAY_100, -15)
        }
      },
      disabled: {
        backgroundColor: 'transparent',
        borderColor: theme.GRAY_300,
        color: theme.GRAY_300,
        fill: theme.GRAY_300
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

module.exports = Radium(Button);
