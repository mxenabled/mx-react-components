const React = require('react');
const Radium = require('radium');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Button = React.createClass({
  propTypes: {
    actionText: React.PropTypes.string,
    icon: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    primaryColor: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'base',
      'disabled',
      'neutral',
      'primary',
      'primaryOutline',
      'secondary'
    ])
  },

  getDefaultProps () {
    return {
      isActive: false,
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primary'
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div {...this.props} style={[styles.component, styles[this.props.type], this.props.style]}>
        {this.props.icon && !this.props.isActive ? <Icon size={20} style={styles.icon} type={this.props.icon} /> : null}
        {this.props.isActive ? (
          <div>
            <Spin direction='counterclockwise'>
                <Icon size='20' style={[styles.icon, styles.spinner]} type='spinner' />
            </Spin>
              {this.props.actionText ? <div style={styles.actionText}> {this.props.actionText} </div> : null }
          </div>
        ) : this.props.children}
      </div>
    );
  },

  styles () {
    return {
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
        minWidth: 16,
        minHeight: 15
      },
      primary: {
        backgroundColor: this.props.primaryColor,
        borderColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE,
        fill: StyleConstants.Colors.WHITE,
        transition: 'all .2s ease-in',

        ':hover': {
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

        ':hover': {
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
      secondary: {
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
        ':hover': {
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
        ':hover': {
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
        marginTop: -3,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: this.props.children ? 5 : -5,
        verticalAlign: 'initial'
      },
      spinner: {
        marginRight: -5,
        marginTop: -6,
        padding: this.props.actionText ? 0 : 3
      },
      actionText: {
        display: 'inline-block',
        paddingLeft: 10
      }
    };
  }
});

module.exports = Radium(Button);
