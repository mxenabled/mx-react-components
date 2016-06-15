const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');
const Icon = require('./Icon');

const ToggleSwitch = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    falseIcon: React.PropTypes.string,
    leftLabel: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    rightLabel: React.PropTypes.string,
    showIcons: React.PropTypes.bool,
    showLabels: React.PropTypes.bool,
    styles: React.PropTypes.object,
    trueIcon: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      checked: false,
      falseIcon: 'close-skinny',
      leftLabel: 'Off',
      onToggle () {},
      rightLabel: 'On',
      showLabels: false,
      showIcons: true,
      style: {},
      trueIcon: 'check-skinny'
    };
  },

  _handleToggle (event) {
    this.props.onToggle(event);
  },

  render () {
    const styles = this.styles();

    return (
      <div className='toggle-switch-component' style={styles.component}>
        {this.props.showLabels ? (
          <div className='left-label' onClick={this._handleToggle} style={Object.assign({}, styles.label, this.props.checked ? styles.inactiveLabel : styles.activeLabel)}>{this.props.leftLabel}</div>
        ) : null}
        <div
          className='toggle-switch-track'
          onClick={this._handleToggle}
          style={Object.assign({}, styles.track, styles[this.props.checked + 'Track'])}
        >
          {this.props.showIcons ? (
            <Icon className='false-icon' style={Object.assign({}, styles.icon, styles.trueIcon)} type={this.props.trueIcon} />
          ) : null}
          <div className='toggle-switch-toggle' style={styles.toggle}></div>
          {this.props.showIcons ? (
            <Icon className='false-icon' style={Object.assign({}, styles.icon, styles.falseIcon)} type={this.props.falseIcon} />
          ) : null}
        </div>
        {this.props.showLabels ? (
          <div className='right-label' onClick={this._handleToggle} style={Object.assign({}, styles.label, this.props.checked ? styles.activeLabel : styles.inactiveLabel)}>{this.props.rightLabel}</div>
        ) : null}
      </div>
    );
  },

  styles () {
    return Object.assign({}, {
      component: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative'
      },
      icon: {
        fill: StyleConstants.Colors.WHITE,
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
        color: StyleConstants.Colors.FOG
      },
      activeLabel: {
        color: StyleConstants.Colors.PRIMARY
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.WHITE,
        position: 'absolute',
        left: this.props.checked ? null : 2,
        right: this.props.checked ? 2 : null,
        borderRadius: '100%',
        height: 20,
        width: 20,
        transition: 'all 0.5s ease',
        zIndex: 3
      },
      track: {
        boxSizing: 'border-box',
        borderRadius: 20,
        cursor: 'pointer',
        margin: '0 10px',
        padding: 2,
        height: 24,
        position: 'relative',
        transition: 'all 0.5s ease',
        verticalAlign: 'middle',
        width: 42,
        zIndex: 1
      },
      trueTrack: {
        backgroundColor: StyleConstants.Colors.CHARCOAL
      },
      falseTrack: {
        backgroundColor: StyleConstants.Colors.ASH
      }
    }, this.props.styles);
  }

});

module.exports = Radium(ToggleSwitch);
