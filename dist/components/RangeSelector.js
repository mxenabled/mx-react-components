"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var ReactDOM = require('react-dom');

var PropTypes = require('prop-types');

var Radium = require('radium');

var _throttle = require('lodash/throttle');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var RangeSelector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RangeSelector, _React$Component);

  function RangeSelector(props, context) {
    var _this;

    _classCallCheck(this, RangeSelector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeSelector).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getSelectedLabel", function (lowerValue, upperValue) {
      if (_this.props.presets) {
        var preset = _this.props.presets.filter(function (preset) {
          return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
        })[0];

        return preset ? preset.label : null;
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_setDefaultRangeValues", function () {
      var component = ReactDOM.findDOMNode(_this.rangeSelectorRef);
      var width = component ? component.offsetWidth : 0; //convert our values to a 0-based scale

      var lowerPosition = _this.state.lowerValue - _this.props.lowerBound;
      var upperPosition = _this.state.upperValue - _this.props.lowerBound; //convert our 0-based values to pixels

      var lowerPixels = Math.round(lowerPosition * width / _this.state.range / _this.props.interval * _this.props.interval);
      var upperPixels = Math.round(upperPosition * width / _this.state.range / _this.props.interval * _this.props.interval);

      _this.setState({
        lowerPixels: lowerPixels,
        upperPixels: upperPixels,
        width: width
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handlePresetClick", function (preset) {
      //convert our values to a 0-based scale
      var lowerPosition = preset.lowerValue - _this.props.lowerBound;
      var upperPosition = preset.upperValue - _this.props.lowerBound; //convert our 0-based values to pixels

      var lowerPixels = Math.round(lowerPosition * _this.state.width / _this.state.range / _this.props.interval * _this.props.interval);
      var upperPixels = Math.round(upperPosition * _this.state.width / _this.state.range / _this.props.interval * _this.props.interval);

      _this.setState({
        lowerPixels: lowerPixels,
        lowerValue: preset.lowerValue,
        upperPixels: upperPixels,
        upperValue: preset.upperValue,
        showPresets: false,
        selectedLabel: _this._getSelectedLabel(preset.lowerValue, preset.upperValue)
      });

      _this.props.onLowerDragStop(preset.lowerValue);

      _this.props.onUpperDragStop(preset.upperValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragStart", function (type) {
      _this.setState({
        dragging: type
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleTrackMouseDown", function (e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var newPixels = clientX - ReactDOM.findDOMNode(_this.rangeSelectorRef).getBoundingClientRect().left;
      var updatedState = {
        trackClicked: true
      };
      var clickBelowLower = newPixels < _this.state.lowerPixels;
      var clickAboveUpper = newPixels > _this.state.upperPixels;
      var clickCloserToLower = newPixels > _this.state.lowerPixels && newPixels < _this.state.lowerPixels + (_this.state.upperPixels - _this.state.lowerPixels) / 2;
      var clickCloserToUpper = newPixels < _this.state.upperPixels && newPixels > _this.state.upperPixels - (_this.state.upperPixels - _this.state.lowerPixels) / 2;

      if (clickBelowLower || clickCloserToLower) {
        updatedState.dragging = 'Lower';
      }

      if (clickAboveUpper || clickCloserToUpper) {
        updatedState.dragging = 'Upper';
      }

      _this.setState(updatedState, _this._handleDragging(e));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragging", function (e) {
      if (_this.state.dragging) {
        var clientX = e.touches ? e.touches[0].clientX : e.clientX;
        var pixelInterval = _this.props.interval * _this.state.width / _this.state.range;
        var newState = {
          selectedLabel: null
        };
        var newPixels = clientX - ReactDOM.findDOMNode(_this.rangeSelectorRef).getBoundingClientRect().left; //make sure we don't go past the end of the track

        newPixels = Math.min(newPixels, _this.state.width); //make sure we don't go past the beginning of the track

        newPixels = Math.max(newPixels, 0); //make sure the lower toggle doesn't go past the upper toggle

        if (_this.state.dragging === 'Lower') {
          newPixels = Math.min(newPixels, _this.state.upperPixels - pixelInterval);
        } //make sure the upper toggle doesn't go past the lower toggle


        if (_this.state.dragging === 'Upper') {
          newPixels = Math.max(newPixels, _this.state.lowerPixels + pixelInterval);
        } //make sure we snap to our interval


        newPixels = Math.round(newPixels / pixelInterval) * pixelInterval; //convert our pixels to a 0-based scale

        var newPosition = newPixels * _this.state.range / _this.state.width + _this.props.lowerBound; //covert our 0-based value to actual value

        var newValue = Math.round(newPosition / _this.props.interval) * _this.props.interval;

        newState[_this.state.dragging.toLowerCase() + 'Pixels'] = newPixels;
        newState[_this.state.dragging.toLowerCase() + 'Value'] = newValue;

        if (_this.state.trackClicked) {
          newState.dragging = false;
          newState.trackClicked = false;
        }

        if (_this.props.updateOnDrag || _this.state.trackClicked) {
          _this.props['on' + _this.state.dragging + 'DragStop'](newValue);
        }

        _this.setState(newState);

        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragEnd", function (e) {
      if (_this.state.dragging) {
        if (_this.state.trackClicked) {
          _this._handleDragging(e);
        } else {
          if (!_this.state.updateOnDrag) {
            _this.props['on' + _this.state.dragging + 'DragStop'](_this.state[_this.state.dragging.toLowerCase() + 'Value']);
          }

          _this.setState({
            dragging: false,
            trackClicked: false
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleToggleViews", function () {
      _this.setState({
        selectedLabel: null,
        showPresets: !_this.state.showPresets
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: {
          position: 'relative',
          fontSize: '11px',
          fontFamily: theme.FontFamily
        },
        presets: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: '20px 0',
          zIndex: 1,
          display: _this.state.showPresets ? 'block' : 'none'
        },
        range: {
          padding: '30px 0',
          margin: '0 10px',
          visibility: _this.state.showPresets ? 'hidden' : 'visible'
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
          boxShadow: theme.ShadowLow,
          position: 'absolute',
          top: '50%',
          left: _this.state.lowerPixels,
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
          boxShadow: theme.ShadowLow,
          position: 'absolute',
          top: '50%',
          left: _this.state.upperPixels,
          marginLeft: '10px',
          transform: 'translate(-50%, -50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: 1
        },
        selected: {
          position: 'absolute',
          left: _this.state.lowerPixels + 10,
          width: _this.state.upperPixels - _this.state.lowerPixels,
          background: theme.Colors.PRIMARY,
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
          color: theme.Colors.PRIMARY
        },
        selectedLabel: {
          textAlign: 'center',
          marginTop: '30px',
          fontStyle: 'italic',
          opacity: 0.5
        }
      };
    });

    var _lowerValue = props.defaultLowerValue;
    var _upperValue = props.defaultUpperValue;
    _this.state = {
      dragging: null,
      lowerPixels: 0,
      lowerValue: _lowerValue,
      range: props.upperBound - props.lowerBound,
      selectedLabel: _this._getSelectedLabel(_lowerValue, _upperValue),
      showPresets: !!props.presets.length && !_lowerValue && !_upperValue,
      upperPixels: 1,
      upperValue: _upperValue,
      trackClicked: false
    };
    return _this;
  }

  _createClass(RangeSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setDefaultRangeValues();

      window.addEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', _throttle(this._setDefaultRangeValues, 300));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-rangeselector",
        ref: this.props.elementRef,
        style: [styles.component, this.props.style]
      }, React.createElement("div", {
        className: "mx-rangeselector-presets",
        style: styles.presets
      }, this.props.presets.map(function (preset, i) {
        return React.createElement("div", {
          className: "mx-rangeselector-preset",
          key: preset.label + i,
          onClick: _this2._handlePresetClick.bind(null, preset),
          style: styles.preset
        }, preset.label);
      }), React.createElement("div", {
        className: "mx-rangeselector-preset",
        onClick: this._handleToggleViews,
        style: styles.preset
      }, "Custom")), React.createElement("div", {
        className: "mx-rangeselector-range",
        onMouseLeave: this._handleDragEnd,
        onMouseMove: this._handleDragging,
        onMouseUp: this._handleDragEnd,
        onTouchEnd: this._handleDragEnd,
        onTouchMove: this._handleDragging,
        ref: function ref(_ref) {
          _this2.rangeSelectorRef = _ref;
        },
        style: styles.range
      }, this.props.presets.length ? React.createElement("div", {
        className: "mx-rangeselector-toggle",
        onClick: this._handleToggleViews,
        style: styles.showPresets
      }, "Groups") : null, React.createElement("div", {
        className: "mx-rangeselector-track-holder",
        onMouseDown: this._handleTrackMouseDown,
        style: styles.trackHolder
      }, React.createElement("div", {
        className: "mx-rangeselector-track",
        style: styles.track
      }), React.createElement("div", {
        className: "mx-rangeselector-selected",
        style: styles.selected
      }, React.createElement("div", {
        className: "mx-rangeselector-selected-label",
        style: styles.selectedLabel
      }, this.state.selectedLabel))), React.createElement("div", {
        className: "mx-rangeselector-lower-toggle",
        onMouseDown: this._handleDragStart.bind(null, 'Lower'),
        onTouchStart: this._handleDragStart.bind(null, 'Lower'),
        style: styles.lowerToggle
      }, React.createElement("label", {
        className: "mx-rangeselector-lower-toggle-label",
        style: styles.lowerToggleLabel
      }, this.props.formatter(this.state.lowerValue))), React.createElement("div", {
        className: "mx-rangeselector-upper-toggle",
        onMouseDown: this._handleDragStart.bind(null, 'Upper'),
        onTouchStart: this._handleDragStart.bind(null, 'Upper'),
        style: styles.upperToggle
      }, React.createElement("label", {
        className: "mx-rangeselector-upper-toggle-label",
        style: styles.upperToggleLabel
      }, this.props.formatter(this.state.upperValue)))));
    }
  }]);

  return RangeSelector;
}(React.Component);

_defineProperty(RangeSelector, "propTypes", {
  defaultLowerValue: PropTypes.number,
  defaultUpperValue: PropTypes.number,
  elementRef: PropTypes.func,
  formatter: PropTypes.func,
  interval: PropTypes.number,
  lowerBound: PropTypes.number,
  onLowerDragStop: PropTypes.func,
  onUpperDragStop: PropTypes.func,
  presets: PropTypes.array,
  theme: themeShape,
  updateOnDrag: PropTypes.bool,
  upperBound: PropTypes.number
});

_defineProperty(RangeSelector, "defaultProps", {
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
  updateOnDrag: false,
  upperBound: 100
});

module.exports = (0, _Theme.withTheme)(Radium(RangeSelector));