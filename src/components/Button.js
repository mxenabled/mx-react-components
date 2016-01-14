const React = require('react');
const Radium = require('radium');

const StyleConstants = require('../constants/Style');

const StyleUtils = require('../utils/Style');

const Button = React.createClass({
  propTypes: {
    primaryColor: React.PropTypes.string,
    type: React.PropTypes.oneOf(['primary', 'disabled', 'base', 'secondary', 'neutral'])
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
        display: 'inline-block',
        padding: '7px 14px',
        textAlign: 'center',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        cursor: 'pointer',
        transition: 'all .2s ease-in'
      },
      primary: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: StyleUtils.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(this.props.primaryColor, -16),
          transition: 'all .2s ease-in'
        }
      },
      secondary: {
        backgroundColor: StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.CHARCOAL,
        transition: 'all .2s ease-in',

        ':hover': {
          backgroundColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -5),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleUtils.adjustColor(StyleConstants.Colors.FOG, -10),
          transition: 'all .2s ease-in'
        }
      },
      base: {
        backgroundColor: 'transparent',
        color: this.props.primaryColor,
        transition: 'all .2s ease-in',

        ':hover': {
          color: StyleUtils.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in'
        },
        ':active': {
          color: StyleUtils.adjustColor(this.props.primaryColor, -16),
          transition: 'all .2s ease-in'
        }
      },
      disabled: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        color: StyleConstants.Colors.FOG
      }
    };

    return (
      <div {...this.props} style={[styles.component, styles[this.props.type], this.props.style]}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Radium(Button);