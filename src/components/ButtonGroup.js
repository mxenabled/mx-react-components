const React = require('react');
const Radium = require('radium');

const Button = require('./Button');

const StyleConstants = require('../constants/Style');

const { buttonTypes } = require('../constants/App');

class ButtonGroup extends React.Component {
  static propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      'aria-label': React.PropTypes.string,
      icon: React.PropTypes.string,
      onClick: React.PropTypes.func,
      style: React.PropTypes.object,
      text: React.PropTypes.string,
      type: React.PropTypes.oneOf(buttonTypes)
    }).isRequired),
    primaryColor: React.PropTypes.string,
    type: React.PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    buttons: [],
    primaryColor: StyleConstants.Colors.PRIMARY,
    type: 'primaryOutline'
  };

  render () {
    const styles = this.styles();

    return (
      <div>
        {this.props.buttons.map((button, i) => {
          const isFirstChild = i === 0;
          const isLastChild = i === this.props.buttons.length - 1;
          const isOnlyChild = isFirstChild && isLastChild;
          const isDisabled = button.type === 'disabled';

          return (
            <Button
              aria-label={button['aria-label']}
              icon={button.icon}
              key={i}
              onClick={isDisabled ? null : button.onClick}
              primaryColor={this.props.primaryColor}
              style={Object.assign({},
                styles.component,
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild,
                isOnlyChild && styles.onlyChild,
                isDisabled && styles.disabled,
                button.style)}
              type={this.props.type}
            >
              {button.text}
            </Button>
          );
        })}
      </div>
    );
  }

  styles = () => {
    return {
      component: Object.assign({
        boxSizing: 'border-box',
        borderRadius: 0,
        borderWidth: 1,
        borderRightWidth: this.props.type === 'base' ? 1 : 0,
        margin: 0,
        verticalAlign: 'middle'
      }, this.props.style),
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
      disabled: {
        backgroundColor: 'transparent',
        color: StyleConstants.Colors.FOG,
        cursor: 'default',
        fill: StyleConstants.Colors.FOG,
        ':hover': {
          backgroundColor: 'transparent'
        },
        ':active': {
          backgroundColor: 'transparent'
        }
      }
    };
  };
}

module.exports = Radium(ButtonGroup);
