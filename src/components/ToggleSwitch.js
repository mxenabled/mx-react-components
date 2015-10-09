const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');

const ToggleSwitch = React.createClass({
  propTypes: {
    activeColor: React.PropTypes.string,
    children: React.PropTypes.node,
    defaultPosition: React.PropTypes.oneOf(['left', 'right']),
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
      activeColor: StyleConstants.Colors.PRIMARY,
      defaultPosition: 'left',
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
      activePosition: this.props.defaultPosition
    };
  },


  _handleToggle () {
    const activePosition = this.state.activePosition === 'left' ? 'right' : 'left';

    this.setState({
      activePosition
    });

    this.props.onToggle(activePosition);
  },

  _renderLeftLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='left-label' style={[styles.text, this.state.activePosition === 'left' && styles.activeText || styles.inactiveText]}>{this.props.leftLabel}</span>
      );
    }
  },

  _renderRightLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='right-label' style={[styles.text, this.state.activePosition === 'right' && styles.activeText || styles.inactiveText]}>{this.props.rightLabel}</span>
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
      <div className='toggle-switch-component' style={[styles.component, this.props.style]}>
        {this._renderLeftLabel(styles)}
        <div className='toggle-switch' onClick={this._handleToggle} style={[styles.toggle, styles.inactive]} >
          <div className='toggle-switch-active' style={[styles.active, this.state.activePosition === 'left' && styles.left || styles.right]}>
            {this.props.children}
          </div>
        </div>
        {this._renderRightLabel(styles)}
      </div>
    );
  }
});

module.exports = Radium(ToggleSwitch);