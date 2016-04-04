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
      primaryColor: StyleConstants.Colors.PRIMARY,
      type: 'primaryOutline'
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div {...this.props}>
        {this.props.buttons.map((button, i) => {
          const isFirstChild = i === 0;
          const isLastChild = i === this.props.buttons.length - 1;
          const isOnlyChild = isFirstChild && isLastChild;

          return (
            <Button
              icon={button.icon}
              key={i}
              primaryColor={this.props.primaryColor}
              style={[
                styles.component,
                styles[this.props.type],
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild,
                isOnlyChild && styles.onlyChild
              ]}
              type={this.props.type}
            >
              {button.text}
            </Button>
          );
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
