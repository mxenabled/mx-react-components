const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');

const ToggleSwitch = React.createClass({
  propTypes: {
    activeByDefault: React.PropTypes.bool,
    activeColor: React.PropTypes.string,
    children: React.PropTypes.node,
    height: React.PropTypes.number,
    inactiveColor: React.PropTypes.string,
    leftLabel: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    rightLabel: React.PropTypes.string,
    showLabels: React.PropTypes.bool,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    width: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      activeByDefault: true,
      activeColor: StyleConstants.Colors.PRIMARY,
      height: 20,
      inactiveColor: StyleConstants.Colors.BASE_ARC,
      leftLabel: 'On',
      onToggle () {},
      rightLabel: 'Off',
      showLabels: true,
      width: 80
    };
  },

  getInitialState () {
    return {
      active: this.props.activeByDefault
    };
  },


  _handleToggle () {
    const active = !this.state.active;

    this.setState({
      active
    });

    this.props.onToggle(active);
  },

  _renderLeftLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span style={[styles.text, this.state.active && styles.activeText || styles.inactiveText]}>{this.props.leftLabel}</span>
      );
    }
  },

  _renderRightLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span style={[styles.text, !this.state.active && styles.activeText || styles.inactiveText]}>{this.props.rightLabel}</span>
      );
    }
  },

  render () {
    const styles = {
      component: {
        fontFamily: StyleConstants.FontFamily,
        fontSize: '12px',
        height: this.props.height + 'px',
        display: 'inline-block'
      },
      toggle: {
        display: 'inline-block',
        margin: '0 10px',
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        verticalAlign: 'middle',
        cursor: 'pointer'
      },
      left: {
        transform: 'translateX(0%)',
        transition: 'transform .1s'
      },
      right: {
        transform: 'translateX(100%)',
        transition: 'transform .1s'
      },
      active: {
        position: 'relative',
        backgroundColor: this.props.activeColor,
        textAlign: 'center',
        display: 'inline-block',
        height: this.props.height + 'px',
        width: '50%'
      },
      activeText: {
        color: this.props.activeColor
      },
      inactive: {
        backgroundColor: this.props.inactiveColor
      },
      inactiveText: {
        color: this.props.inactiveColor
      },
      text: {
        fontWeight: 'bold',
        verticalAlign: 'middle'
      }
    };

    return (
      <div style={[styles.component, this.props.style]}>
        {this._renderLeftLabel(styles)}
        <div onClick={this._handleToggle} style={[styles.toggle, styles.inactive]} >
          <div style={[styles.active, this.state.active && styles.left || styles.right]}>
            {this.props.children}
          </div>
        </div>
        {this._renderRightLabel(styles)}
      </div>
    );
  }
});

module.exports = Radium(ToggleSwitch);