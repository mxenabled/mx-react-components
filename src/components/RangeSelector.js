const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');
const _throttle = require('lodash/function/throttle');
const _bind = require('lodash/function/bind');

const StyleConstants = require('../constants/Style');

class RangeSelector extends React.Component {
  constructor (props) {
    super(props);

    const lowerValue = this.props.defaultLowerValue;
    const upperValue = this.props.defaultUpperValue;

    this.state = {
      dragging: null,
      lowerPixels: 0,
      lowerValue,
      selectedLabel: this._getSelectedLabel(lowerValue, upperValue),
      showPresets: !!this.props.presets.length && !lowerValue && !upperValue,
      upperPixels: 1,
      upperValue
    };
  }

  componentDidMount () {
    this._setDefaultRangeValues();

    window.addEventListener('resize', _throttle(_bind(this._setDefaultRangeValues, this), 300));
  }

  componentWillUnmount () {
    window.removeEventListener('resize', _throttle(_bind(this._setDefaultRangeValues, this), 300));
  }

  _getSelectedLabel (lowerValue, upperValue) {
    if (this.props.presets) {
      const preset = this.props.presets.filter(preset => {
        return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
      })[0];

      return preset ? preset.label : null;
    }
  }

  _setDefaultRangeValues () {
    const component = ReactDOM.findDOMNode(this.refs.rangeSelector);
    const componentStyles = window.getComputedStyle(component);
    const width = parseInt(componentStyles.width, 0);

    const lowerPixels = Math.round((this.state.lowerValue * width / this.props.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((this.state.upperValue * width / this.props.range) / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels,
      upperPixels,
      width
    });
  }

  _handlePresetClick (preset) {
    const lowerPixels = Math.round((preset.lowerValue * this.state.width / this.props.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((preset.upperValue * this.state.width / this.props.range) / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels,
      lowerValue: preset.lowerValue,
      upperPixels,
      upperValue: preset.upperValue,
      showPresets: false,
      selectedLabel: this._getSelectedLabel(preset.lowerValue, preset.upperValue)
    });

    this.props.onLowerDragStop(preset.lowerValue);
    this.props.onUpperDragStop(preset.upperValue);
  }

  _handleDragStart (type) {
    this.setState({
      dragging: type
    });
  }

  _handleDragging (e) {
    if (this.state.dragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pixelInterval = this.props.interval * this.state.width / this.props.range;
      const newState = {
        selectedLabel: null
      };

      let newPosition = clientX - ReactDOM.findDOMNode(this.refs.rangeSelector).getBoundingClientRect().left;

      newPosition = Math.min(newPosition, this.state.width);
      newPosition = Math.max(newPosition, 0);

      if (this.state.dragging === 'Lower') {
        newPosition = Math.min(newPosition, this.state.upperPixels);
      }

      if (this.state.dragging === 'Upper') {
        newPosition = Math.max(newPosition, this.state.lowerPixels);
      }

      newPosition = Math.round(newPosition / pixelInterval) * pixelInterval;

      newState[this.state.dragging.toLowerCase() + 'Pixels'] = newPosition;
      newState[this.state.dragging.toLowerCase() + 'Value'] = Math.round((newPosition * this.props.range / this.state.width) / this.props.interval) * this.props.interval;

      this.setState(newState);

      e.preventDefault();
    }
  }

  _handleDragEnd () {
    if (this.state.dragging) {
      this.props['on' + this.state.dragging + 'DragStop'](this.state[this.state.dragging.toLowerCase() + 'Value']);
    }

    this.setState({
      dragging: false
    });
  }

  _handleToggleViews () {
    this.setState({
      selectedLabel: null,
      showPresets: !this.state.showPresets
    });
  }

  render () {
    const styles = {
      component: {
        position: 'relative',
        fontSize: '11px',
        fontFamily: StyleConstants.FontFamily
      },
      presets: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '20px 0',
        zIndex: 1,
        display: this.state.showPresets ? 'block' : 'none'
      },
      range: {
        padding: '44px 0 30px',
        margin: '0 10px',
        visibility: this.state.showPresets ? 'hidden' : 'visible'
      },
      track: {
        height: '1px',
        background: '#ccc'
      },
      lowerToggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)',
        position: 'absolute',
        top: '50%',
        left: this.state.lowerPixels,
        margin: '6px 0 0 10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer'
      },
      upperToggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)',
        position: 'absolute',
        top: '50%',
        left: this.state.upperPixels,
        margin: '6px 0 0 10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 1
      },
      selected: {
        position: 'absolute',
        left: this.state.lowerPixels,
        width: this.state.upperPixels - this.state.lowerPixels,
        background: this.props.selectedColor,
        height: '3px',
        top: '50%',
        marginTop: '6px',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)'
      },
      lowerToggleLabel: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        textAlign: 'center',
        marginTop: '2px',
        display: 'block',
        cursor: 'pointer',
        minWidth: '20px'
      },
      upperToggleLabel: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        textAlign: 'center',
        marginBottom: '2px',
        display: 'block',
        cursor: 'pointer',
        minWidth: '20px'
      },
      preset: {
        display: 'inline-block',
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '2px',
        padding: '4px 10px 5px',
        margin: '0 5px 5px 0',
        cursor: 'pointer'
      },
      showPresets: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        color: this.props.selectedColor
      },
      selectedLabel: {
        textAlign: 'center',
        marginTop: '17px',
        fontStyle: 'italic',
        opacity: 0.5
      }
    };

    return (
      <div style={[styles.component, this.props.style]}>
        <div style={styles.presets}>
          {this.props.presets.map((preset, i) => {
            return (
              <div key={preset.label + i} onClick={this._handlePresetClick.bind(this, preset)} style={styles.preset} >
                {preset.label}
              </div>
            );
          })}
          <div onClick={this._handleToggleViews.bind(this)} style={styles.preset} >
            Custom
          </div>
        </div>
        <div
          onMouseLeave={this._handleDragEnd.bind(this)}
          onMouseMove={this._handleDragging.bind(this)}
          onMouseUp={this._handleDragEnd.bind(this)}
          onTouchMove={this._handleDragging.bind(this)}
          ref='rangeSelector'
          style={styles.range}
        >
          {this.props.presets.length ? <div onClick={this._handleToggleViews.bind(this)} style={styles.showPresets}>Groups</div> : null}
          <div style={styles.track}></div>
          <div style={styles.selected}>
            <div style={styles.selectedLabel}>
              {this.state.selectedLabel}
            </div>
          </div>
          <div
            onMouseDown={this._handleDragStart.bind(this, 'Lower')}
            onMouseUp={this._handleDragEnd.bind(this)}
            onTouchEnd={this._handleDragEnd.bind(this)}
            onTouchStart={this._handleDragStart.bind(this, 'Lower')}
            style={styles.lowerToggle}
          >
            <label style={styles.lowerToggleLabel}>
              {this.props.formatter(this.state.lowerValue)}
            </label>
          </div>
          <div
            onMouseDown={this._handleDragStart.bind(this, 'Upper')}
            onMouseUp={this._handleDragEnd.bind(this)}
            onTouchEnd={this._handleDragEnd.bind(this)}
            onTouchStart={this._handleDragStart.bind(this, 'Upper')}
            style={styles.upperToggle}
          >
            <label style={styles.upperToggleLabel}>
              {this.props.formatter(this.state.upperValue)}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

RangeSelector.propTypes = {
  defaultLowerValue: React.PropTypes.number,
  defaultUpperValue: React.PropTypes.number,
  formatter: React.PropTypes.func,
  interval: React.PropTypes.number,
  onLowerDragStop: React.PropTypes.func,
  onUpperDragStop: React.PropTypes.func,
  presets: React.PropTypes.array,
  range: React.PropTypes.number,
  selectedColor: React.PropTypes.string
};

RangeSelector.defaultProps = {
  defaultLowerValue: 0,
  defaultUpperValue: 1,
  interval: 1,
  formatter (value) {
    return value;
  },
  onLowerDragStop () {},
  onUpperDragStop () {},
  presets: [],
  range: 100,
  selectedColor: StyleConstants.Colors.PRIMARY
};

module.exports = Radium(RangeSelector);