'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var Radium = require('radium');
var _throttle = require('lodash/throttle');

var StyleConstants = require('../constants/Style');

var RangeSelector = function (_React$Component) {
  _inherits(RangeSelector, _React$Component);

  function RangeSelector(props, context) {
    _classCallCheck(this, RangeSelector);

    var _this = _possibleConstructorReturn(this, (RangeSelector.__proto__ || Object.getPrototypeOf(RangeSelector)).call(this, props, context));

    _initialiseProps.call(_this);

    var lowerValue = props.defaultLowerValue;
    var upperValue = props.defaultUpperValue;

    _this.state = {
      dragging: null,
      lowerPixels: 0,
      lowerValue: lowerValue,
      range: props.upperBound - props.lowerBound,
      selectedLabel: _this._getSelectedLabel(lowerValue, upperValue),
      showPresets: !!props.presets.length && !lowerValue && !upperValue,
      upperPixels: 1,
      upperValue: upperValue,
      trackClicked: false
    };
    return _this;
  }

  _createClass(RangeSelector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setDefaultRangeValues();

      window.addEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
    }

    //this method now handles both the dragging of the toggle, and moving it when track is clicked

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();

      return React.createElement(
        'div',
        { className: 'mx-rangeselector', style: [styles.component, this.props.style] },
        React.createElement(
          'div',
          { className: 'mx-rangeselector-presets', style: styles.presets },
          this.props.presets.map(function (preset, i) {
            return React.createElement(
              'div',
              {
                className: 'mx-rangeselector-preset',
                key: preset.label + i,
                onClick: _this2._handlePresetClick.bind(null, preset),
                style: styles.preset
              },
              preset.label
            );
          }),
          React.createElement(
            'div',
            { className: 'mx-rangeselector-preset', onClick: this._handleToggleViews, style: styles.preset },
            'Custom'
          )
        ),
        React.createElement(
          'div',
          {
            className: 'mx-rangeselector-range',
            onMouseLeave: this._handleDragEnd,
            onMouseMove: this._handleDragging,
            onMouseUp: this._handleDragEnd,
            onTouchEnd: this._handleDragEnd,
            onTouchMove: this._handleDragging,
            ref: function ref(_ref) {
              _this2.rangeSelectorRef = _ref;
            },
            style: styles.range
          },
          this.props.presets.length ? React.createElement(
            'div',
            {
              className: 'mx-rangeselector-toggle',
              onClick: this._handleToggleViews,
              style: styles.showPresets
            },
            'Groups'
          ) : null,
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-track-holder',
              onMouseDown: this._handleTrackMouseDown,
              style: styles.trackHolder
            },
            React.createElement('div', { className: 'mx-rangeselector-track', style: styles.track }),
            React.createElement(
              'div',
              { className: 'mx-rangeselector-selected', style: styles.selected },
              React.createElement(
                'div',
                { className: 'mx-rangeselector-selected-label', style: styles.selectedLabel },
                this.state.selectedLabel
              )
            )
          ),
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-lower-toggle',
              onMouseDown: this._handleDragStart.bind(null, 'Lower'),
              onTouchStart: this._handleDragStart.bind(null, 'Lower'),
              style: styles.lowerToggle
            },
            React.createElement(
              'label',
              { className: 'mx-rangeselector-lower-toggle-label', style: styles.lowerToggleLabel },
              this.props.formatter(this.state.lowerValue)
            )
          ),
          React.createElement(
            'div',
            {
              className: 'mx-rangeselector-upper-toggle',
              onMouseDown: this._handleDragStart.bind(null, 'Upper'),
              onTouchStart: this._handleDragStart.bind(null, 'Upper'),
              style: styles.upperToggle
            },
            React.createElement(
              'label',
              { className: 'mx-rangeselector-upper-toggle-label', style: styles.upperToggleLabel },
              this.props.formatter(this.state.upperValue)
            )
          )
        )
      );
    }
  }]);

  return RangeSelector;
}(React.Component);

