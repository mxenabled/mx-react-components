"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getNewDateStateChange = void 0;

var _Theme = require("./Theme");

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var PropTypes = require('prop-types');

var Radium = require('radium');

var moment = require('moment');

var keycode = require('keycode');

var Icon = require('./Icon');

var _require = require('../constants/App'),
    themeShape = _require.themeShape;

var StyleUtils = require('../utils/Style');

var getNewDateStateChange = function getNewDateStateChange(_ref) {
  var code = _ref.code,
      focusedDay = _ref.focusedDay,
      startDate = _ref.startDate,
      endDate = _ref.endDate;
  var day = null;
  var currentDate = null; // Don't mutate existing focusedDay moment object

  var copyOfFocusedDay = moment(focusedDay);

  if (code === 'right') {
    day = copyOfFocusedDay.add(1, 'days').startOf('day');
  } else if (code === 'left') {
    day = copyOfFocusedDay.subtract(1, 'days').startOf('day');
  } else if (code === 'up') {
    day = copyOfFocusedDay.subtract(7, 'days').startOf('day');
  } else if (code === 'down') {
    day = copyOfFocusedDay.add(7, 'days').startOf('day');
  }

  if (day && (day.isBefore(startDate) || day.isAfter(endDate))) {
    currentDate = day.unix();
  }

  return day ? _objectSpread({
    focusedDay: day.unix()
  }, currentDate ? {
    currentDate: currentDate
  } : {}) : null;
};

