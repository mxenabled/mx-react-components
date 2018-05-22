const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class RadioButton extends React.Component {
  static propTypes = {
    activeButtonStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    checked: PropTypes.bool,
    color: PropTypes.string,
    elementRef: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    onClick: () => {}
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.color);
    const styles = this.styles(theme);

    return (
      <div
        className='mx-radio-button-item'
        onClick={this.props.onClick}
        ref={this.props.elementRef}
        style={styles.component}
      >
        <div className='mx-radio-button' style={styles.radioButton}>
          {this.props.checked ? <div style={styles.radioButtonActive} /> : null}
        </div>
        <div style={styles.children}>{this.props.children}</div>
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: Object.assign({}, {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }, this.props.style),
      radioButton: Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 15,
        height: 15,
        marginRight: 5,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: '100%',
        backgroundColor: theme.Colors.WHITE
      }, this.props.buttonStyle),
      radioButtonActive: Object.assign({}, {
        width: '60%',
        height: '60%',
        borderRadius: '100%',
        backgroundColor: theme.Colors.PRIMARY
      }, this.props.activeButtonStyle)
    };
  };
}

module.exports = withTheme(RadioButton);
