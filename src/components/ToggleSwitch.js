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

  _handleLeftLabelClick () {
    const activePosition = 'left';

    this.setState({
      activePosition
    });

    this.props.onToggle(activePosition);
  }

  _handleRightLabelClick () {
    const activePosition = 'right';

    this.setState({
      activePosition
    });

    this.props.onToggle(activePosition);
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
        <span className='left-label' onClick={this._handleLeftLabelClick.bind(this)} style={[styles.label, this.props.labelStyle, this.state.activePosition === 'left' && styles.activeLabel || styles.inactiveLabel]}>{this.props.leftLabel}</span>
      );
    }
  }

  _renderRightLabel (styles) {
    if (this.props.showLabels) {
      return (
        <span className='right-label' onClick={this._handleRightLabelClick.bind(this)} style={[styles.label, this.props.labelStyle, this.state.activePosition === 'right' && styles.activeLabel || styles.inactiveLabel]}>{this.props.rightLabel}</span>
      );
    }
  }

  render () {
    const styles = {
      activeLabel: {
        color: this.props.activeColor
      },
      component: {
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: '12px',
        height: this.props.height + 'px',
        position: 'relative'
      },
      inactiveLabel: {
        color: this.props.inactiveColor
      },
      label: {
        cursor: 'pointer',
        fontWeight: 'bold'
      },
      left: {
        left: this.props.togglePadding,
        top: this.props.togglePadding,
        transition: 'all .1s'
      },
      right: {
        left: this.props.width - this.props.toggleWidth - this.props.togglePadding,
        top: this.props.togglePadding,
        transition: 'all .1s'
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.INVERSE_PRIMARY,
        borderRadius: '100%',
        height: (this.props.toggleHeight) + 'px',
        position: 'absolute',
        width: (this.props.toggleWidth) + 'px'
      },
      track: {
        backgroundColor: StyleConstants.Colors.LIGHT_FONT,
        borderRadius: this.props.height + 'px',
        cursor: 'pointer',
        display: 'inline-block',
        height: this.props.height + 'px',
        margin: '0 10px',
        position: 'relative',
        verticalAlign: 'middle',
        width: this.props.width + 'px'
      }
    };

    return (
      <div className='toggle-switch-component' style={[styles.component, this.props.componentStyle]}>
        {this._renderLeftLabel(styles)}
        <div className='toggle-switch-track' onClick={this._handleToggle.bind(this)} style={[styles.track, this.props.trackStyle]} >
          <div className='toggle-switch-toggle' style={[styles.toggle, this.state.activePosition === 'left' && styles.left || styles.right, this.props.toggleStyle]}></div>
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
  toggleHeight: React.PropTypes.number,
  togglePadding: React.PropTypes.number,
  toggleStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  toggleWidth: React.PropTypes.number,
  trackStyle: React.PropTypes.oneOfType([
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
  togglePadding: 2,
  toggleHeight: 16,
  toggleWidth: 16,
  width: 38
};

module.exports = Radium(ToggleSwitch);