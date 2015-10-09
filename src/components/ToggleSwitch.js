const React = require('react');
const Radium = require('radium');
const RajaIcon = require('./RajaIcon');
const StyleConstants = require('../constants/Style');

const ToggleSwitch = React.createClass({
  propTypes: {
    height: React.PropTypes.string,
    iconSize: React.PropTypes.string,
    isOn: React.PropTypes.bool,
    offColor: React.PropTypes.string,
    offText: React.PropTypes.string,
    onColor: React.PropTypes.string,
    onText: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    width: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      height: '20px',
      iconSize: '14',
      isOn: true,
      offColor: StyleConstants.Colors.BASE_ARC,
      offText: 'Off',
      onColor: StyleConstants.Colors.PRIMARY,
      onText: 'On',
      onToggle () {},
      width: '80px'
    };
  },

  getInitialState () {
    return {
      isOn: true
    };
  },

  componentDidMount () {
    this.setState({
      isOn: this.props.isOn
    });
  },

  componentWillReceiveProps (newProps) {
    if (newProps.isOn !== this.props.isOn) {
      this.setState({
        isOn: newProps.isOn
      });
    }
  },

  _handleToggle () {
    this.setState({
      isOn: !this.state.isOn
    });

    this.props.onToggle();
  },

  render () {
    const styles = {
      component: {
        fontFamily: StyleConstants.FontFamily,
        fontSize: '12px',
        height: this.props.height,
        display: 'inline-block'
      },
      toggle: {
        display: 'inline-block',
        margin: '0 10px',
        width: this.props.width,
        height: this.props.height
      },
      left: {
        transform: 'translateX(0%)',
        transition: 'transform .3s'
      },
      right: {
        transform: 'translateX(100%)',
        transition: 'transform .3s'
      },
      on: {
        position: 'relative',
        backgroundColor: this.props.onColor,
        textAlign: 'center',
        display: 'inline-block',
        height: this.props.height,
        width: '50%'
      },
      onText: {
        color: this.props.onColor
      },
      off: {
        backgroundColor: this.props.offColor
      },
      offText: {
        color: this.props.offColor
      },
      text: {
        fontWeight: 'bold',
        display: 'inline-block',
        height: this.props.height,
        lineHeight: this.props.height,
        verticalAlign: 'top'
      },
      iconStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'inline-block',
        color: '#FFF'
      }
    };

    return (
      <div style={[styles.component, this.props.style]}>
        <div style={[styles.text, this.state.isOn && styles.onText || styles.offText]}>{this.props.onText}</div>
        <div onClick={this._handleToggle} style={[styles.toggle, styles.off]} >
          <div style={[styles.on, this.state.isOn && styles.left || styles.right]}>
            <RajaIcon size={this.props.iconSize} style={styles.iconStyle} type={'check_mark'} />
          </div>
        </div>
        <div style={[styles.text, !this.state.isOn && styles.onText || styles.offText]}>{this.props.offText}</div>
      </div>
    );
  }
});

module.exports = Radium(ToggleSwitch);