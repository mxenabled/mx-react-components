const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');

import { withTheme } from './Theme';
const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class ToggleSwitch extends React.Component {
  static propTypes = {
    buttonProps: PropTypes.object,
    checked: PropTypes.bool,
    elementRef: PropTypes.func,
    falseIcon: PropTypes.string,
    leftLabel: PropTypes.string,
    onToggle: PropTypes.func,
    rightLabel: PropTypes.string,
    showIcons: PropTypes.bool,
    showLabels: PropTypes.bool,
    styles: PropTypes.object,
    theme: themeShape,
    trueIcon: PropTypes.string
  };

  static defaultProps = {
    ariaLabel: "Toggle Switch",
    checked: false,
    falseIcon: 'close-skinny',
    leftLabel: 'Off',
    onToggle: () => { },
    rightLabel: 'On',
    showLabels: false,
    showIcons: true,
    trueIcon: 'check-skinny'
  };

  _handleToggle = (event) => {
    this.props.onToggle(event);
  };

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <button aria-checked={this.props.checked} className='toggle-switch-component' onClick={this._handleToggle} ref={this.props.elementRef} role="switch" style={styles.component} {...this.props.buttonProps}>
        {this.props.showLabels ? (
          <div className='left-label' style={Object.assign({}, styles.label, this.props.checked ? styles.inactiveLabel : styles.activeLabel)}>{this.props.leftLabel}</div>
        ) : null}
        <div
          className='toggle-switch-track'

          style={Object.assign({}, styles.track, styles[this.props.checked + 'Track'])}
        >
          {this.props.showIcons ? (
            <span>
              <Icon className='true-icon' style={Object.assign({}, styles.icon, styles.trueIcon)} type={this.props.trueIcon} />
              <Icon className='false-icon' style={Object.assign({}, styles.icon, styles.falseIcon)} type={this.props.falseIcon} />
            </span>
          ) : null}
          <div className='toggle-switch-toggle' style={styles.toggle} />
        </div>
        {this.props.showLabels ? (
          <div className='right-label' onClick={this._handleToggle} style={Object.assign({}, styles.label, this.props.checked ? styles.activeLabel : styles.inactiveLabel)}>{this.props.rightLabel}</div>
        ) : null}
      </button>
    );
  }

  styles = (theme) => {
    return Object.assign({}, {
      component: {
        alignItems: 'center',
        display: 'flex',
        fontFamily: theme.Fonts.REGULAR,
        fontSize: theme.FontSizes.MEDIUM,
        position: 'relative',
        border: 'none',
        background: 'transparent'
      },
      icon: {
        fill: theme.Colors.WHITE,
        position: 'absolute',
        top: 0,
        zIndex: 2
      },
      trueIcon: {
        left: 0
      },
      falseIcon: {
        right: 0
      },
      label: {
        cursor: 'pointer',
        fontWeight: 'bold'
      },
      inactiveLabel: {
        color: theme.Colors.GRAY_300
      },
      activeLabel: {
        color: theme.Colors.PRIMARY
      },
      toggle: {
        backgroundColor: theme.Colors.WHITE,
        borderRadius: '100%',
        height: 20,
        left: this.props.checked ? 20 : 2,
        position: 'absolute',
        transition: 'all 0.5s ease',
        width: 20,
        zIndex: 3
      },
      track: {
        borderRadius: 20,
        boxSizing: 'border-box',
        cursor: 'pointer',
        height: 24,
        minHeight: 24,
        margin: '0 10px',
        padding: 2,
        position: 'relative',
        transition: 'all 0.5s ease',
        verticalAlign: 'middle',
        width: 42,
        minWidth: 42,
        zIndex: 1
      },
      trueTrack: {
        backgroundColor: theme.Colors.GRAY_700
      },
      falseTrack: {
        backgroundColor: theme.Colors.GRAY_500
      }
    }, this.props.styles);
  };
}

module.exports = withTheme(Radium(ToggleSwitch));
