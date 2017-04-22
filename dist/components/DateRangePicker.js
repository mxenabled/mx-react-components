'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Radium = require('radium');
var moment = require('moment');

var Icon = require('./Icon');

var Column = require('../components/grid/Column');
var Container = require('../components/grid/Container');
var Row = require('../components/grid/Row');

var StyleConstants = require('../constants/Style');

var DefaultRanges = function DefaultRanges(_ref) {
  var defaultRanges = _ref.defaultRanges,
      handleDefaultRangeSelection = _ref.handleDefaultRangeSelection,
      selectedStartDate = _ref.selectedStartDate,
      selectedEndDate = _ref.selectedEndDate,
      styles = _ref.styles;
  return React.createElement(
    'div',
    { style: styles.rangeOptions },
    React.createElement(
      'div',
      { style: styles.defaultRangesTitle },
      'Select a Range'
    ),
    defaultRanges.map(function (range) {
      return React.createElement(
        'div',
        { key: range.displayValue + range.startDate, style: styles.rangeOption },
        React.createElement(
          'div',
          null,
          React.createElement(Icon, {
            size: 20,
            style: {
              fill: range.startDate === selectedStartDate && range.endDate === selectedEndDate ? props.primaryColor : 'transparent'
            },
            type: 'check-solid'
          })
        ),
        React.createElement(
          'div',
          { onClick: handleDefaultRangeSelection.bind(null, range) },
          range.displayValue
        )
      );
    })
  );
};

DefaultRanges.propTypes = {
  defaultRanges: React.PropTypes.array,
  handleDefaultRangeSelection: React.PropTypes.func,
  primaryColor: React.PropTypes.string,
  selectedEndDate: React.PropTypes.number,
  selectedStartDate: React.PropTypes.number,
  styles: React.PropTypes.shape({
    defaultRangesTitle: React.PropTypes.object,
    rangeOption: React.PropTypes.object,
    rangeOptions: React.PropTypes.object
  })
};

var MonthTable = function MonthTable(_ref2) {
  var activeSelectDate = _ref2.activeSelectDate,
      currentDate = _ref2.currentDate,
      getDateRangePosition = _ref2.getDateRangePosition,
      handleDateHover = _ref2.handleDateHover,
      handleDateSelect = _ref2.handleDateSelect,
      isInActiveRange = _ref2.isInActiveRange,
      minimumDate = _ref2.minimumDate,
      selectedEndDate = _ref2.selectedEndDate,
      selectedStartDate = _ref2.selectedStartDate,
      styles = _ref2.styles;

  var days = [];
  var startDate = moment.unix(currentDate).startOf('month').startOf('week');
  var endDate = moment.unix(currentDate).endOf('month').endOf('week');

  while (moment(startDate).isBefore(endDate)) {
    var disabledDay = minimumDate && startDate.isBefore(moment.unix(minimumDate));
    var isActiveRange = selectedStartDate || selectedEndDate ? isInActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate) : false;
    var whereInRange = getDateRangePosition(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
    var isSelectedDay = startDate.isSame(moment.unix(selectedStartDate), 'day') || startDate.isSame(moment.unix(selectedEndDate), 'day');

    var day = React.createElement(
      'div',
      {
        key: startDate,
        onClick: !disabledDay && handleDateSelect.bind(null, startDate.unix()),
        onMouseEnter: !disabledDay && handleDateHover.bind(null, startDate.unix()),
        style: _extends({}, styles.calendarDay, startDate.isSame(moment.unix(currentDate), 'month') && styles.currentMonth, disabledDay && styles.calendarDayDisabled, startDate.isSame(moment(), 'day') && !isActiveRange && styles.today, isActiveRange && _extends({}, styles.betweenDay, styles['betweenDay' + whereInRange]), isSelectedDay && _extends({}, styles.selectedDay, styles['selected' + whereInRange]))
      },
      startDate.date()
    );

    days.push(day);
    startDate = startDate.add(1, 'd');
  }

  return React.createElement(
    'div',
    { style: styles.calendarTable },
    days
  );
};

