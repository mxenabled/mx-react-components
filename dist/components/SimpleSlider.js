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

var _merge = require('lodash/merge');

var browser = require('bowser');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var SimpleSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleSlider, _React$Component);

  function SimpleSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SimpleSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SimpleSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      dragging: false,
      leftPixels: 0,
      width: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getCursorStyle", function () {
      if (_this.props.disabled) {
        return 'not-allowed';
      } else if (browser.msie) {
        return 'pointer';
      } else {
        return _this.state.dragging ? 'grabbing' : 'grab';
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleMouseEvents", function (e) {
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var leftSpace = ReactDOM.findDOMNode(_this.rangeSelectorRef).getBoundingClientRect().left;
      var currentPercent = (clientX - leftSpace) / _this.state.width;

      if (currentPercent < 0) {
        currentPercent = 0;
      } else if (currentPercent > 1) {
        currentPercent = 1;
      }

      _this.props.onPercentChange(currentPercent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragStart", function () {
      _this.setState({
        dragging: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragging", function (e) {
      if (_this.state.dragging) {
        _this._handleMouseEvents(e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragEnd", function () {
      _this.setState({
        dragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      var cursorStyle = _this._getCursorStyle();

      return _merge({}, {
        component: {
          position: 'relative'
        },
        range: {
          padding: '25px 0',
          margin: "0 ".concat(theme.Spacing.MEDIUM, "px")
        },
        track: {
          height: 1,
          background: '#ccc'
        },
        trackHolder: {
          padding: "".concat(theme.Spacing.MEDIUM, "px 0"),
          cursor: _this.props.disabled ? 'not-allowed' : 'pointer'
        },
        toggle: {
          width: theme.Spacing.LARGE,
          height: theme.Spacing.LARGE,
          borderRadius: '100%',
          background: theme.Colors.WHITE,
          boxShadow: theme.ShadowLow,
          position: 'absolute',
          top: '50%',
          left: _this.state.leftPixels,
          transform: 'translate(20%, -50%)',
          WebkitTransform: 'translate(20%, -50%)',
          cursor: cursorStyle,
          zIndex: 2
        },
        selected: {
          position: 'absolute',
          left: theme.Spacing.SMALL,
          width: _this.state.leftPixels,
          background: theme.Colors.PRIMARY,
          height: 3,
          top: '50%',
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          zIndex: 1
        }
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(SimpleSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = ReactDOM.findDOMNode(this.rangeSelectorRef);
      var width = component.clientWidth;
      var leftPixels = this.props.percent * width;
      this.setState({
        width: width,
        leftPixels: leftPixels
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (this.props.percent !== newProps.percent) {
        var leftPixels = newProps.percent * this.state.width;
        this.setState({
          leftPixels: leftPixels
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var disabled = this.props.disabled;
      return React.createElement("div", {
        className: "mx-simple-slider",
        ref: this.props.elementRef,
        style: styles.component
      }, React.createElement("div", {
        onMouseLeave: disabled ? null : this._handleDragEnd,
        onMouseMove: disabled ? null : this._handleDragging,
        onMouseUp: disabled ? null : this._handleDragEnd,
        onTouchEnd: disabled ? null : this._handleDragEnd,
        onTouchMove: disabled ? null : this._handleDragging,
        ref: function ref(_ref) {
          _this2.rangeSelectorRef = _ref;
        },
        style: styles.range
      }, React.createElement("div", {
        onMouseDown: disabled ? null : this._handleMouseEvents,
        style: styles.trackHolder
      }, React.createElement("div", {
        style: styles.track
      }), React.createElement("div", {
        style: styles.selected
      })), React.createElement("div", {
        onMouseDown: disabled ? null : this._handleDragStart,
        onTouchStart: disabled ? null : this._handleDragStart,
        style: styles.toggle
      })));
    }
  }]);

  return SimpleSlider;
}(React.Component);

_defineProperty(SimpleSlider, "propTypes", {
  disabled: PropTypes.bool,
  elementRef: PropTypes.func,
  onPercentChange: PropTypes.func.isRequired,
  percent: PropTypes.number.isRequired,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(SimpleSlider, "defaultProps", {
  disabled: false
});

module.exports = (0, _Theme.withTheme)(Radium(SimpleSlider));