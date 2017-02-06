const React = require('react');
const Radium = require('radium');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const { buttonTypes } = require('../constants/App');

const Button = React.createClass({
  propTypes: {
    actionText: React.PropTypes.string,
    ariaLabel: React.PropTypes.string,
    icon: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    style: React.PropTypes.object,
    type: React.PropTypes.oneOf(buttonTypes)
  },

  getDefaultProps () {
    return {
      onClick () {},
      isActive: false,
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primary'
    };
  },

  _isLargeOrMediumWindowSize () {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'medium' || windowSize === 'large';
  },

  render () {
    const styles = this.styles();

    return (
      <button
        aria-label={this.props.ariaLabel}
        onClick={this.props.type === 'disabled' ? null : this.props.onClick}
        style={Object.assign({}, styles.component, styles[this.props.type], this.props.style)}
      >
        <div style={styles.children}>
          {(this.props.icon && !this.props.isActive) ? <Icon size={20} style={styles.icon} type={this.props.icon} /> : null}
          {this.props.isActive ? (
            <Spin direction='counterclockwise'>
              <Icon size={20} type='spinner' />
            </Spin>
          ) : null }
          <div style={styles.buttonText}>
            {this.props.isActive ? this.props.actionText : this.props.children}
          </div>
        </div>
      </button>
    );
  },

  styles () {
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
        backgroundColor: this.props.primaryColor,
        borderColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -15),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          transition: 'all .2s ease-in'
        }
      },
      primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: this.props.primaryColor,
        color: this.props.primaryColor,
        fill: this.props.primaryColor,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: this.props.primaryColor,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      primaryInverse: {
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: StyleConstants.Colors.WHITE,
        color: this.props.primaryColor,
        fill: this.props.primaryColor,
        transition: 'all .2s ease-in',

        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -15),
          borderColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -15),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -30),
          borderColor: StyleConstants.adjustColor(StyleConstants.Colors.WHITE, -30),
          transition: 'all .2s ease-in'
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: StyleConstants.Colors.ASH,
        color: StyleConstants.Colors.ASH,
        fill: StyleConstants.Colors.ASH,
        transition: 'all .2s ease-in',
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleConstants.Colors.ASH,
          borderColor: StyleConstants.Colors.ASH,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -30),
          borderColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -30),
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      base: {
        backgroundColor: 'transparent',
        color: this.props.primaryColor,
        fill: this.props.primaryColor,
        transition: 'all .2s ease-in',
        borderColor: 'transparent',
        borderRadius: 2,
        borderWidth: 1,
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          color: StyleConstants.adjustColor(this.props.primaryColor, -8),
          fill: StyleConstants.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in',
          borderColor: StyleConstants.Colors.FOG
        },
        ':active': {
          color: StyleConstants.adjustColor(this.props.primaryColor, -16),
          fill: StyleConstants.adjustColor(this.props.primaryColor, -16),
          transition: 'all .2s ease-in',
          backgroundColor: StyleConstants.Colors.PORCELAIN
        }
      },
      neutral: {
        backgroundColor: 'transparent',
        borderColor: StyleConstants.Colors.FOG,
        borderRadius: 2,
        borderWidth: 1,
        color: this.props.primaryColor,
        fill: this.props.primaryColor,
        ':hover': !this._isLargeOrMediumWindowSize() ? null : {
          backgroundColor: StyleConstants.Colors.PORCELAIN
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.PORCELAIN, -15)
        }
      },
      disabled: {
        backgroundColor: 'transparent',
        borderColor: StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.FOG,
        fill: StyleConstants.Colors.FOG
      },
      icon: {
        marginLeft: this.props.children ? -4 : 0,
        marginRight: this.props.children ? 5 : 0
      },
      buttonText: {
        marginLeft: (this.props.isActive && this.props.actionText) ? 10 : 0
      }
    };
  }
});

module.exports = Radium(Button);