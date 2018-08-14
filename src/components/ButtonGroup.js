const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

import { withTheme } from './Theme';
const Button = require('./Button');

const { buttonTypes, themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

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
    theme: themeShape,
    type: PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    buttons: [],
    type: 'primaryOutline'
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <div className='mx-button-group'>
        {this.props.buttons.map((button, i) => {
          const isFirstChild = i === 0;
          const isLastChild = i === this.props.buttons.length - 1;
          const isOnlyChild = isFirstChild && isLastChild;
          const isDisabled = button.type === 'disabled';

          const { style, ...rest } = button;

          return (
            <Button
              key={i}
              style={Object.assign({},
                styles.component,
                isFirstChild && styles.firstChild,
                isLastChild && styles.lastChild,
                isOnlyChild && styles.onlyChild,
                isDisabled && styles.disabled,
                style)}
              theme={theme}
              type={this.props.type}
              {...rest}
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

module.exports = withTheme(Radium(ButtonGroup));