MonthTable.propTypes = {
  activeSelectDate: React.PropTypes.number,
  currentDate: React.PropTypes.number,
  getDateRangePosition: React.PropTypes.func,
  handleDateHover: React.PropTypes.func,
  handleDateSelect: React.PropTypes.func,
  isInActiveRange: React.PropTypes.func,
  minimumDate: React.PropTypes.number,
  selectedEndDate: React.PropTypes.number,
  selectedStartDate: React.PropTypes.number,
  styles: React.PropTypes.object
};

var DateRangePicker = React.createClass({
  displayName: 'DateRangePicker',

  propTypes: {
    closeCalendarOnRangeSelect: React.PropTypes.bool,
    defaultRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
      displayValue: React.PropTypes.string,
      endDate: React.PropTypes.number,
      startDate: React.PropTypes.number
    })),
    format: React.PropTypes.string,
    isRelative: React.PropTypes.bool,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    selectedEndDate: React.PropTypes.number,
    selectedStartDate: React.PropTypes.number,
    showDefaultRanges: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeCalendarOnRangeSelect: false,
      defaultRanges: [{
        displayValue: 'Today',
        endDate: moment().endOf('day').unix(),
        startDate: moment().startOf('day').unix()
      }, {
        displayValue: 'This Month',
        endDate: moment().endOf('month').unix(),
        startDate: moment().startOf('month').unix()
      }, {
        displayValue: 'Last Month',
        endDate: moment().subtract(1, 'months').endOf('month').unix(),
        startDate: moment().subtract(1, 'months').startOf('month').unix()
      }, {
        displayValue: 'Last 7 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(6, 'days').startOf('day').unix()
      }, {
        displayValue: 'Last 30 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(29, 'days').startOf('day').unix()
      }, {
        displayValue: 'Last 90 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(89, 'days').startOf('day').unix()
      }],
      format: 'MMM D, YYYY',
      isRelative: true,
      locale: 'en',
      onDateSelect: function onDateSelect() {},

      placeholderText: 'Select A Date Range',
      primaryColor: StyleConstants.Colors.PRIMARY,
      showDefaultRanges: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentDate: this.props.selectedStartDate || moment().unix(),
      showCalendar: false
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate) {
      this.setState({
        currentDate: newProps.selectedStartDate
      });
    }
  },
  _getDateFormat: function _getDateFormat() {
    return this._isLargeOrMediumWindowSize() ? this.props.format : 'MMM D';
  },
  _isLargeOrMediumWindowSize: function _isLargeOrMediumWindowSize() {
    var windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  },
  _endDateIsBeforeStartDate: function _endDateIsBeforeStartDate(startDate, endDate) {
    return moment.unix(endDate).isBefore(moment.unix(startDate));
  },
  _handleDateSelect: function _handleDateSelect(date) {
    var endDate = void 0;
    var startDate = void 0;
    var existingRangeComplete = this.props.selectedStartDate && this.props.selectedEndDate;
    var existingRangeEmpty = !this.props.selectedStartDate && !this.props.selectedEndDate;

    if (existingRangeComplete || existingRangeEmpty) {
      startDate = date;
      endDate = null;
    } else {
      startDate = this.props.selectedStartDate;
      endDate = date;
    }

    var modifiedRangeCompleteButDatesInversed = startDate && endDate && this._endDateIsBeforeStartDate(startDate, endDate);

    if (modifiedRangeCompleteButDatesInversed) {
      this.props.onDateSelect(endDate, startDate);
    } else {
      this.props.onDateSelect(startDate, endDate);
    }

    if (startDate && endDate && this.props.closeCalendarOnRangeSelect) {
      this._handleScrimClick();
    }
  },
  _handleDefaultRangeSelection: function _handleDefaultRangeSelection(range) {
    this.props.onDateSelect(range.startDate, range.endDate);

    if (this.props.closeCalendarOnRangeSelect) {
      this._handleScrimClick();
    }
  },
  _handleDateHover: function _handleDateHover(activeSelectDate) {
    this.setState({
      activeSelectDate: activeSelectDate
    });
  },
  _handlePreviousClick: function _handlePreviousClick() {
    var currentDate = moment.unix(this.state.currentDate).startOf('month').subtract(1, 'm').unix();

    this.setState({
      currentDate: currentDate
    });
  },
  _handleNextClick: function _handleNextClick() {
    var currentDate = moment.unix(this.state.currentDate).endOf('month').add(1, 'd').unix();

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
  _isInActiveRange: function _isInActiveRange(selectedStart, selectedEnd, active, date) {
    var start = selectedStart || active;
    var end = selectedEnd || active;

    var isActive = void 0;

    if (start < end) {
      isActive = date.isSameOrAfter(moment.unix(start)) && date.isSameOrBefore(moment.unix(end));
    } else {
      isActive = date.isSameOrBefore(moment.unix(start)) && date.isSameOrAfter(moment.unix(end));
    }

    return isActive;
  },
  _getDateRangePosition: function _getDateRangePosition(selectedStart, selectedEnd, active, date) {
    var start = selectedStart || active;
    var end = selectedEnd || active;

    var where = void 0;

    if (start < end) {
      if (date.isSame(moment.unix(start))) {
        where = 'Start';
      } else if (date.isSame(moment.unix(end))) {
        where = 'End';
      }
    } else if (start > end) {
      if (date.isSame(moment.unix(start))) {
        where = 'End';
      } else if (date.isSame(moment.unix(end))) {
        where = 'Start';
      }
    }

    return where;
  },
  render: function render() {
    var styles = this.styles();
    var spans = this.spans();

    return React.createElement(
      'div',
      { style: styles.component },
      React.createElement(
        'div',
        { onClick: this._toggleCalendar, style: styles.selectedDateWrapper },
        StyleConstants.getWindowSize() !== 'xsmall' && React.createElement(Icon, {
          size: 20,
          style: styles.selectedDateIcon,
          type: 'calendar'
        }),
        React.createElement(
          'div',
          { style: styles.selectedDateText },
          this.props.selectedStartDate && this.props.selectedEndDate ? React.createElement(
            'div',
            null,
            React.createElement(
              'span',
              null,
              moment.unix(this.props.selectedStartDate).format(this._getDateFormat())
            ),
            React.createElement(
              'span',
              null,
              ' - '
            ),
            React.createElement(
              'span',
              null,
              moment.unix(this.props.selectedEndDate).format(this._getDateFormat())
            )
          ) : this.props.placeholderText
        ),
        StyleConstants.getWindowSize() !== 'xsmall' && React.createElement(Icon, {
          size: 20,
          style: styles.selectedDateCaret,
          type: this.state.showCalendar ? 'caret-up' : 'caret-down'
        })
      ),
      React.createElement(
        Container,
        null,
        React.createElement(
          Row,
          null,
          React.createElement(
            'div',
            { style: styles.optionsWrapper },
            this._isLargeOrMediumWindowSize() && React.createElement(
              Column,
              { span: spans.defaultRanges },
              this.props.showDefaultRanges && React.createElement(DefaultRanges, {
                defaultRanges: this.props.defaultRanges,
                handleDefaultRangeSelection: this._handleDefaultRangeSelection,
                primaryColor: this.props.primaryColor,
                styles: styles
              })
            ),
            React.createElement(
              Column,
              { span: spans.calendar },
              React.createElement(
                'div',
                { style: styles.calendarWrapper },
                React.createElement(
                  'div',
                  { style: styles.calendarHeader },
                  React.createElement(Icon, {
                    elementProps: {
                      onClick: this._handlePreviousClick
                    },
                    size: 20,
                    style: styles.calendarHeaderNav,
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
                    style: styles.calendarHeaderNav,
                    type: 'caret-right'
                  })
                ),
                React.createElement(
                  'div',
                  { style: styles.calendarWeek },
                  ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (day, i) {
                    return React.createElement(
                      'div',
                      { key: day + i, style: styles.calendarWeekDay },
                      day
                    );
                  })
                ),
                React.createElement(MonthTable, {
                  activeSelectDate: this.state.activeSelectDate,
                  currentDate: this.state.currentDate,
                  getDateRangePosition: this._getDateRangePosition,
                  handleDateHover: this._handleDateHover,
                  handleDateSelect: this._handleDateSelect,
                  isInActiveRange: this._isInActiveRange,
                  minimumDate: this.props.minimumDate,
                  selectedEndDate: this.props.selectedEndDate,
                  selectedStartDate: this.props.selectedStartDate,
                  styles: styles
                })
              )
            ),
            !this._isLargeOrMediumWindowSize() && React.createElement(
              Column,
              { span: spans.defaultRanges },
              this.props.showDefaultRanges && React.createElement(DefaultRanges, {
                defaultRanges: this.props.defaultRanges,
                handleDefaultRangeSelection: this._handleDefaultRangeSelection,
                primaryColor: this.props.primaryColor,
                styles: styles
              })
            )
          )
        )
      ),
      this.state.showCalendar ? React.createElement('div', { onClick: this._handleScrimClick, style: styles.scrim }) : null
    );
  },
  spans: function spans() {
    return {
      calendar: {
        large: this.props.showDefaultRanges ? 8 : 12,
        medium: this.props.showDefaultRanges ? 8 : 12,
        small: 12
      },
      defaultRanges: {
        large: this.props.showDefaultRanges ? 4 : 0,
        medium: this.props.showDefaultRanges ? 4 : 0,
        small: this.props.showDefaultRanges ? 12 : 0
      }
    };
  },
  styles: function styles() {
    var isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();

    return {
      component: _extends({
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '10px 15px',
        position: this.props.isRelative && window.innerWidth > 450 ? 'relative' : 'static',
        width: '100%'
      }, this.props.style),

      // Selected Date styles
      selectedDateWrapper: {
        alignItems: 'center',
        display: 'flex',
        height: 20,
        justifyContent: 'space-between'
      },
      selectedDateIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedDateText: {
        color: this.props.selectedStartDate && this.props.selectedEndDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      //Calendar Styles
      optionsWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'flex' : 'none',
        flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
        justifyContent: 'center',
        marginTop: isLargeOrMediumWindowSize ? 10 : 5,
        position: 'absolute',
        left: this.props.isRelative && window.innerWidth > 450 ? 'auto' : 0,
        right: 0,
        width: window.innerWidth < 450 ? window.innerWidth : 'inherit',
        zIndex: 10
      },
      calendarWrapper: {
        boxSizing: 'border-box',
        padding: isLargeOrMediumWindowSize ? 20 : 10,
        margin: 'auto',
        maxWidth: 250,
        width: isLargeOrMediumWindowSize ? 250 : '100%'
      },

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
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      //Calendar week
      calendarWeek: {
        alignItems: 'center',
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        height: 30,
        justifyContent: 'center',
        marginBottom: 2
      },
      calendarWeekDay: {
        textAlign: 'center',
        width: 30
      },

      //Calendar table
      calendarTable: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      calendarDay: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: StyleConstants.Colors.FOG,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 30,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
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

      //Default Ranges
      defaultRangesTitle: {
        display: isLargeOrMediumWindowSize ? 'inline-block' : 'none',
        fontSize: StyleConstants.FontSizes.LARGE,
        marginTop: 10,
        marginBottom: 20
      },
      rangeOptions: {
        borderRight: isLargeOrMediumWindowSize ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        borderTop: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + StyleConstants.Colors.FOG,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        display: isLargeOrMediumWindowSize ? 'inline-block' : 'flex',
        flexDirection: isLargeOrMediumWindowSize ? 'column' : 'row',
        flexWrap: isLargeOrMediumWindowSize ? 'nowrap' : 'wrap',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        paddingLeft: isLargeOrMediumWindowSize ? 10 : 0,
        paddingTop: 10,
        maxWidth: window.innerWidth > 450 ? 250 : 'inherit',
        width: isLargeOrMediumWindowSize ? 150 : '100%'
      },
      rangeOption: {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        marginBottom: isLargeOrMediumWindowSize ? 20 : 10,
        padding: isLargeOrMediumWindowSize ? 0 : 10,
        width: isLargeOrMediumWindowSize ? '100%' : '50%',

        ':hover': {
          color: this.props.primaryColor
        }
      },

      //Selected and Selecting Range
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },
      betweenDay: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.5),
        borderRadius: 0,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
        }
      },

      //Scrim
      scrim: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9
      }
    };
  }
});

module.exports = Radium(DateRangePicker);