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

  _renderButtonContent () {
    const spinnerColor = this._getSpinnerColor(this.props.type);

    const circleStyles = {
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '100%',
      width: this.props.actionText ? 9 : 11,
      height: this.props.actionText ? 9 : 11,
      margin: this.props.actionText ? '0 5' : 0,
      borderTop: '2px solid',
      borderRight: '2px solid ' + spinnerColor.base,
      borderBottom: '2px solid ' + spinnerColor.base,
      borderLeft: '2px solid ' + spinnerColor.base

      // ':hover': {
      //   borderRight: '2px solid ' + spinnerColor.hover,
      //   borderBottom: '2px solid ' + spinnerColor.hover,
      //   borderLeft: '2px solid ' + spinnerColor.hover
      // }
    };

    if (this.props.isActive) {
      return (
        <div>
          <Spin>
            <div style={circleStyles} />
          </Spin>
          {this.props.actionText}
        </div>
      );
    } else {
      return this.props.children;
    }
  },

  _getSpinnerColor (type) {
    const color = {};

    switch (type) {
      case 'secondary':
        color.base = StyleConstants.Colors.FOG;
        break;
      case 'primaryOutline':
      case 'base':
        color.base = StyleConstants.adjustOpacity(StyleConstants.Colors.PRIMARY, 0.5);
        break;
      case 'neutral':
        color.base = StyleConstants.Colors.ASH;
        break;
      default:
        color.base = StyleConstants.adjustOpacity(StyleConstants.Colors.WHITE, 0.5);
    }

    return color;
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
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -30),
          transition: 'all .2s ease-in'
        },
        ':active': {
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -16),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -16),
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
          backgroundColor: StyleConstants.adjustColor(this.props.primaryColor, -16),
          borderColor: StyleConstants.adjustColor(this.props.primaryColor, -16),
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
          backgroundColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -10),
          borderColor: StyleConstants.adjustColor(StyleConstants.Colors.ASH, -10),
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
          color: StyleConstants.adjustColor(this.props.primaryColor, -8),
          fill: StyleConstants.adjustColor(this.props.primaryColor, -8),
          transition: 'all .2s ease-in'
        },
        ':active': {
          color: StyleConstants.adjustColor(this.props.primaryColor, -16),
          fill: StyleConstants.adjustColor(this.props.primaryColor, -16),
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
        {this._renderButtonContent()}
      </div>
    );
  }
});

module.exports = Radium(Button);
