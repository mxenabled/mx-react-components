'use strict';

var React = require('react');
var Radium = require('radium');
var _throttle = require('lodash/function/throttle');

var StyleConstants = require('../constants/Style');

var RangeSelector = React.createClass({
  displayName: 'RangeSelector',

  propTypes: {
    defaultLowerValue: React.PropTypes.number,
    defaultUpperValue: React.PropTypes.number,
    formatter: React.PropTypes.func,
    interval: React.PropTypes.number,
    onLowerDragStop: React.PropTypes.func,
    onUpperDragStop: React.PropTypes.func,
    presets: React.PropTypes.array,
    range: React.PropTypes.number,
    selectedColor: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultLowerValue: 0,
      defaultUpperValue: 1,
      interval: 1,
      formatter: function formatter(value) {
        return value;
      },
      onLowerDragStop: function onLowerDragStop() {},
      onUpperDragStop: function onUpperDragStop() {},
      presets: [],
      range: 100,
      selectedColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState: function getInitialState() {
    var lowerValue = this.props.defaultLowerValue;
    var upperValue = this.props.defaultUpperValue;

    return {
      dragging: null,
      lowerPixels: 0,
      lowerValue: lowerValue,
      selectedLabel: this._getSelectedLabel(lowerValue, upperValue),
      showPresets: !!this.props.presets.length && !lowerValue && !upperValue,
      upperPixels: 1,
      upperValue: upperValue
    };
  },

  componentDidMount: function componentDidMount() {
    this._setDefaultRangeValues();

    window.addEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
  },

  _getSelectedLabel: function _getSelectedLabel(lowerValue, upperValue) {
    if (this.props.presets) {
      var preset = this.props.presets.filter(function (preset) {
        return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
      })[0];

      return preset ? preset.label : null;
    }
  },

  _setDefaultRangeValues: function _setDefaultRangeValues() {
    var component = React.findDOMNode(this.refs.rangeSelector);
    var componentStyles = window.getComputedStyle(component);
    var width = parseInt(componentStyles.width, 0);

    var lowerPixels = Math.round(this.state.lowerValue * width / this.props.range / this.props.interval * this.props.interval);
    var upperPixels = Math.round(this.state.upperValue * width / this.props.range / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels: lowerPixels,
      upperPixels: upperPixels,
      width: width
    });
  },

  _handlePresetClick: function _handlePresetClick(preset) {
    var lowerPixels = Math.round(preset.lowerValue * this.state.width / this.props.range / this.props.interval * this.props.interval);
    var upperPixels = Math.round(preset.upperValue * this.state.width / this.props.range / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels: lowerPixels,
      lowerValue: preset.lowerValue,
      upperPixels: upperPixels,
      upperValue: preset.upperValue,
      showPresets: false,
      selectedLabel: this._getSelectedLabel(preset.lowerValue, preset.upperValue)
    });

    this.props.onLowerDragStop(preset.lowerValue);
    this.props.onUpperDragStop(preset.upperValue);
  },

  _handleMouseDown: function _handleMouseDown(type) {
    this.setState({
      dragging: type
    });
  },

  _handleMouseMove: function _handleMouseMove(e) {
    if (this.state.dragging) {
      var newPosition = e.clientX - React.findDOMNode(this.refs.rangeSelector).getBoundingClientRect().left;
      var pixelInterval = this.props.interval * this.state.width / this.props.range;
      var newState = {
        selectedLabel: null
      };

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
      newState[this.state.dragging.toLowerCase() + 'Value'] = Math.round(newPosition * this.props.range / this.state.width / this.props.interval) * this.props.interval;

      this.setState(newState);

      e.preventDefault();
    }
  },

  _handleMouseUp: function _handleMouseUp() {
    if (this.state.dragging) {
      this.props['on' + this.state.dragging + 'DragStop'](this.state[this.state.dragging.toLowerCase() + 'Value']);
    }

    this.setState({
      dragging: false
    });
  },

  _handleToggleViews: function _handleToggleViews() {
    this.setState({
      selectedLabel: null,
      showPresets: !this.state.showPresets
    });
  },

  render: function render() {
    var _this = this;

    var styles = {
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
        marginTop: '6px',
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
        marginTop: '6px',
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
        display: 'block'
      },
      upperToggleLabel: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        textAlign: 'center',
        marginBottom: '2px',
        display: 'block'
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
        right: '10px',
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

    return React.createElement(
      'div',
      { style: [styles.component, this.props.style] },
      React.createElement(
        'div',
        { style: styles.presets },
        this.props.presets.map(function (preset, i) {
          return React.createElement(
            'div',
            { key: preset.label + i, onClick: _this._handlePresetClick.bind(null, preset), style: styles.preset },
            preset.label
          );
        }),
        React.createElement(
          'div',
          { onClick: this._handleToggleViews, style: styles.preset },
          'Custom'
        )
      ),
      React.createElement(
        'div',
        {
          onMouseLeave: this._handleMouseUp,
          onMouseMove: this._handleMouseMove,
          onMouseUp: this._handleMouseUp,
          ref: 'rangeSelector',
          style: styles.range
        },
        this.props.presets.length ? React.createElement(
          'div',
          { onClick: this._handleToggleViews, style: styles.showPresets },
          'Groups'
        ) : null,
        React.createElement('div', { style: styles.track }),
        React.createElement(
          'div',
          { style: styles.selected },
          React.createElement(
            'div',
            { style: styles.selectedLabel },
            this.state.selectedLabel
          )
        ),
        React.createElement(
          'div',
          {
            onMouseDown: this._handleMouseDown.bind(null, 'Lower'),
            onMouseUp: this._handleMouseUp,
            style: styles.lowerToggle
          },
          React.createElement(
            'label',
            { style: styles.lowerToggleLabel },
            this.props.formatter(this.state.lowerValue)
          )
        ),
        React.createElement(
          'div',
          {
            onMouseDown: this._handleMouseDown.bind(null, 'Upper'),
            onMouseUp: this._handleMouseUp,
            style: styles.upperToggle
          },
          React.createElement(
            'label',
            { style: styles.upperToggleLabel },
            this.props.formatter(this.state.upperValue)
          )
        )
      )
    );
  }
});

module.exports = Radium(RangeSelector);