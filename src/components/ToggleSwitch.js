const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');

class ToggleSwitch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activePosition: 'left'
    };
  }

  componentWillMount () {
    this.setState({
      activePosition: this.props.defaultPosition
    });
  }

  _handleToggle () {
    const activePosition = this.state.activePosition === 'left' ? 'right' : 'left';

    this.setState({
      activePosition
    });

    this.props.onToggle(activePosition);
  }

  _renderLeftLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='left-label' style={[styles.label, this.props.labelStyle, this.state.activePosition === 'left' && styles.activeLabel || styles.inactiveLabel]}>{this.props.leftLabel}</span>
      );
    }
  }

  _renderRightLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='right-label' style={[styles.label, this.props.labelStyle, this.state.activePosition === 'right' && styles.activeLabel || styles.inactiveLabel]}>{this.props.rightLabel}</span>
      );
    }
  }

  render () {
    const styles = {
      component: {
        position: 'relative',
        fontFamily: StyleConstants.FontFamily,
        fontSize: '12px',
        height: this.props.height + 'px',
        display: 'inline-block'
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.LIGHT_FONT,
        position: 'relative',
        borderRadius: this.props.height + 'px',
        display: 'inline-block',
        margin: '0 10px',
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        verticalAlign: 'middle',
        cursor: 'pointer'
      },
      left: {
        top: this.props.sliderInset,
        left: this.props.sliderInset,
        transition: 'all .1s'
      },
      right: {
        top: this.props.sliderInset,
        left: this.props.width - this.props.sliderSize - this.props.sliderInset,
        transition: 'all .1s'
      },
      active: {
        position: 'absolute',
        background: StyleConstants.Colors.INVERSE_PRIMARY,
        borderRadius: '100%',
        height: (this.props.sliderSize) + 'px',
        width: (this.props.sliderSize) + 'px'
      },
      activeLabel: {
        color: this.props.activeColor
      },
      inactiveLabel: {
        color: this.props.inactiveColor
      },
      label: {
        fontWeight: 'bold'
      }
    };

    return (
      <div className='toggle-switch-component' style={[styles.component, this.props.componentStyle]}>
        {this._renderLeftLabel(styles)}
        <div className='toggle-switch' onClick={this._handleToggle.bind(this)} style={[styles.toggle, this.props.toggleStyle]} >
          <div className='toggle-switch-slider' style={[styles.active, this.state.activePosition === 'left' && styles.left || styles.right, this.props.sliderStyle]}></div>
          {this.props.children}
        </div>
        {this._renderRightLabel(styles)}
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  activeColor: React.PropTypes.string,
  children: React.PropTypes.node,
  componentStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  defaultPosition: React.PropTypes.oneOf(['left', 'right']),
  height: React.PropTypes.number,
  inactiveColor: React.PropTypes.string,
  labelStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  leftLabel: React.PropTypes.string,
  onToggle: React.PropTypes.func,
  rightLabel: React.PropTypes.string,
  showLabels: React.PropTypes.bool,
  sliderInset: React.PropTypes.number,
  sliderSize: React.PropTypes.number,
  sliderStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  toggleStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  width: React.PropTypes.number
};

ToggleSwitch.defaultProps = {
  activeColor: StyleConstants.Colors.PRIMARY,
  defaultPosition: 'left',
  height: 20,
  inactiveColor: StyleConstants.Colors.LIGHT_FONT,
  leftLabel: 'On',
  onToggle () {},
  rightLabel: 'Off',
  showLabels: true,
  sliderInset: 2,
  sliderSize: 16,
  width: 38
};

module.exports = Radium(ToggleSwitch);