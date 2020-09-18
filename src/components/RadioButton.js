const PropTypes = require('prop-types');
const React = require('react');
const { css } = require('glamor');

import { withTheme } from './Theme';
const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class RadioButton extends React.Component {
  static propTypes = {
    activeButtonStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    checked: PropTypes.bool,
    elementProps: PropTypes.object,
    elementRef: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    onClick: () => { }
  };

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <button
        aria-checked={this.props.checked}
        className="mx-radio-button-item"
        onClick={this.props.onClick}
        ref={this.props.elementRef}
        role="radio"
        {...this.props.elementProps}
      >
        <div className='mx-radio-button' style={styles.radioButton}>
          {this.props.checked ? <div style={styles.radioButtonActive} /> : null}
        </div>
        <div style={styles.children}>{this.props.children}</div>
      </button>
    );
  }

  styles = (theme) => {
    return {
      component: css({
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: theme.FontSizes.MEDIUM,
        ':focus': {
          outline: 'dotted thin #333'
        },
        ...this.props.style
      }),
      radioButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        height: 15,
        marginRight: 5,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: '100%',
        backgroundColor: theme.Colors.WHITE,
        ...this.props.buttonStyle
      },
      radioButtonActive: {
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        backgroundColor: theme.Colors.PRIMARY,
        ...this.props.activeButtonStyle
      }
    };
  };
}

module.exports = withTheme(RadioButton);
