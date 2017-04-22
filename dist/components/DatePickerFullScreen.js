'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');
var moment = require('moment');

var Icon = require('./Icon');

var StyleConstants = require('../constants/Style');

var DatePickerFullScreen = React.createClass({
  displayName: 'DatePickerFullScreen',

  propTypes: {
    closeIcon: React.PropTypes.string,
    closeOnDateSelect: React.PropTypes.bool,
    defaultDate: React.PropTypes.number,
    format: React.PropTypes.string,
    inputStyle: React.PropTypes.object,
    isFixed: React.PropTypes.bool,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    placeholderTextStyle: React.PropTypes.object,
    selectedDateWrapperStyle: React.PropTypes.object,
    showDayBorders: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    useInputForSelectedDate: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeIcon: 'close',
      closeOnDateSelect: false,
      format: 'MMM D, YYYY',
      isFixed: false,
      locale: 'en',
      onDateSelect: function onDateSelect() {},

      showDayBorders: false,
      title: 'Select A Date',
      useInputForSelectedDate: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentDate: null,
      inputValue: this._getInputValueByDate(this.props.defaultDate),
      isValid: true,
      selectedDate: this.props.defaultDate,
      showCalendar: false
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    window.onkeyup = function (e) {
      if (e.keyCode === 27) {
        _this._handleCloseClick();
      }
    };
  },
  _getInputValueByDate: function _getInputValueByDate(date) {
    var inputValue = null;

    if (date) {
      var newDate = moment.unix(date);

      if (newDate.isValid()) {
        inputValue = newDate.format(this.props.format);
      } else {
        inputValue = date;
      }
    }

    return inputValue;
  },
  _getSelectedDate: function _getSelectedDate() {
    var selectedDate = this.state.selectedDate;

    return selectedDate && moment.unix(selectedDate).isValid() ? this.state.selectedDate : moment().unix();
  },
  _handleCloseClick: function _handleCloseClick() {
    this.setState({
      showCalendar: false
    });
  },
  _handleDateSelect: function _handleDateSelect(date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.setState({
      inputValue: moment.unix(date).format(this.props.format),
      isValid: true,
      selectedDate: date
    });

    this.props.onDateSelect(date);
  },
  _handleInputBlur: function _handleInputBlur(evt) {
    if (evt.target.value.length === 0) {
      this.props.onDateSelect(null);

      this.setState({
        inputValue: null,
        selectedDate: null
      });
    } else {
      this.setState({
        inputValue: moment.unix(this.state.selectedDate).format(this.props.format)
      });
    }
  },
  _handleInputChange: function _handleInputChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  },
  _handlePreviousClick: function _handlePreviousClick() {
    var selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    var currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), this.props.format);

    this.setState({
      currentDate: currentDate
    });
  },
  _handleNextClick: function _handleNextClick() {
    var selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    var currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.endOf('month').add(1, 'd'), this.props.format);

    this.setState({
      currentDate: currentDate
    });
  },
  _handleScrimClick: function _handleScrimClick() {
    this.setState({
      showCalendar: false
    });
  },
  _toggleCalendar: function _toggleCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  },
  _renderMonthTable: function _renderMonthTable(currentDate, selectedDate) {
    var days = [];
    var startDate = moment(currentDate, this.props.format).startOf('month').startOf('week');
    var endDate = moment(currentDate, this.props.format).endOf('month').endOf('week');
    var minimumDate = this.props.minimumDate ? moment.unix(this.props.minimumDate) : null;

    while (startDate.isBefore(endDate)) {
      var isCurrentMonth = startDate.month() === currentDate.month();
      var isCurrentDay = startDate.format(this.props.format) === selectedDate.format(this.props.format);
      var noSelectDay = startDate.isBefore(minimumDate);
      var day = React.createElement(
        'div',
        {
          key: startDate.month() + '-' + startDate.date(),
          onClick: !noSelectDay ? this._handleDateSelect.bind(null, startDate.unix()) : null,
          style: [styles.calendarDay, !noSelectDay && isCurrentMonth && styles.currentMonth]
        },
        React.createElement(
          'div',
          {
            key: startDate.format('DDDD'),
            style: [styles.calendarDayContent, noSelectDay ? styles.calendarDayDisabled : isCurrentDay && styles.currentDay]
          },
          React.createElement(
            'div',
            { style: styles.calendarDayText },
            startDate.date()
          )
        )
      );

      if (this.props.showDayBorders) {
        day.props.style.push([styles.borderRight, styles.borderBottom]);
      }

      days.push(day);
      startDate.add(1, 'd');
    }

    return days;
  },
  _renderSelectedDate: function _renderSelectedDate() {
    if (this.props.useInputForSelectedDate) {
      var hidePlaceholder = this.state.inputValue && this.state.inputValue.length;

      return React.createElement(
        'div',
        null,
        React.createElement('input', {
          key: 'input',
          onBlur: this._handleInputBlur,
          onChange: this._handleInputChange,
          onClick: this._toggleCalendar,
          style: [styles.input, this.props.inputStyle, hidePlaceholder && { backgroundColor: StyleConstants.Colors.WHITE }],
          type: 'text',
          value: this.state.inputValue
        }),
        React.createElement(
          'div',
          { style: [styles.placeholderText, this.props.placeholderTextStyle] },
          this.props.placeholderText || 'Select A Date'
        )
      );
    } else {
      return React.createElement(
        'div',
        {
          key: 'selectedDate',
          onClick: this._toggleCalendar,
          style: styles.selectedDate
        },
        this.state.inputValue
      );
    }
  },
  _renderTitle: function _renderTitle(styles) {
    if (this.props.title) {
      return React.createElement(
        'div',
        { key: 'title', style: styles.title },
        this.props.title
      );
    } else {
      return null;
    }
  },
  render: function render() {
    var selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    var currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;
    var leftNavIconStyle = _extends({}, styles.navIcon, styles.navLeft);
    var rightNavIconStyle = _extends({}, styles.navIcon, styles.navRight);

    if (this.props.showDayBorders) {
      leftNavIconStyle = _extends(leftNavIconStyle, styles.borderRight);
      rightNavIconStyle = _extends(rightNavIconStyle, styles.borderLeft);
    }

    return React.createElement(
      'div',
      {
        className: 'mx-date-picker-full-screen',
        style: [styles.component, styles.clearFix, this.props.style],
        tabIndex: '0'
      },
      React.createElement(
        'div',
        {
          className: 'mx-date-picker-full-screen-selected-date',
          key: 'selectedDateWrapper',
          style: [styles.selectedDateWrapper, this.props.selectedDateWrapperStyle]
        },
        this._renderSelectedDate()
      ),
      React.createElement(
        'div',
        {
          className: 'mx-date-picker-full-screen-calendar-scrim',
          key: 'calendarModal',
          style: [styles.calendarModal, this.state.showCalendar && styles.calendarShow, this.props.isFixed && { position: 'fixed' }]
        },
        React.createElement(
          'div',
          { onClick: this._handleCloseClick, style: styles.close },
          React.createElement(Icon, {
            size: 20,
            style: styles.closeIcon,
            type: this.props.closeIcon
          }),
          React.createElement(
            'div',
            { style: styles.closeText },
            'ESC'
          )
        ),
        React.createElement(
          'div',
          { className: 'mx-date-picker-full-screen-calendar-wrapper', style: styles.calendarWrapper },
          this._renderTitle(styles),
          React.createElement(
            'div',
            { className: 'mx-date-picker-full-screen-calendar-header', key: 'calendarHeader', style: [styles.calendarHeader, { borderBottomStyle: this.props.showDayBorders ? 'solid' : 'none' }, styles.clearFix] },
            React.createElement(Icon, {
              elementProps: {
                onClick: this._handlePreviousClick
              },
              size: 32,
              style: leftNavIconStyle,
              type: 'caret-left'
            }),
            currentDate.format('MMMM YYYY'),
            React.createElement(Icon, {
              elementProps: {
                onClick: this._handleNextClick
              },
              size: 32,
              style: rightNavIconStyle,
              type: 'caret-right'
            })
          ),
          React.createElement(
            'div',
            { style: styles.calendarContainer },
            this._renderMonthTable(currentDate, selectedDate)
          ),
          React.createElement('div', { style: styles.clearFix })
        )
      )
    );
  }
});

