'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  propTypes: {
    calendarStyle: React.PropTypes.object,
    closeOnDateSelect: React.PropTypes.bool,
    dateFormat: React.PropTypes.string,
    dateIcon: React.PropTypes.string,
    datePlaceholder: React.PropTypes.string,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    selectedDate: React.PropTypes.number,
    showIcons: React.PropTypes.bool,
    styles: React.PropTypes.object,
    timeFormat: React.PropTypes.string,
    timeIcon: React.PropTypes.string,
    timePlaceholder: React.PropTypes.string,
    timezone: React.PropTypes.string,
    timezoneFormat: React.PropTypes.oneOf(['abbr', 'name']),
    timezoneNames: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
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
  },
  getInitialState: function getInitialState() {
    return {
      showCalendar: false,
      editTime: false
    };
  },
  _handleDateBlur: function _handleDateBlur() {
    this.setState({
      showCalendar: false
    });
  },
  _handleDateFocus: function _handleDateFocus() {
    this.setState({
      showCalendar: true
    });
  },
  _handleDateSelect: function _handleDateSelect(date, e) {
    e.stopPropagation();

    if (this.props.closeOnDateSelect) {
      this.dateSelect.blur();

      this.setState({
        showCalendar: false
      });
    }

    var hour = this.props.selectedDate ? moment.unix(this.props.selectedDate).hour() : 0;
    var minutes = this.props.selectedDate ? moment.unix(this.props.selectedDate).minute() : 0;

    this.props.onDateSelect(moment.unix(date).hour(hour).minute(minutes).seconds(0).unix());
  },
  _handleTimeBlur: function _handleTimeBlur() {
    this.setState({
      editTime: false
    });
  },
  _handleTimeFocus: function _handleTimeFocus() {
    this.setState({
      editTime: true
    });
  },
  _handleTimeSelect: function _handleTimeSelect(e) {
    var selectedDate = this.props.selectedDate ? moment.unix(this.props.selectedDate) : moment();
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
      this.setState({
        editTime: false
      });
      var date = selectedDate.hour(hour).minute(minute).second(0).unix();

      this.props.onDateSelect(date);
    }
  },
  _getTimezone: function _getTimezone(date) {
    var timezoneAbbr = date ? moment.unix(date).tz(this.props.timezone).format('z') : moment().tz(this.props.timezone).format('z');

    if (this.props.timezoneFormat === 'name') {
      return this.props.timezoneNames[timezoneAbbr] || timezoneAbbr;
    } else if (this.props.timezoneFormat === 'abbr') {
      return timezoneAbbr;
    } else {
      return null;
    }
  },
  render: function render() {
    var _this = this;

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
              ref: function ref(_ref) {
                return _this.dateSelect = _ref;
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
  },
  spans: function spans() {
    return {
      date: {
        large: this.props.children ? 5 : 6,
        medium: this.props.children ? 5 : 6,
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
  },
  styles: function styles() {
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
        borderColor: this.props.primaryColor
      },
      selectedIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedText: {
        color: this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
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
        color: this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
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
        display: this.state.showCalendar ? 'block' : 'none'
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
      }, this.props.calendarStyle)
    }, this.props.styles);
  }
});

module.exports = DatePicker;