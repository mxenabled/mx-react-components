const React = require('react');
const Radium = require('radium');

const Button = require('./Button');

const StyleConstants = require('../constants/Style');

const ButtonGroup = React.createClass({
  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      icon: React.PropTypes.string,
      text: React.PropTypes.string
    }).isRequired),
    controlArrows: React.PropTypes.bool,
    primaryColor: React.PropTypes.string,
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
      controlArrows: false,
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primaryOutline'
    };
  },

  _getArrows () {
    this.props.buttons.unshift({ icon: 'caret-left' });
    this.props.buttons.push({ icon: 'caret-right' });
  },

  render () {
    const styles = this.styles();
    const buttonType = this.props.type;
    const primaryColor = this.props.primaryColor;

    return (
      <div {...this.props}>
        {this.props.controlArrows ? this._getArrows() : null}
        {this.props.buttons.map(function (button, index, arr) {
          const isFirstChild = index === 0;
          const isLastChild = index === arr.length - 1;
          const isOnlyChild = isFirstChild && isLastChild;

          return (
            <Button
              icon={button.icon}
              key={index}
              primaryColor={primaryColor}
              style={[
                styles.component,
                styles[buttonType],
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild,
                isOnlyChild && styles.onlyChild
              ]}
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
        borderWidth: 1,
        borderRightWidth: 0
      },
      firstChild: {
        borderRadius: '2px 0 0 2px'
      },
      lastChild: {
        borderRadius: '0 2px 2px 0',
        borderRightWidth: 1
      },
      onlyChild: {
        borderRadius: 2,
        borderWidth: 1
      },
      base: {
        borderRight: '1px solid transparent',
        ':hover': {
          borderRadius: 2,
          borderRight: '1px solid initial'
        }
      }
    };
  }
});

module.exports = Radium(ButtonGroup);
