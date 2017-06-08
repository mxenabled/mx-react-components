const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

const Button = require('./Button');

const { buttonTypes, themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class ButtonGroup extends React.Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      'aria-label': PropTypes.string,
      icon: PropTypes.string,
      onClick: PropTypes.func,
      style: PropTypes.object,
      text: PropTypes.string,
      type: PropTypes.oneOf(buttonTypes)
    }).isRequired),
    primaryColor: PropTypes.string,
    theme: themeShape,
    type: PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    buttons: [],
    type: 'primaryOutline'
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const styles = this.styles(theme);

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
              style={Object.assign({},
                styles.component,
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild,
                isOnlyChild && styles.onlyChild,
                isDisabled && styles.disabled,
                button.style)}
              theme={theme}
              type={this.props.type}
            >
              {button.text}
            </Button>
          );
        })}
      </div>
    );
  }

  styles = (theme) => {
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
        color: theme.Colors.GRAY_300,
        cursor: 'default',
        fill: theme.Colors.GRAY_300,
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
