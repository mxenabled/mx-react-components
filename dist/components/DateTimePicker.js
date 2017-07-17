'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var moment = require('moment-timezone/builds/moment-timezone-with-data.min');

var Calendar = require('./Calendar');
var Column = require('./grid/Column');
var Container = require('./grid/Container');
var Icon = require('./Icon');
var Row = require('./grid/Row');

var StyleConstants = require('../constants/Style');

var MAX_HOUR = 23;
var MAX_MINUTE = 59;

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showCalendar: false,
      editTime: false
    }, _this._handleDateBlur = function () {
      _this.setState({
        showCalendar: false
      });
    }, _this._handleDateFocus = function () {
      _this.setState({
        showCalendar: true
      });
    }, _this._handleDateSelect = function (date, e) {
      e.stopPropagation();

      if (_this.props.closeOnDateSelect) {
        _this.dateSelect.blur();

        _this.setState({
          showCalendar: false
        });
      }

      var hour = _this.props.selectedDate ? moment.unix(_this.props.selectedDate).hour() : 0;
      var minutes = _this.props.selectedDate ? moment.unix(_this.props.selectedDate).minute() : 0;

      _this.props.onDateSelect(moment.unix(date).hour(hour).minute(minutes).seconds(0).unix());
    }, _this._handleTimeBlur = function () {
      _this.setState({
        editTime: false
      });
    }, _this._handleTimeFocus = function () {
      _this.setState({
        editTime: true
      });
    }, _this._handleTimeSelect = function (e) {
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
    }, _this._getTimezone = function (date) {
      var timezoneAbbr = date ? moment.unix(date).tz(_this.props.timezone).format('z') : moment().tz(_this.props.timezone).format('z');

      if (_this.props.timezoneFormat === 'name') {
        return _this.props.timezoneNames[timezoneAbbr] || timezoneAbbr;
      } else if (_this.props.timezoneFormat === 'abbr') {
        return timezoneAbbr;
      } else {
        return null;
      }
    }, _this.spans = function () {
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
    }, _this.styles = function () {
      return _extends({}, {
        children: {
          textAlign: 'center'
        },

        // Select styles
        selectWrapper: {
          alignItems: 'center',
          backgroundColor: StyleConstants.Colors.WHITE,
          borderColor: StyleConstants.Colors.FOG,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxShadow: 'none',
          boxSizing: 'border-box',
          color: StyleConstants.Colors.CHARCOAL,
          cursor: 'pointer',
          display: 'flex',
          flex: '1 0 0%',
          fontSize: StyleConstants.FontSizes.MEDIUM,
          outline: 'none',
          padding: '10px 15px',
          position: 'relative'
        },
        activeSelectWrapper: {
          borderColor: _this.props.primaryColor
        },
        selectedIcon: {
          fill: _this.props.primaryColor,
          marginRight: 5
        },
        selectedText: {
          color: _this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
          flex: 1
        },
        selectedDateCaret: {
          fill: _this.state.showCalendar ? _this.props.primaryColor : StyleConstants.Colors.ASH
        },

        // Time Styles
        timeInput: {
          border: 'none',
          boxShadow: 'none',
          flex: 1,
          fontFamily: StyleConstants.Fonts.REGULAR,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          outline: 'none'
        },
        timeDisplay: {
          color: _this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
          flex: 1,
          lineHeight: '1.55em'
        },
        timezone: {
          color: StyleConstants.Colors.ASH,
          paddingLeft: 10,
          textAlign: 'right'
        },

        //Calendar Styles
        calendarWrapper: {
          display: _this.state.showCalendar ? 'block' : 'none'
        },
        calendar: _extends({}, {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          boxShadow: StyleConstants.ShadowHigh,
          boxSizing: 'border-box',
          padding: 20,
          position: 'absolute',
          right: 0,
          top: 50,
          width: 287,
          zIndex: 10
        }, _this.props.calendarStyle)
      }, _this.props.styles);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var styles = this.styles();
      var spans = this.spans();

      return React.createElement(
        Container,
        { fluid: true },
        React.createElement(
          Row,
          null,
          React.createElement(
            Column,
            { span: spans.date },
            React.createElement(
              'div',
              {
                onBlur: this._handleDateBlur,
                onClick: this._handleDateClick,
                onFocus: this._handleDateFocus,
                ref: function ref(_ref2) {
                  return _this2.dateSelect = _ref2;
                },
                style: _extends({}, styles.selectWrapper, this.state.showCalendar ? styles.activeSelectWrapper : null),
                tabIndex: 0
              },
              this.props.showIcons ? React.createElement(Icon, {
                size: 20,
                style: styles.selectedIcon,
                type: this.props.dateIcon
              }) : null,
              React.createElement(
                'div',
                { style: styles.selectedText },
                this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.dateFormat) : this.props.datePlaceholder
              ),
              React.createElement(Icon, {
                size: 20,
                style: styles.selectedDateCaret,
                type: this.state.showCalendar ? 'caret-up' : 'caret-down'
              }),
              React.createElement(
                'div',
                { style: styles.calendarWrapper },
                React.createElement(Calendar, _extends({}, this.props, {
                  onDateSelect: this._handleDateSelect,
                  style: styles.calendar
                }))
              )
            )
          ),
          this.props.children ? React.createElement(
            Column,
            { span: spans.children },
            React.createElement(
              'div',
              { style: styles.children },
              this.props.children
            )
          ) : null,
          React.createElement(
            Column,
            { span: spans.time },
            React.createElement(
              'div',
              {
                onBlur: this._handleTimeBlur,
                onFocus: this._handleTimeFocus,
                style: _extends({}, styles.selectWrapper, this.state.editTime ? styles.activeSelectWrapper : null),
                tabIndex: 0
              },
              this.props.showIcons ? React.createElement(Icon, {
                size: 20,
                style: styles.selectedIcon,
                type: this.props.timeIcon
              }) : null,
              this.state.editTime ? React.createElement('input', {
                autoFocus: true,
                defaultValue: this.state.editTime ? moment.unix(this.props.selectedDate).format('HH:mm') : null,
                name: 'time',
                onBlur: this._handleTimeSelect,
                style: styles.timeInput,
                type: 'time'
              }) : React.createElement(
                'div',
                { style: styles.timeDisplay },
                this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.timeFormat) : this.props.timePlaceholder
              ),
              this.props.timezoneFormat ? React.createElement(
                'div',
                { style: styles.timezone },
                this._getTimezone(this.props.selectedDate)
              ) : null
            )
          )
        )
      );
    }
  }]);

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  calendarStyle: PropTypes.object,
  closeOnDateSelect: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateIcon: PropTypes.string,
  datePlaceholder: PropTypes.string,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedDate: PropTypes.number,
  showIcons: PropTypes.bool,
  styles: PropTypes.object,
  timeFormat: PropTypes.string,
  timeIcon: PropTypes.string,
  timePlaceholder: PropTypes.string,
  timezone: PropTypes.string,
  timezoneFormat: PropTypes.oneOf(['abbr', 'name']),
  timezoneNames: PropTypes.object
};
DatePicker.defaultProps = {
  closeOnDateSelect: true,
  dateFormat: 'MMM D, YYYY',
  dateIcon: 'calendar',
  datePlaceholder: 'Select a Date',
  locale: 'en',
  onDateSelect: function onDateSelect() {},

  primaryColor: StyleConstants.Colors.PRIMARY,
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
};


module.exports = DatePicker;