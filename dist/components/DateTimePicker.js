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

var PropTypes = require('prop-types');

var React = require('react');

var moment = require('moment-timezone/builds/moment-timezone-with-data.min');

var Column = require('./grid/Column');

var Container = require('./grid/Container');

var Icon = require('./Icon');

var Row = require('./grid/Row');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var MAX_HOUR = 23;
var MAX_MINUTE = 59;

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
      showCalendar: false,
      editTime: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_toggleCalendar", function () {
      _this.setState({
        showCalendar: !_this.state.showCalendar
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDateSelect", function (date, e) {
      e.stopPropagation();

      if (_this.props.closeOnDateSelect) {
        _this.elementRef.blur();

        _this.setState({
          showCalendar: false
        });
      }

      var hour = _this.props.selectedDate ? moment.unix(_this.props.selectedDate).hour() : 0;
      var minutes = _this.props.selectedDate ? moment.unix(_this.props.selectedDate).minute() : 0;

      _this.props.onDateSelect(moment.unix(date).hour(hour).minute(minutes).seconds(0).unix());
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleTimeBlur", function () {
      _this.setState({
        editTime: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleTimeFocus", function () {
      _this.setState({
        showCalendar: false,
        editTime: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleTimeSelect", function (e) {
      var selectedDate = _this.props.selectedDate ? moment.unix(_this.props.selectedDate) : moment();
      var value = e.target.value.toLowerCase().replace('.', '');
      var time = value.split(':');
      var am = value.indexOf('am') >= 0;
      var pm = value.indexOf('pm') >= 0;
      var minute = Number(time[1].substring(0, 2));
      var hour = Number(time[0]);
      hour = am && hour === 12 ? 0 : hour;
      hour = pm && hour !== 12 ? hour + 12 : hour;

      if (hour > MAX_HOUR || minute > MAX_MINUTE) {
        e.value.target = '';
      } else {
        _this.setState({
          editTime: false
        });

        var date = selectedDate.hour(hour).minute(minute).second(0).unix();

        _this.props.onDateSelect(date);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getTimezone", function (date) {
      var timezoneAbbr = date ? moment.unix(date).tz(_this.props.timezone).format('z') : moment().tz(_this.props.timezone).format('z');

      if (_this.props.timezoneFormat === 'name') {
        return _this.props.timezoneNames[timezoneAbbr] || timezoneAbbr;
      } else if (_this.props.timezoneFormat === 'abbr') {
        return timezoneAbbr;
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "spans", function () {
      return {
        date: {
          large: _this.props.children ? 5 : 6,
          medium: _this.props.children ? 5 : 6,
          small: 12
        },
        children: {
          large: 1,
          medium: 1,
          small: 12
        },
        time: {
          large: 6,
          medium: 6,
          small: 12
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return _extends({}, {
        children: {
          textAlign: 'center'
        },
        // Select styles
        selectWrapper: {
          alignItems: 'center',
          backgroundColor: theme.Colors.WHITE,
          borderColor: theme.Colors.GRAY_300,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxShadow: 'none',
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_700,
          cursor: 'pointer',
          display: 'flex',
          flex: '1 0 0%',
          fontSize: theme.FontSizes.MEDIUM,
          outline: 'none',
          padding: '10px 15px',
          position: 'relative'
        },
        activeSelectWrapper: {
          borderColor: theme.Colors.PRIMARY
        },
        selectedIcon: {
          fill: theme.Colors.PRIMARY,
          marginRight: 5
        },
        selectedText: {
          color: _this.props.selectedDate ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500,
          flex: 1
        },
        selectedDateCaret: {
          fill: _this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_500
        },
        // Time Styles
        timeInput: {
          border: 'none',
          boxShadow: 'none',
          flex: 1,
          fontFamily: theme.Fonts.REGULAR,
          fontSize: theme.FontSizes.MEDIUM,
          outline: 'none'
        },
        timeDisplay: {
          color: _this.props.selectedDate ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500,
          flex: 1,
          lineHeight: '1.55em'
        },
        timezone: {
          color: theme.Colors.GRAY_500,
          paddingLeft: 10,
          textAlign: 'right'
        },
        //Calendar Styles
        calendarWrapper: {
          display: _this.state.showCalendar ? 'block' : 'none'
        },
        calendar: _extends({}, {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          padding: 20,
          position: 'absolute',
          right: 0,
          top: 50,
          width: 287,
          zIndex: 10
        }, _this.props.calendarStyle)
      }, _this.props.styles);
    });

    return _this;
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var spans = this.spans();
      return React.createElement(Container, {
        className: "mx-date-time-picker",
        fluid: true
      }, React.createElement(Row, null, React.createElement(Column, {
        span: spans.date
      }, React.createElement("div", {
        onClick: this._toggleCalendar,
        ref: function ref(_ref) {
          return _this2.elementRef = _ref;
        },
        style: _extends({}, styles.selectWrapper, this.state.showCalendar ? styles.activeSelectWrapper : null),
        tabIndex: 0
      }, this.props.showIcons ? React.createElement(Icon, {
        size: 20,
        style: styles.selectedIcon,
        type: this.props.dateIcon
      }) : null, React.createElement("div", {
        style: styles.selectedText
      }, this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.dateFormat) : this.props.datePlaceholder), React.createElement(Icon, {
        size: 20,
        style: styles.selectedDateCaret,
        type: this.state.showCalendar ? 'caret-up' : 'caret-down'
      })), React.createElement("div", {
        style: styles.calendarWrapper
      }, React.createElement(_Calendar.default, _extends({}, this.props, {
        onDateSelect: this._handleDateSelect,
        style: styles.calendar,
        theme: theme
      })))), this.props.children ? React.createElement(Column, {
        span: spans.children
      }, React.createElement("div", {
        style: styles.children
      }, this.props.children)) : null, React.createElement(Column, {
        span: spans.time
      }, React.createElement("div", {
        onBlur: this._handleTimeBlur,
        onFocus: this._handleTimeFocus,
        style: _extends({}, styles.selectWrapper, this.state.editTime ? styles.activeSelectWrapper : null),
        tabIndex: 0
      }, this.props.showIcons ? React.createElement(Icon, {
        size: 20,
        style: styles.selectedIcon,
        type: this.props.timeIcon
      }) : null, this.state.editTime ? React.createElement("input", {
        autoFocus: true,
        defaultValue: this.state.editTime ? moment.unix(this.props.selectedDate).format('HH:mm') : null,
        name: "time",
        onBlur: this._handleTimeSelect,
        style: styles.timeInput,
        type: "time"
      }) : React.createElement("div", {
        className: "mx-date-time-picker-time",
        style: styles.timeDisplay
      }, this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.timeFormat) : this.props.timePlaceholder), this.props.timezoneFormat ? React.createElement("div", {
        style: styles.timezone
      }, this._getTimezone(this.props.selectedDate)) : null))));
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "propTypes", {
  calendarStyle: PropTypes.object,
  closeOnDateSelect: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateIcon: PropTypes.string,
  datePlaceholder: PropTypes.string,
  elementRef: PropTypes.func,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  selectedDate: PropTypes.number,
  showIcons: PropTypes.bool,
  styles: PropTypes.object,
  theme: themeShape,
  timeFormat: PropTypes.string,
  timeIcon: PropTypes.string,
  timePlaceholder: PropTypes.string,
  timezone: PropTypes.string,
  timezoneFormat: PropTypes.oneOf(['abbr', 'name']),
  timezoneNames: PropTypes.object
});

_defineProperty(DatePicker, "defaultProps", {
  closeOnDateSelect: true,
  dateFormat: 'MMM D, YYYY',
  dateIcon: 'calendar',
  datePlaceholder: 'Select a Date',
  locale: 'en',
  onDateSelect: function onDateSelect() {},
  showIcons: true,
  timeFormat: 'LT',
  timeIcon: 'clock',
  timePlaceholder: 'Select a Time',
  timezone: moment.tz.guess(),
  timezoneNames: {
    EST: 'Eastern Standard Time',
    EDT: 'Eastern Daylight Time',
    CST: 'Central Standard Time',
    CDT: 'Central Daylight Time',
    MST: 'Mountain Standard Time',
    MDT: 'Mountain Daylight Time',
    PST: 'Pacific Standard Time',
    PDT: 'Pacific Daylight Time'
  }
});

module.exports = (0, _Theme.withTheme)(DatePicker);