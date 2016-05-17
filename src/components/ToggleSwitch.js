const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');
const Icon = require('./Icon');

const ToggleSwitch = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    checkedByDefault: React.PropTypes.bool,
    falseIcon: React.PropTypes.element,
    leftLabel: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    rightLabel: React.PropTypes.string,
    showIcons: React.PropTypes.bool,
    showLabels: React.PropTypes.bool,
    styles: React.PropTypes.object,
    trueIcon: React.PropTypes.element
  },

  getDefaultProps () {
    return {
      checkedByDefault: false,
      leftLabel: 'Off',
      onToggle () {},
      rightLabel: 'On',
      showLabels: false,
      showIcons: true,
      styles: {}
    };
  },

  getInitialState () {
    let checked = false;

    if ('checked' in this.props) {
      checked = this.props.checked;
    } else if ('checkedByDefault' in this.props) {
      checked = this.props.checkedByDefault;
    }
    return {
      checked: !!checked
    };
  },

  _handleToggle (event) {
    this.setState({
      checked: !this.state.checked
    }, () => {
      this.props.onToggle(this.state.checked, event);
    });
  },

  _renderLeftLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='left-label' onClick={this._handleToggle} style={[styles.label, !this.state.checked && styles.activeLabel || styles.inactiveLabel]}>{this.props.leftLabel}</span>
      );
    } else {
      return null;
    }
  },

  _renderRightLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='right-label' onClick={this._handleToggle} style={[styles.label, this.state.checked && styles.activeLabel || styles.inactiveLabel]}>{this.props.rightLabel}</span>
      );
    } else {
      return null;
    }
  },

  _renderIcons (styles) {
    if (!this.props.showIcons) {
      return null;
    }
    let trueIcon = this.props.trueIcon ? this.props.trueIcon : <Icon className='true-icon' style={Object.assign({}, styles.icon, styles.trueIcon)} type='check-skinny' />;
    let falseIcon = this.props.falseIcon ? this.props.falseIcon : <Icon className='false-icon' style={Object.assign({}, styles.icon, styles.falseIcon)} type='close-skinny' />;

    return (
      <span>
        {trueIcon} {falseIcon}
      </span>
    );
  },

  render () {
    const styles = Object.assign({}, {
      component: {
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: '12px',
        position: 'relative'
      },
      icon: {
        fill: StyleConstants.Colors.WHITE,
        position: 'absolute',
        top: '0px',
        zIndex: 2
      },
      trueIcon: {
        left: '0px'
      },
      falseIcon: {
        right: '0px'
      },
      label: {
        cursor: 'pointer',
        fontWeight: 'bold'
      },
      inactiveLabel: {
        color: StyleConstants.Colors.FOG
      },
      activeLabel: {
        color: StyleConstants.Colors.PRIMARY
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.WHITE,
        borderRadius: '100%',
        height: '20px',
        position: 'absolute',
        width: '20px',
        transition: 'all 0.5s ease',
        zIndex: 3
      },
      falseToggle: {
        left: '2px'
      },
      trueToggle: {
        left: '20px'
      },
      track: {
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'inline-block',
        height: '20px',
        margin: '0 10px',
        padding: '2px',
        position: 'relative',
        transition: 'all 0.5s ease',
        verticalAlign: 'middle',
        width: '38px',
        zIndex: 1
      },
      trueTrack: {
        backgroundColor: StyleConstants.Colors.CHARCOAL
      },
      falseTrack: {
        backgroundColor: StyleConstants.Colors.ASH
      }
    }, this.props.styles);

    return (
      <div className='toggle-switch-component' style={styles.component}>
        {this._renderLeftLabel(styles)}
        <div
          className='toggle-switch-track'
          onClick={this._handleToggle}
          style={Object.assign({}, styles.track, styles[this.state.checked + 'Track'])}
        >
          <div className='toggle-switch-toggle' style={Object.assign({}, styles.toggle, styles[this.state.checked + 'Toggle'])}></div>
          {this._renderIcons(styles)}
        </div>
        {this._renderRightLabel(styles)}
      </div>
    );
  }
});

module.exports = Radium(ToggleSwitch);