RangeSelector.propTypes = {
  defaultLowerValue: PropTypes.number,
  defaultUpperValue: PropTypes.number,
  formatter: PropTypes.func,
  interval: PropTypes.number,
  lowerBound: PropTypes.number,
  onLowerDragStop: PropTypes.func,
  onUpperDragStop: PropTypes.func,
  presets: PropTypes.array,
  selectedColor: PropTypes.string,
  updateOnDrag: PropTypes.bool,
  upperBound: PropTypes.number
};
RangeSelector.defaultProps = {
  defaultLowerValue: 0,
  defaultUpperValue: 1,
  interval: 1,
  formatter: function formatter(value) {
    return value;
  },

  lowerBound: 0,
  onLowerDragStop: function onLowerDragStop() {},
  onUpperDragStop: function onUpperDragStop() {},

  presets: [],
  selectedColor: StyleConstants.Colors.PRIMARY,
  updateOnDrag: false,
  upperBound: 100
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._getSelectedLabel = function (lowerValue, upperValue) {
    if (_this3.props.presets) {
      var preset = _this3.props.presets.filter(function (preset) {
        return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
      })[0];

      return preset ? preset.label : null;
    } else {
      return null;
    }
  };

  this._setDefaultRangeValues = function () {
    var component = ReactDOM.findDOMNode(_this3.rangeSelectorRef);
    var componentStyles = window.getComputedStyle(component);
    var width = parseInt(componentStyles.width, 0);

    //convert our values to a 0-based scale
    var lowerPosition = _this3.state.lowerValue - _this3.props.lowerBound;
    var upperPosition = _this3.state.upperValue - _this3.props.lowerBound;

    //convert our 0-based values to pixels
    var lowerPixels = Math.round(lowerPosition * width / _this3.state.range / _this3.props.interval * _this3.props.interval);
    var upperPixels = Math.round(upperPosition * width / _this3.state.range / _this3.props.interval * _this3.props.interval);

    _this3.setState({
      lowerPixels: lowerPixels,
      upperPixels: upperPixels,
      width: width
    });
  };

  this._handlePresetClick = function (preset) {
    //convert our values to a 0-based scale
    var lowerPosition = preset.lowerValue - _this3.props.lowerBound;
    var upperPosition = preset.upperValue - _this3.props.lowerBound;

    //convert our 0-based values to pixels
    var lowerPixels = Math.round(lowerPosition * _this3.state.width / _this3.state.range / _this3.props.interval * _this3.props.interval);
    var upperPixels = Math.round(upperPosition * _this3.state.width / _this3.state.range / _this3.props.interval * _this3.props.interval);

    _this3.setState({
      lowerPixels: lowerPixels,
      lowerValue: preset.lowerValue,
      upperPixels: upperPixels,
      upperValue: preset.upperValue,
      showPresets: false,
      selectedLabel: _this3._getSelectedLabel(preset.lowerValue, preset.upperValue)
    });

    _this3.props.onLowerDragStop(preset.lowerValue);
    _this3.props.onUpperDragStop(preset.upperValue);
  };

  this._handleDragStart = function (type) {
    _this3.setState({
      dragging: type
    });
  };

  this._handleTrackMouseDown = function (e) {
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var newPixels = clientX - ReactDOM.findDOMNode(_this3.rangeSelectorRef).getBoundingClientRect().left;
    var updatedState = {
      trackClicked: true
    };
    var clickBelowLower = newPixels < _this3.state.lowerPixels;
    var clickAboveUpper = newPixels > _this3.state.upperPixels;
    var clickCloserToLower = newPixels > _this3.state.lowerPixels && newPixels < _this3.state.lowerPixels + (_this3.state.upperPixels - _this3.state.lowerPixels) / 2;
    var clickCloserToUpper = newPixels < _this3.state.upperPixels && newPixels > _this3.state.upperPixels - (_this3.state.upperPixels - _this3.state.lowerPixels) / 2;

    if (clickBelowLower || clickCloserToLower) {
      updatedState.dragging = 'Lower';
    }

    if (clickAboveUpper || clickCloserToUpper) {
      updatedState.dragging = 'Upper';
    }

    _this3.setState(updatedState, _this3._handleDragging(e));
  };

  this._handleDragging = function (e) {
    if (_this3.state.dragging) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var pixelInterval = _this3.props.interval * _this3.state.width / _this3.state.range;
      var newState = {
        selectedLabel: null
      };

      var newPixels = clientX - ReactDOM.findDOMNode(_this3.rangeSelectorRef).getBoundingClientRect().left;

      //make sure we don't go past the end of the track
      newPixels = Math.min(newPixels, _this3.state.width);

      //make sure we don't go past the beginning of the track
      newPixels = Math.max(newPixels, 0);

      //make sure the lower toggle doesn't go past the upper toggle
      if (_this3.state.dragging === 'Lower') {
        newPixels = Math.min(newPixels, _this3.state.upperPixels - pixelInterval);
      }

      //make sure the upper toggle doesn't go past the lower toggle
      if (_this3.state.dragging === 'Upper') {
        newPixels = Math.max(newPixels, _this3.state.lowerPixels + pixelInterval);
      }

      //make sure we snap to our interval
      newPixels = Math.round(newPixels / pixelInterval) * pixelInterval;

      //convert our pixels to a 0-based scale
      var newPosition = newPixels * _this3.state.range / _this3.state.width + _this3.props.lowerBound;

      //covert our 0-based value to actual value
      var newValue = Math.round(newPosition / _this3.props.interval) * _this3.props.interval;

      newState[_this3.state.dragging.toLowerCase() + 'Pixels'] = newPixels;
      newState[_this3.state.dragging.toLowerCase() + 'Value'] = newValue;

      if (_this3.state.trackClicked) {
        newState.dragging = false;
        newState.trackClicked = false;
      }

      if (_this3.props.updateOnDrag || _this3.state.trackClicked) {
        _this3.props['on' + _this3.state.dragging + 'DragStop'](newValue);
      }

      _this3.setState(newState);

      e.preventDefault();
    }
  };

  this._handleDragEnd = function (e) {
    if (_this3.state.dragging) {
      if (_this3.state.trackClicked) {
        _this3._handleDragging(e);
      } else {
        if (!_this3.state.updateOnDrag) {
          _this3.props['on' + _this3.state.dragging + 'DragStop'](_this3.state[_this3.state.dragging.toLowerCase() + 'Value']);
        }

        _this3.setState({
          dragging: false,
          trackClicked: false
        });
      }
    }
  };

  this._handleToggleViews = function () {
    _this3.setState({
      selectedLabel: null,
      showPresets: !_this3.state.showPresets
    });
  };

  this.styles = function () {
    return {
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
        display: _this3.state.showPresets ? 'block' : 'none'
      },
      range: {
        padding: '30px 0',
        margin: '0 10px',
        visibility: _this3.state.showPresets ? 'hidden' : 'visible'
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
        boxShadow: StyleConstants.ShadowLow,
        position: 'absolute',
        top: '50%',
        left: _this3.state.lowerPixels,
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
        boxShadow: StyleConstants.ShadowLow,
        position: 'absolute',
        top: '50%',
        left: _this3.state.upperPixels,
        marginLeft: '10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 1
      },
      selected: {
        position: 'absolute',
        left: _this3.state.lowerPixels + 10,
        width: _this3.state.upperPixels - _this3.state.lowerPixels,
        background: _this3.props.selectedColor,
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
        color: _this3.props.selectedColor
      },
      selectedLabel: {
        textAlign: 'center',
        marginTop: '30px',
        fontStyle: 'italic',
        opacity: 0.5
      }
    };
  };
};

module.exports = Radium(RangeSelector);