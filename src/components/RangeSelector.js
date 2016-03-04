const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');
const _throttle = require('lodash/throttle');

const StyleConstants = require('../constants/Style');

const RangeSelector = React.createClass({
  propTypes: {
    defaultLowerValue: React.PropTypes.number,
    defaultUpperValue: React.PropTypes.number,
    formatter: React.PropTypes.func,
    interval: React.PropTypes.number,
    lowerBound: React.PropTypes.number,
    onLowerDragStop: React.PropTypes.func,
    onUpperDragStop: React.PropTypes.func,
    presets: React.PropTypes.array,
    selectedColor: React.PropTypes.string,
    upperBound: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      defaultLowerValue: 0,
      defaultUpperValue: 1,
      interval: 1,
      formatter (value) {
        return value;
      },
      lowerBound: 0,
      onLowerDragStop () {},
      onUpperDragStop () {},
      presets: [],
      selectedColor: StyleConstants.Colors.PRIMARY,
      upperBound: 100
    };
  },

  getInitialState () {
    const lowerValue = this.props.defaultLowerValue;
    const upperValue = this.props.defaultUpperValue;

    return {
      dragging: null,
      lowerPixels: 0,
      lowerValue,
      range: this.props.upperBound - this.props.lowerBound,
      selectedLabel: this._getSelectedLabel(lowerValue, upperValue),
      showPresets: !!this.props.presets.length && !lowerValue && !upperValue,
      upperPixels: 1,
      upperValue,
      trackClicked: false
    };
  },

  componentDidMount () {
    this._setDefaultRangeValues();

    window.addEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
  },

  componentWillUnmount () {
    window.removeEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
  },

  _getSelectedLabel (lowerValue, upperValue) {
    if (this.props.presets) {
      const preset = this.props.presets.filter(preset => {
        return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
      })[0];

      return preset ? preset.label : null;
    } else {
      return null;
    }
  },

  _setDefaultRangeValues () {
    const component = ReactDOM.findDOMNode(this.refs.rangeSelector);
    const componentStyles = window.getComputedStyle(component);
    const width = parseInt(componentStyles.width, 0);

    //convert our values to a 0-based scale
    const lowerPosition = this.state.lowerValue - (this.props.lowerBound);
    const upperPosition = this.state.upperValue - (this.props.lowerBound);

    //convert our 0-based values to pixels
    const lowerPixels = Math.round((lowerPosition * width / this.state.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((upperPosition * width / this.state.range) / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels,
      upperPixels,
      width
    });
  },

  _handlePresetClick (preset) {
    //convert our values to a 0-based scale
    const lowerPosition = preset.lowerValue - (this.props.lowerBound);
    const upperPosition = preset.upperValue - (this.props.lowerBound);

    //convert our 0-based values to pixels
    const lowerPixels = Math.round((lowerPosition * this.state.width / this.state.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((upperPosition * this.state.width / this.state.range) / this.props.interval * this.props.interval);

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
  },

  _handleDragStart (type) {
    this.setState({
      dragging: type
    });
  },

  _handleTrackMouseDown (e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newPixels = clientX - ReactDOM.findDOMNode(this.refs.rangeSelector).getBoundingClientRect().left;
    const updatedState = {
      trackClicked: true
    };
    const clickBelowLower = newPixels < this.state.lowerPixels;
    const clickAboveUpper = newPixels > this.state.upperPixels;
    const clickCloserToLower = newPixels > this.state.lowerPixels && newPixels < (this.state.lowerPixels + (this.state.upperPixels - this.state.lowerPixels) / 2);
    const clickCloserToUpper = newPixels < this.state.upperPixels && newPixels > (this.state.upperPixels - (this.state.upperPixels - this.state.lowerPixels) / 2);

    if (clickBelowLower || clickCloserToLower) {
      updatedState.dragging = 'Lower';
    }

    if (clickAboveUpper || clickCloserToUpper) {
      updatedState.dragging = 'Upper';
    }

    this.setState(updatedState);
  },

  //this method now handles both the dragging of the toggle, and moving it when track is clicked
  _handleDragging (e) {
    if (this.state.dragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pixelInterval = this.props.interval * this.state.width / this.state.range;
      const newState = {
        selectedLabel: null
      };

      let newPixels = clientX - ReactDOM.findDOMNode(this.refs.rangeSelector).getBoundingClientRect().left;

      //make sure we don't go past the end of the track
      newPixels = Math.min(newPixels, this.state.width);

      //make sure we don't go past the beginning of the track
      newPixels = Math.max(newPixels, 0);

      //make sure the lower toggle doesn't go past the upper toggle
      if (this.state.dragging === 'Lower') {
        newPixels = Math.min(newPixels, this.state.upperPixels - pixelInterval);
      }

      //make sure the upper toggle doesn't go past the lower toggle
      if (this.state.dragging === 'Upper') {
        newPixels = Math.max(newPixels, this.state.lowerPixels + pixelInterval);
      }

      //make sure we snap to our interval
      newPixels = Math.round(newPixels / pixelInterval) * pixelInterval;

      //convert our pixels to a 0-based scale
      const newPosition = (newPixels * this.state.range / this.state.width) + this.props.lowerBound;

      //covert our 0-based value to actual value
      const newValue = Math.round(newPosition / this.props.interval) * this.props.interval;

      newState[this.state.dragging.toLowerCase() + 'Pixels'] = newPixels;
      newState[this.state.dragging.toLowerCase() + 'Value'] = newValue;

      if (this.state.trackClicked) {
        newState.dragging = false;
        newState.trackClicked = false;
      }
      this.props['on' + this.state.dragging + 'DragStop'](this.state[this.state.dragging.toLowerCase() + 'Value']);

      this.setState(newState);

      e.preventDefault();
    }
  },

  _handleDragEnd (e) {
    if (this.state.trackClicked) {
      this._handleDragging(e);
    } else {
      this.setState({
        dragging: false,
        trackClicked: false
      });
    }
  },

  _handleToggleViews () {
    this.setState({
      selectedLabel: null,
      showPresets: !this.state.showPresets
    });
  },

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
        padding: '30px 0',
        margin: '0 10px',
        visibility: this.state.showPresets ? 'hidden' : 'visible'
      },
      track: {
        height: '1px',
        background: '#ccc'
      },
      trackHolder: {
        padding: '15px 0',
        cursor: 'pointer'
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
        marginLeft: '10px',
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
        marginLeft: '10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 1
      },
      selected: {
        position: 'absolute',
        left: this.state.lowerPixels + 10,
        width: this.state.upperPixels - this.state.lowerPixels,
        background: this.props.selectedColor,
        height: '3px',
        top: '50%',
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
        marginTop: '30px',
        fontStyle: 'italic',
        opacity: 0.5
      }
    };

    return (
      <div className='mx-rangeselector' style={[styles.component, this.props.style]}>
        <div className='mx-rangeselector-presets' style={styles.presets}>
          {this.props.presets.map((preset, i) => {
            return (
              <div className='mx-rangeselector-preset' key={preset.label + i} onClick={this._handlePresetClick.bind(null, preset)} style={styles.preset} >
                {preset.label}
              </div>
            );
          })}
          <div className='mx-rangeselector-preset' onClick={this._handleToggleViews} style={styles.preset} >
            Custom
          </div>
        </div>
        <div
          className='mx-rangeselector-range'
          onMouseLeave={this._handleDragEnd}
          onMouseMove={this._handleDragging}
          onMouseUp={this._handleDragEnd}
          onTouchMove={this._handleDragging}
          ref='rangeSelector'
          style={styles.range}
        >
          {this.props.presets.length ? <div className='mx-rangeselector-toggle' onClick={this._handleToggleViews} style={styles.showPresets}>Groups</div> : null}
	<div
          className='mx-rangeselector-track-holder'
          onMouseDown={this._handleTrackMouseDown}
          style={styles.trackHolder}
	>
          <div className='mx-rangeselector-track' style={styles.track}></div>
            <div className='mx-rangeselector-selected' style={styles.selected}>
              <div className='mx-rangeselector-selected-label' style={styles.selectedLabel}>
                {this.state.selectedLabel}
              </div>
            </div>
	</div>
          <div
            className='mx-rangeselector-lower-toggle'
            onMouseDown={this._handleDragStart.bind(null, 'Lower')}
            onMouseUp={this._handleDragEnd}
            onTouchEnd={this._handleDragEnd}
            onTouchStart={this._handleDragStart.bind(null, 'Lower')}
            style={styles.lowerToggle}
          >
            <label className='mx-rangeselector-lower-toggle-label' style={styles.lowerToggleLabel}>
              {this.props.formatter(this.state.lowerValue)}
            </label>
          </div>
          <div
            className='mx-rangeselector-upper-toggle'
            onMouseDown={this._handleDragStart.bind(null, 'Upper')}
            onMouseUp={this._handleDragEnd}
            onTouchEnd={this._handleDragEnd}
            onTouchStart={this._handleDragStart.bind(null, 'Upper')}
            style={styles.upperToggle}
          >
            <label className='mx-rangeselector-upper-toggle-label' style={styles.upperToggleLabel}>
              {this.props.formatter(this.state.upperValue)}
            </label>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Radium(RangeSelector);
