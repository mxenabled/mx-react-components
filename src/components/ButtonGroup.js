const React = require('react');
const Radium = require('radium');

const Button = require('./Button');

const StyleConstants = require('../constants/Style');

const ButtonGroup = React.createClass({
  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      icon: React.PropTypes.string,
      text: React.PropTypes.string
    })),
    controlAarows: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      'base',
      'disabled',
      'neutral',
      'primary',
      'primaryOutline'
    ])
  },

  getDefaultProps () {
    return {
      buttons: [],
      controlAarows: false,
      type: 'primaryOutline'
    };
  },

  _getAarows () {
    this.props.buttons.unshift({ icon: 'caret-left' });
    this.props.buttons.push({ icon: 'caret-right' });
  },

  render () {
    const styles = this.styles();
    const buttonType = this.props.type;
    const hasHoverStyles = buttonType === 'base' || buttonType === 'neutral';

    return (
      <div {...this.props}>
        {this.props.controlAarows ? this._getAarows : null}
        {this.props.buttons.map(function (button, index, arr) {
          const isFirstChild = index === 0;
          const isLastChild = index === arr.length - 1;

          return (
            <Button
              icon={button.icon}
              key={index}
              style={[styles.component,
                hasHoverStyles && styles.buttonHover,
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild]}
              type={buttonType}>
                {button.text}
            </Button>);
        })}
      </div>
    );
  },

  styles () {
    return {
      component: {
        borderRadius: 0,
        borderRightWidth: 0,
        verticalAlign: 'middle'
      },
      firstChild: {
        borderRadius: '2px 0 0 2px'
      },
      lastChild: {
        borderRadius: '0 2px 2px 0',
        borderRightWidth: 1
      },
      buttonHover: {
        borderRightWidth: 1,
        ':hover': {
          borderColor: StyleConstants.Colors.FOG,
          borderRadius: 2,
          borderStyle: 'solid',
          borderWidth: '1px 1px 1px 1px'
        }
      }
    };
  }
});

module.exports = Radium(ButtonGroup);
