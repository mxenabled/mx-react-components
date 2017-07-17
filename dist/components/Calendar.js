'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var moment = require('moment');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentDate: _this.props.selectedDate || _this.props.minimumDate || moment().unix()
    }, _this._handleDateSelect = function (date, e) {
      _this.props.onDateSelect(date, e);
    }, _this._handlePreviousClick = function () {
      var currentDate = moment.unix(_this.state.currentDate).startOf('month').subtract(1, 'm').unix();

      _this.setState({
        currentDate: currentDate
      });
    }, _this._handleNextClick = function () {
      var currentDate = moment.unix(_this.state.currentDate).endOf('month').add(1, 'd').unix();

      _this.setState({
        currentDate: currentDate
      });
    }, _this._getWeeks = function () {
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
    }, _this._renderMonthTable = function () {
      var styles = _this.styles();
      var weeks = _this._getWeeks();

      return weeks.map(function (week) {
        return React.createElement(
          'div',
          { style: styles.calendarWeek },
          week.map(function (day) {
            var isCurrentMonth = day.isSame(moment.unix(_this.state.currentDate), 'month');
            var isSelectedDay = day.isSame(moment.unix(_this.props.selectedDate), 'day');
            var isToday = day.isSame(moment(), 'day');
            var disabledDay = _this.props.minimumDate ? day.isBefore(moment.unix(_this.props.minimumDate), 'day') : null;

            return React.createElement(
              'div',
              {
                key: day,
                onClick: disabledDay ? null : _this._handleDateSelect.bind(null, day.unix()),
                style: _extends({}, styles.calendarDay, isCurrentMonth && styles.currentMonth, disabledDay && styles.calendarDayDisabled, isToday && styles.today, isSelectedDay && styles.selectedDay)
              },
              day.date()
            );
          })
        );
      });
    }, _this.styles = function () {
      return {
        component: _extends({
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          boxSizing: 'border-box',
          marginTop: 10,
          padding: 20
        }, _this.props.style),

        //Calendar Header
        calendarHeader: {
          alignItems: 'center',
          color: StyleConstants.Colors.CHARCOAL,
          display: 'flex',
          fontSize: StyleConstants.FontSizes.LARGE,
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
          color: StyleConstants.Colors.ASH,
          display: 'flex',
          flex: '1 1 100%',
          fontFamily: StyleConstants.Fonts.SEMIBOLD,
          fontSize: StyleConstants.FontSizes.SMALL,
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
          color: StyleConstants.Colors.FOG,
          cursor: 'pointer',
          display: 'flex',
          height: 30,
          justifyContent: 'center',
          marginBottom: 2,
          width: 35,

          ':hover': {
            border: '1px solid ' + _this.props.primaryColor
          }
        },
        calendarDayDisabled: {
          color: StyleConstants.Colors.FOG,

          ':hover': {
            cursor: 'default',
            border: 'none'
          }
        },

        today: {
          backgroundColor: StyleConstants.Colors.FOG,
          color: StyleConstants.Colors.WHITE
        },
        currentMonth: {
          color: StyleConstants.Colors.CHARCOAL
        },
        selectedDay: {
          backgroundColor: _this.props.primaryColor,
          color: StyleConstants.Colors.WHITE
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
        this.setState({
          currentDate: newProps.selectedDate
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();

      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          { style: styles.calendarHeader },
          React.createElement(Icon, {
            elementProps: {
              onClick: this._handlePreviousClick
            },
            size: 20,
            style: styles.calendayHeaderNav,
            type: 'caret-left'
          }),
          React.createElement(
            'div',
            null,
            moment(this.state.currentDate, 'X').format('MMMM YYYY')
          ),
          React.createElement(Icon, {
            elementProps: {
              onClick: this._handleNextClick
            },
            size: 20,
            style: styles.calendayHeaderNav,
            type: 'caret-right'
          })
        ),
        React.createElement(
          'div',
          { style: styles.calendarWeekHeader },
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (day, i) {
            return React.createElement(
              'div',
              { key: i, style: styles.calendarWeekDay },
              day
            );
          })
        ),
        this._renderMonthTable()
      );
    }
  }]);

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedDate: PropTypes.number,
  style: PropTypes.object
};
Calendar.defaultProps = {
  locale: 'en',
  onDateSelect: function onDateSelect() {},

  primaryColor: StyleConstants.Colors.PRIMARY
};


module.exports = Radium(Calendar);