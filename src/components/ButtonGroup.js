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
      type: 'primaryOutline'
    };
  },

  render () {
    const styles = this.styles();
    const buttonType = this.props.type;
    const hasHoverStyles = buttonType === 'base' || buttonType === 'neutral';

    return (
      <div {...this.props}>
        {this.props.buttons.map(function (button, index, arr) {
          const isFirstChild = index === 0;
          const isLastChild = index === arr.length - 1;

          return (
            <Button
              key={index}
              style={[styles.component,
                hasHoverStyles && styles.hoverStyles,
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
        borderRightWidth: 0
      },
      firstChild: {
        borderRadius: '2px 0 0 2px'
      },
      lastChild: {
        borderRadius: '0 2px 2px 0',
        borderRightWidth: 1
      },
      hoverStyles: {
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
