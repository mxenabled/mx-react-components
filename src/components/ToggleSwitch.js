const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');

class ToggleSwitch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activePosition: this.props.defaultPosition
    };
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
        left: this.props.trackStyle.padding || '2px',
        transition: 'all .1s'
      },
      right: {
        right: this.props.trackStyle.padding || '2px',
        transition: 'all .1s'
      },
      toggle: {
        backgroundColor: StyleConstants.Colors.INVERSE_PRIMARY,
        borderRadius: '100%',
        height: this.props.toggleStyle.height || '20px',
        position: 'absolute',
        width: this.props.toggleStyle.width || '20px'
      },
      track: {
        backgroundColor: StyleConstants.Colors.LIGHT_FONT,
        borderRadius: this.props.trackStyle.height || '20px',
        cursor: 'pointer',
        display: 'inline-block',
        height: this.props.trackStyle.height || '20px',
        margin: '0 10px',
        padding: this.props.trackStyle.padding || '2px',
        position: 'relative',
        verticalAlign: 'middle',
        width: this.props.trackStyle.width || '38px'
      }
    };

    return (
      <div className='toggle-switch-component' style={[styles.component, this.props.componentStyle]}>
        {this._renderLeftLabel(styles)}
        <div className='toggle-switch-track' onClick={this._handleToggle.bind(this)} style={[styles.track, this.props.trackStyle]} >
          <div className='toggle-switch-toggle' style={[styles.toggle, styles[this.state.activePosition], this.props.toggleStyle]}></div>
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
  inactiveColor: React.PropTypes.string,
  labelStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  leftLabel: React.PropTypes.string,
  onToggle: React.PropTypes.func,
  rightLabel: React.PropTypes.string,
  showLabels: React.PropTypes.bool,
  toggleStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  trackStyle: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
};

ToggleSwitch.defaultProps = {
  activeColor: StyleConstants.Colors.PRIMARY,
  defaultPosition: 'left',
  inactiveColor: StyleConstants.Colors.LIGHT_FONT,
  leftLabel: 'On',
  onToggle () {},
  rightLabel: 'Off',
  showLabels: true,
  toggleStyle: {},
  trackStyle: {}
};

module.exports = Radium(ToggleSwitch);