var styles = {
  calendarDay: {
    color: StyleConstants.Colors.ASH,
    float: 'left',
    paddingBottom: '11%',
    position: 'relative',
    width: '13.5%'
  },
  borderBottom: {
    borderBottom: StyleConstants.Colors.FOG,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  borderRight: {
    borderRight: StyleConstants.Colors.FOG,
    borderRightStyle: 'solid',
    borderRightWidth: 1
  },
  borderLeft: {
    borderLeft: StyleConstants.Colors.FOG,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1
  },
  calendarContainer: {
    width: '100%',
    padding: '0px 2px 10px 6px'
  },
  calendarDayContent: {
    borderRadius: '50%',
    height: 32,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    width: 32,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.WHITE,
      cursor: 'pointer'
    }
  },
  calendarDayText: {
    borderRadius: '100%',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    fontWeight: 'normal',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)'
  },
  calendarDayDisabled: {
    ':hover': {
      background: 'none',
      color: StyleConstants.Colors.PORCELAIN
    }
  },
  calendarHeader: {
    color: StyleConstants.Colors.CHARCOAL,
    borderBottom: StyleConstants.Colors.FOG,
    borderBottomWidth: 1,
    fontSize: StyleConstants.FontSizes.XLARGE,
    fontWeight: 'normal',
    padding: '5px 0px 7px 0px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'none'
  },
  calendarIcon: {
    color: StyleConstants.Colors.PORCELAIN,
    position: 'absolute',
    right: 12.8,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  calendarShow: {
    display: 'block'
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  clearFix: {
    clear: 'both',
    marginBottom: 15
  },
  component: {
    backgroundColor: '#fff',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    width: '100%',

    ':focus': {
      boxShadow: 'none',
      outline: 'none'
    }
  },
  calendarModal: {
    backgroundColor: '#fff',
    bottom: 0,
    display: 'none',
    left: 0,
    margin: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  calendarWrapper: {
    height: 300,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  selectedDateWrapper: {
    position: 'relative',
    cursor: 'pointer'
  },
  currentDay: {
    backgroundColor: StyleConstants.Colors.PRIMARY,
    color: StyleConstants.Colors.WHITE
  },
  currentMonth: {
    color: StyleConstants.Colors.CHARCOAL
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    outline: 'none',
    paddingBottom: 10,
    paddingLeft: 5,
    position: 'relative',
    top: 5,
    WebkitAppearance: 'none',
    width: '80%',
    zIndex: 2,

    ':focus': {
      border: 'none',
      boxShadow: 'none',
      outline: 'none'
    }
  },
  navIcon: {
    cursor: 'pointer'
  },
  navLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  navRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  placeholderText: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    paddingLeft: 5,
    position: 'absolute',
    top: 10
  },
  selectedDate: {
    color: StyleConstants.Colors.CHARCOAL,
    cursor: 'pointer',
    fontSize: StyleConstants.FontSizes.MEDIUM,
    padding: '5px 0 5px 5px',
    verticalAlign: 'middle',
    width: '100%',

    ':hover': {
      color: StyleConstants.Colors.BLUE
    }
  },
  title: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    padding: '0px 0px 20px 10px'
  }
};

module.exports = Radium(DatePickerFullScreen);