exports.getNewDateStateChange = getNewDateStateChange;

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Calendar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      currentDate: _this.props.selectedDate || _this.props.minimumDate || moment().unix(),
      focusedDay: _this.props.selectedDate || _this.props.minimumDate || moment().unix()
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleNextClick", function () {
      var currentDate = moment.unix(_this.state.currentDate).endOf('month').add(1, 'd').unix();

      _this.setState({
        currentDate: currentDate,
        focusedDay: currentDate
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handlePreviousClick", function () {
      var currentDate = moment.unix(_this.state.currentDate).startOf('month').subtract(1, 'm').unix();

      _this.setState({
        currentDate: currentDate,
        focusedDay: currentDate
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDayKeyDown", function (e, day) {
      if (keycode(e) === 'up' || keycode(e) === 'down') e.preventDefault();
      if (keycode(e) === 'enter') _this.props.onDateSelect(day.unix(), e);
      var newDateStateChange = getNewDateStateChange({
        code: keycode(e),
        focusedDay: day,
        startDate: moment.unix(_this.state.currentDate).startOf('month').startOf('week'),
        endDate: moment.unix(_this.state.currentDate).endOf('month').endOf('week')
      });
      if (newDateStateChange !== null) _this.setState(newDateStateChange);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getWeeks", function () {
      var startDate = moment.unix(_this.state.currentDate).startOf('month').startOf('week');
      var endDate = moment.unix(_this.state.currentDate).endOf('month').endOf('week');
      var weekLength = 7;
      var weeks = [];
      var days = [];

      while (moment(startDate).isBefore(endDate)) {
        var day = startDate.clone();

        if (days.length < weekLength) {
          days.push(day);
          startDate.add(1, 'd');
        } else {
          days = [];
        }

        if (days.length === weekLength) {
          weeks.push(days);
        }
      }

      return weeks;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderMonthTable", function (styles) {
      var weeks = _this._getWeeks();

      return weeks.map(function (week) {
        return React.createElement("div", {
          key: week,
          style: styles.calendarWeek
        }, week.map(function (day) {
          var isCurrentMonth = day.isSame(moment.unix(_this.state.currentDate), 'month');
          var isSelectedDay = day.isSame(moment.unix(_this.props.selectedDate), 'day');
          var isToday = day.isSame(moment(), 'day');
          var disabledDay = _this.props.minimumDate ? day.isBefore(moment.unix(_this.props.minimumDate), 'day') : null;
          return React.createElement("a", {
            "aria-label": "".concat(day.format('dddd, MMMM Do, YYYY')).concat(isSelectedDay ? ', Currently Selected' : ''),
            className: "calendar-day",
            id: day.isSame(moment.unix(_this.state.focusedDay), 'day') ? 'focused-day' : null,
            key: day.unix(),
            onClick: function onClick(e) {
              if (!disabledDay) _this.props.onDateSelect(day.unix(), e);
            },
            onKeyDown: function onKeyDown(e) {
              return _this._handleDayKeyDown(e, day);
            },
            ref: function ref(dayAnchorTag) {
              return _this[day.unix()] = dayAnchorTag;
            },
            role: "button",
            style: _extends({}, styles.calendarDay, isCurrentMonth && styles.currentMonth, disabledDay && styles.calendarDayDisabled, isToday && styles.today, isSelectedDay && styles.selectedDay),
            tabIndex: day.isSame(moment.unix(_this.state.focusedDay), 'day') ? 0 : null
          }, day.date());
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme) {
      return {
        component: _objectSpread({
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxSizing: 'border-box',
          marginTop: 10,
          padding: 20
        }, _this.props.style),
        //Calendar Header
        calendarHeader: {
          alignItems: 'center',
          color: theme.Colors.GRAY_700,
          display: 'flex',
          fontSize: theme.FontSizes.LARGE,
          height: 30,
          justifyContent: 'space-between',
          marginBottom: 15,
          position: 'relative',
          textAlign: 'center'
        },
        calendayHeaderNav: {
          width: 35,
          cursor: 'pointer'
        },
        //Calendar week
        calendarWeekHeader: {
          alignItems: 'center',
          color: theme.Colors.GRAY_500,
          display: 'flex',
          flex: '1 1 100%',
          fontFamily: theme.Fonts.SEMIBOLD,
          fontSize: theme.FontSizes.SMALL,
          height: 30,
          justifyContent: 'center',
          marginBottom: 2
        },
        calendarWeekDay: {
          textAlign: 'center',
          width: 35
        },
        calendarWeek: {
          display: 'flex',
          flex: '1 1 100%',
          justifyContent: 'center'
        },
        //Calenday table
        calendarDay: {
          alignItems: 'center',
          borderRadius: 3,
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_300,
          cursor: 'pointer',
          display: 'flex',
          height: 30,
          justifyContent: 'center',
          marginBottom: 2,
          width: 35,
          ':hover': {
            border: '1px solid ' + theme.Colors.PRIMARY
          }
        },
        calendarDayDisabled: {
          color: theme.Colors.GRAY_300,
          ':hover': {
            cursor: 'default',
            border: 'none'
          }
        },
        today: {
          backgroundColor: theme.Colors.GRAY_300,
          color: theme.Colors.WHITE
        },
        currentMonth: {
          color: theme.Colors.GRAY_700
        },
        selectedDay: {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE
        }
      };
    });

    return _this;
  }

  _createClass(Calendar, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
        this.setState({
          currentDate: newProps.selectedDate
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.focusedDay !== this.state.focusedDay) {
        var focusedDayRef = this[this.state.focusedDay];
        if (focusedDayRef && focusedDayRef.focus) focusedDayRef.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);
      var styles = this.styles(theme);
      var daysOfWeek = [{
        label: 'Sunday',
        value: 'S'
      }, {
        label: 'Monday',
        value: 'M'
      }, {
        label: 'Tuesday',
        value: 'T'
      }, {
        label: 'Wednesday',
        value: 'W'
      }, {
        label: 'Thursday',
        value: 'T'
      }, {
        label: 'Friday',
        value: 'F'
      }, {
        label: 'Saturday',
        value: 'S'
      }];
      var currentMonthText = moment.unix(this.state.currentDate).format('MMMM YYYY');
      var nextMonthText = moment.unix(this.state.currentDate).add(1, 'month').format('MMMM YYYY');
      var previousMonthText = moment.unix(this.state.currentDate).subtract(1, 'month').format('MMMM YYYY');
      return React.createElement("div", {
        className: "mx-calendar",
        style: styles.component
      }, React.createElement("div", {
        className: "mx-calendar-header",
        style: styles.calendarHeader
      }, React.createElement("a", {
        "aria-label": "Go back a month to ".concat(previousMonthText),
        className: "mx-calendar-previous",
        onClick: this._handlePreviousClick,
        onKeyUp: function onKeyUp(e) {
          return keycode(e) === 'enter' && _this2._handlePreviousClick();
        },
        role: "button",
        tabIndex: 0
      }, React.createElement(Icon, {
        size: 20,
        style: styles.calendayHeaderNav,
        type: "caret-left"
      })), React.createElement("div", {
        "aria-label": "Currently in ".concat(currentMonthText),
        className: "mx-calendar-current-month",
        role: "heading"
      }, currentMonthText), React.createElement("a", {
        "aria-label": "Go forward a month to ".concat(nextMonthText),
        className: "mx-calendar-next",
        onClick: this._handleNextClick,
        onKeyUp: function onKeyUp(e) {
          return keycode(e) === 'enter' && _this2._handleNextClick();
        },
        role: "button",
        tabIndex: 0
      }, React.createElement(Icon, {
        size: 20,
        style: styles.calendayHeaderNav,
        type: "caret-right"
      }))), React.createElement("div", {
        className: "mx-calendar-week-header",
        style: styles.calendarWeekHeader
      }, daysOfWeek.map(function (day) {
        return React.createElement("div", {
          "aria-hidden": true,
          className: "mx-calendar-week-day",
          key: day.label,
          style: styles.calendarWeekDay
        }, day.value);
      })), this._renderMonthTable(styles));
    }
  }]);

  return Calendar;
}(React.Component);

_defineProperty(Calendar, "propTypes", {
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  selectedDate: PropTypes.number,
  style: PropTypes.object,
  theme: themeShape
});

_defineProperty(Calendar, "defaultProps", {
  locale: 'en',
  onDateSelect: function onDateSelect() {}
});

var _default = (0, _Theme.withTheme)(Radium(Calendar));

exports.default = _default;