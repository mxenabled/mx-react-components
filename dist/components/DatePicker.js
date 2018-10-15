"use strict";

var _Theme = require("./Theme");

var _Calendar = _interopRequireDefault(require("./Calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PropTypes = require('prop-types');

var Radium = require('radium');

var moment = require('moment');

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DatePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      currentDate: _this.props.selectedDate || moment().unix(),
      showCalendar: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDateSelect", function (date) {
      if (_this.props.closeOnDateSelect) {
        _this._handleScrimClick();
      }

      _this.props.onDateSelect(date);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleScrimClick", function () {
      _this.setState({
        showCalendar: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_toggleCalendar", function () {
      _this.setState({
        showCalendar: !_this.state.showCalendar
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: _extends({
          backgroundColor: theme.Colors.WHITE,
          borderColor: _this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_300,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          color: theme.Colors.BLACK,
          display: 'inline-block',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          position: 'relative',
          width: '100%'
        }, _this.props.style),
        calendar: {
          boxShadow: theme.ShadowHigh
        },
        calendarWrapper: {
          boxSizing: 'border-box',
          display: _this.state.showCalendar ? 'block' : 'none',
          position: 'absolute',
          right: 0,
          width: 287,
          zIndex: 10
        },
        // Selected Date styles
        selectedDateWrapper: {
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'relative'
        },
        selectedDateIcon: {
          fill: theme.Colors.PRIMARY,
          marginRight: 5
        },
        selectedDateText: {
          color: _this.props.selectedDate ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500,
          flex: 1
        },
        selectedDateCaret: {
          fill: _this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_500
        },
        scrim: {
          bottom: 0,
          left: 0,
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 9
        }
      };
    });

    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
        this.setState({
          currentDate: newProps.selectedDate
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      return React.createElement("div", {
        className: "mx-date-picker",
        ref: this.props.elementRef,
        style: styles.component
      }, React.createElement("div", {
        onClick: this._toggleCalendar,
        style: styles.selectedDateWrapper
      }, React.createElement(Icon, {
        className: "mx-date-picker-icon-calendar",
        size: 20,
        style: styles.selectedDateIcon,
        type: "calendar"
      }), React.createElement("div", {
        className: "mx-selected-date-text",
        style: styles.selectedDateText
      }, this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.format) : this.props.placeholderText), React.createElement(Icon, {
        className: "mx-date-picker-icon-caret",
        size: 20,
        style: styles.selectedDateCaret,
        type: this.state.showCalendar ? 'caret-up' : 'caret-down'
      })), React.createElement("div", {
        className: "mx-selected-date-calendar",
        style: styles.calendarWrapper
      }, React.createElement(_Calendar.default, {
        onDateSelect: this._handleDateSelect,
        selectedDate: this.state.currentDate,
        style: styles.calendar,
        theme: theme
      })), this.state.showCalendar ? React.createElement("div", {
        className: "mx-date-picker-scrim",
        onClick: this._handleScrimClick,
        style: styles.scrim
      }) : null);
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "propTypes", {
  closeOnDateSelect: PropTypes.bool,
  elementRef: PropTypes.func,
  format: PropTypes.string,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  selectedDate: PropTypes.number,
  style: PropTypes.object,
  theme: themeShape
});

_defineProperty(DatePicker, "defaultProps", {
  closeOnDateSelect: false,
  format: 'MMM D, YYYY',
  locale: 'en',
  onDateSelect: function onDateSelect() {},
  placeholderText: 'Select A Date'
});

module.exports = (0, _Theme.withTheme)(Radium(DatePicker));