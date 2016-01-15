const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const StyleUtils = require('../utils/Style');

const Button = React.createClass({
  propTypes: {
    icon: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'base',
      'disabled',
      'neutral',
      'primary',
      'primaryOutline',
      'secondary',
      'secondaryOutline'
    ])
  },

  getDefaultProps () {
    return {
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primary'
    };
  },

  render () {
    const styles = {
      component: {
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'transparent',
        display: 'inline-block',
        padding: '7px 14px',
        textAlign: 'center',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        cursor: 'pointer',
        transition: 'all .2s ease-in',
        minWidth: 50
      },
      primary: {
        backgroundColor: this.props.primaryColor,
        borderColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: StyleUtils.adjustColor(this.props.primaryColor, -8),
          borderColor: StyleUtils.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(this.props.primaryColor, -16),
          borderColor: StyleUtils.adjustColor(this.props.primaryColor, -16),
          transition: 'all .2s ease-in'
        }
      },
      primaryOutline: {
        backgroundColor: 'transparent',
        borderColor: this.props.primaryColor,
        color: this.props.primaryColor,
        fill: this.props.primaryColor,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: this.props.primaryColor,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(this.props.primaryColor, -16),
          borderColor: StyleUtils.adjustColor(this.props.primaryColor, -16),
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        }
      },
      secondary: {
        backgroundColor: StyleConstants.Colors.FOG,
        borderColor: StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.CHARCOAL,
        fill: StyleConstants.Colors.CHARCOAL,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -5),
          borderColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -5),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -10),
          borderColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -10),
          transition: 'all .2s ease-in'
        }
      },
      secondaryOutline: {
        backgroundColor: 'transparent',
        borderColor: StyleConstants.Colors.ASH,
        color: StyleConstants.Colors.ASH,
        fill: StyleConstants.Colors.ASH,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: StyleConstants.Colors.ASH,
          borderColor: StyleConstants.Colors.ASH,
          color: StyleConstants.Colors.WHITE,
          fill: StyleConstants.Colors.WHITE,
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(StyleConstants.Colors.ASH, -10),
          borderColor: StyleUtils.adjustColor(StyleConstants.Colors.ASH, -10),
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

        ':hover': {
          color: StyleUtils.adjustColor(this.props.primaryColor, -8),
          fill: StyleUtils.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in'
        },
        ':active': {
          color: StyleUtils.adjustColor(this.props.primaryColor, -16),
          fill: StyleUtils.adjustColor(this.props.primaryColor, -16),
          transition: 'all .2s ease-in'
        }
      },
      disabled: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderColor: StyleConstants.Colors.PORCELAIN,
        color: StyleConstants.Colors.FOG,
        fill: StyleConstants.Colors.FOG
      },
      icon: {
        marginTop: -6,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: this.props.children ? 5 : -5
      }
    };

    return (
      <div {...this.props} style={[styles.component, styles[this.props.type], this.props.style]}>
        {this.props.icon ? <Icon size={20} style={styles.icon} type={this.props.icon} /> : null}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Radium(Button);