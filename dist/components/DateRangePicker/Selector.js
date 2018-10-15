"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var moment = require('moment');

var keycode = require('keycode');

var PropTypes = require('prop-types');

var Icon = require('../Icon');

var Selector =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Selector, _React$Component);

  function Selector() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Selector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Selector)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function () {
      return {
        container: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        calendarHeaderNav: {
          cursor: 'pointer'
        },
        currentDate: {
          padding: '0px 10px'
        }
      };
    });

    return _this;
  }

  _createClass(Selector, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      return React.createElement("div", {
        className: "mx-selector",
        style: _extends({}, this.props.style, styles.container)
      }, React.createElement("a", {
        "aria-label": "Previous ".concat(this.props.type),
        className: "mx-selector-previous",
        onClick: this.props.handlePreviousClick,
        onKeyUp: function onKeyUp(e) {
          return keycode(e) === 'enter' && _this2.props.handlePreviousClick(e);
        },
        role: "button",
        tabIndex: 0
      }, React.createElement(Icon, {
        size: 20,
        style: styles.calendarHeaderNav,
        type: "caret-left"
      })), React.createElement("div", {
        "aria-label": "Currently in ".concat(this.props.currentDate),
        className: "mx-selector-current-date",
        role: "heading",
        style: styles.currentDate
      }, this.props.currentDate), React.createElement("a", {
        "aria-label": "Next ".concat(this.props.type),
        className: "mx-selector-next",
        onClick: this.props.handleNextClick,
        onKeyUp: function onKeyUp(e) {
          return keycode(e) === 'enter' && _this2.props.handleNextClick(e);
        },
        role: "button",
        tabIndex: 0
      }, React.createElement(Icon, {
        size: 20,
        style: styles.calendarHeaderNav,
        type: "caret-right"
      })));
    }
  }]);

  return Selector;
}(React.Component);

_defineProperty(Selector, "propTypes", {
  currentDate: PropTypes.string,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func,
  setCurrentDate: PropTypes.func,
  type: PropTypes.string
});

var MonthSelector =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(MonthSelector, _React$Component2);

  function MonthSelector() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, MonthSelector);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MonthSelector)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_handlePreviousClick", function () {
      var currentDate = moment.unix(_this3.props.currentDate).startOf('month').subtract(1, 'm').unix();

      _this3.props.setCurrentDate(currentDate);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_handleNextClick", function () {
      var currentDate = moment.unix(_this3.props.currentDate).endOf('month').add(1, 'd').unix();

      _this3.props.setCurrentDate(currentDate);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "styles", function () {
      return {
        monthSelector: {
          width: '60%'
        }
      };
    });

    return _this3;
  }

  _createClass(MonthSelector, [{
    key: "render",
    value: function render() {
      var styles = this.styles();
      return React.createElement(Selector, _extends({}, this.props, {
        currentDate: moment.unix(this.props.currentDate).format('MMMM'),
        handleNextClick: this._handleNextClick,
        handlePreviousClick: this._handlePreviousClick,
        style: styles.monthSelector,
        type: "Month"
      }));
    }
  }]);

  return MonthSelector;
}(React.Component);

_defineProperty(MonthSelector, "propTypes", {
  currentDate: PropTypes.number,
  setCurrentDate: PropTypes.func
});

var YearSelector =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(YearSelector, _React$Component3);

  function YearSelector() {
    var _getPrototypeOf4;

    var _this4;

    _classCallCheck(this, YearSelector);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(YearSelector)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "_handlePreviousClick", function () {
      var currentDate = moment.unix(_this4.props.currentDate).startOf('month').subtract(1, 'y').unix();

      _this4.props.setCurrentDate(currentDate);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "_handleNextClick", function () {
      var currentDate = moment.unix(_this4.props.currentDate).endOf('month').add(1, 'y').unix();

      _this4.props.setCurrentDate(currentDate);
    });

    return _this4;
  }

  _createClass(YearSelector, [{
    key: "render",
    value: function render() {
      return React.createElement(Selector, _extends({}, this.props, {
        currentDate: moment.unix(this.props.currentDate).format('YYYY'),
        handleNextClick: this._handleNextClick,
        handlePreviousClick: this._handlePreviousClick,
        type: "Year"
      }));
    }
  }]);

  return YearSelector;
}(React.Component);

_defineProperty(YearSelector, "propTypes", {
  currentDate: PropTypes.number,
  setCurrentDate: PropTypes.func
});

module.exports = {
  MonthSelector: MonthSelector,
  YearSelector: YearSelector
};