'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var Radium = require('radium');
var moment = require('moment');

var Icon = require('./Icon');

var Column = require('../components/grid/Column');
var Container = require('../components/grid/Container');
var Row = require('../components/grid/Row');

var StyleConstants = require('../constants/Style');

var DefaultRanges = Radium(function (_ref) {
  var defaultRanges = _ref.defaultRanges,
      handleDefaultRangeSelection = _ref.handleDefaultRangeSelection,
      primaryColor = _ref.primaryColor,
      selectedStartDate = _ref.selectedStartDate,
      selectedEndDate = _ref.selectedEndDate,
      styles = _ref.styles;
  return React.createElement(
    'div',
    { style: styles.rangeOptions },
    React.createElement(
      'div',
      { style: _extends({}, styles.defaultRangesTitle, { color: primaryColor }) },
      'Select a Range'
    ),
    defaultRanges.map(function (range) {
      return React.createElement(
        'div',
        { key: range.displayValue + range.startDate, onClick: handleDefaultRangeSelection.bind(null, range), style: styles.rangeOption },
        React.createElement(
          'div',
          null,
          React.createElement(Icon, {
            size: 20,
            style: _extends({}, styles.rangeOptionIcon, {
              fill: range.startDate === selectedStartDate && range.endDate === selectedEndDate ? primaryColor : 'transparent'
            }),
            type: 'check-solid'
          })
        ),
        React.createElement(
          'div',
          null,
          range.displayValue
        )
      );
    })
  );
});

DefaultRanges.propTypes = {
  defaultRanges: PropTypes.array,
  handleDefaultRangeSelection: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.shape({
    defaultRangesTitle: PropTypes.object,
    rangeOption: PropTypes.object,
    rangeOptions: PropTypes.object
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
  activeSelectDate: PropTypes.number,
  currentDate: PropTypes.number,
  getDateRangePosition: PropTypes.func,
  handleDateHover: PropTypes.func,
  handleDateSelect: PropTypes.func,
  isInActiveRange: PropTypes.func,
  minimumDate: PropTypes.number,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.object
};

var DateRangePicker = function (_React$Component) {
  _inherits(DateRangePicker, _React$Component);

  function DateRangePicker() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, DateRangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      currentDate: _this.props.selectedEndDate || moment().unix(),
      showCalendar: false
    }, _this._getDateFormat = function () {
      return _this._isLargeOrMediumWindowSize() ? _this.props.format : 'MMM D';
    }, _this._isLargeOrMediumWindowSize = function () {
      var windowSize = StyleConstants.getWindowSize();

      return windowSize === 'large' || windowSize === 'medium';
    }, _this._endDateIsBeforeStartDate = function (startDate, endDate) {
      return moment.unix(endDate).isBefore(moment.unix(startDate));
    }, _this._handleDateSelect = function (date) {
      var endDate = void 0;
      var startDate = void 0;
      var existingRangeComplete = _this.props.selectedStartDate && _this.props.selectedEndDate;
      var existingRangeEmpty = !_this.props.selectedStartDate && !_this.props.selectedEndDate;

      if (existingRangeComplete || existingRangeEmpty) {
        startDate = date;
        endDate = null;
      } else {
        startDate = _this.props.selectedStartDate;
        endDate = date;
      }

      var modifiedRangeCompleteButDatesInversed = startDate && endDate && _this._endDateIsBeforeStartDate(startDate, endDate);

      if (modifiedRangeCompleteButDatesInversed) {
        _this.props.onDateSelect(endDate, startDate);
      } else {
        _this.props.onDateSelect(startDate, endDate);
      }

      if (startDate && endDate && _this.props.closeCalendarOnRangeSelect) {
        _this._handleScrimClick();
      }
    }, _this._handleDefaultRangeSelection = function (range) {
      _this.props.onDateSelect(range.startDate, range.endDate, range.displayValue);

      if (_this.props.closeCalendarOnRangeSelect) {
        _this._handleScrimClick();
      }
    }, _this._handleDateHover = function (activeSelectDate) {
      _this.setState({
        activeSelectDate: activeSelectDate
      });
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
    }, _this._handleScrimClick = function () {
      _this.setState({
        showCalendar: false
      });
    }, _this._toggleCalendar = function () {
      _this.setState({
        showCalendar: !_this.state.showCalendar
      });
    }, _this._isInActiveRange = function (selectedStart, selectedEnd, active, date) {
      var start = selectedStart || active;
      var end = selectedEnd || active;

      var isActive = void 0;

      if (start < end) {
        isActive = date.isSameOrAfter(moment.unix(start)) && date.isSameOrBefore(moment.unix(end));
      } else {
        isActive = date.isSameOrBefore(moment.unix(start)) && date.isSameOrAfter(moment.unix(end));
      }

      return isActive;
    }, _this._getDateRangePosition = function (selectedStart, selectedEnd, active, date) {
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
    }, _this.spans = function () {
      return {
        calendar: {
          large: _this.props.showDefaultRanges ? 8 : 12,
          medium: _this.props.showDefaultRanges ? 8 : 12,
          small: 12
        },
        defaultRanges: {
          large: _this.props.showDefaultRanges ? 4 : 0,
          medium: _this.props.showDefaultRanges ? 4 : 0,
          small: _this.props.showDefaultRanges ? 12 : 0
        }
      };
    }, _this.styles = function () {
      var isLargeOrMediumWindowSize = _this._isLargeOrMediumWindowSize();

      return {
        component: _extends({
          backgroundColor: StyleConstants.Colors.WHITE,
          borderColor: _this.state.showCalendar ? _this.props.primaryColor : StyleConstants.Colors.FOG,
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
          position: _this.props.isRelative && window.innerWidth > 450 ? 'relative' : 'static',
          width: '100%'
        }, _this.props.style),

        // Selected Date styles
        selectedDateWrapper: {
          alignItems: 'center',
          display: 'flex',
          height: 20,
          justifyContent: 'space-between'
        },
        selectedDateIcon: {
          fill: _this.props.primaryColor,
          marginRight: 5
        },
        selectedDateText: {
          color: _this.props.selectedStartDate && _this.props.selectedEndDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
        },
        selectedDateCaret: {
          fill: _this.state.showCalendar ? _this.props.primaryColor : StyleConstants.Colors.ASH
        },

        //Calendar Styles
        optionsWrapper: {
          backgroundColor: StyleConstants.Colors.WHITE,
          border: '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          boxShadow: StyleConstants.ShadowHigh,
          boxSizing: 'border-box',
          display: _this.state.showCalendar ? 'flex' : 'none',
          flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
          justifyContent: 'center',
          marginTop: isLargeOrMediumWindowSize ? 10 : 5,
          position: 'absolute',
          left: _this.props.isRelative && window.innerWidth > 450 ? 'auto' : 0,
          right: 0,
          maxWidth: 450,
          width: window.innerWidth,
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
            border: '1px solid' + _this.props.primaryColor
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
          color: StyleConstants.Colors.PRIMARY,
          display: isLargeOrMediumWindowSize ? 'inline-block' : 'none',
          fontFamily: StyleConstants.Fonts.SEMIBOLD,
          fontSize: StyleConstants.FontSizes.SMALL,
          padding: StyleConstants.Spacing.LARGE + 'px 0px ' + StyleConstants.Spacing.SMALL + 'px ' + StyleConstants.Spacing.LARGE + 'px'
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
          marginLeft: isLargeOrMediumWindowSize ? -10 : 0,
          marginRight: isLargeOrMediumWindowSize ? -10 : 0,
          maxWidth: window.innerWidth > 450 ? 250 : 'inherit',
          width: isLargeOrMediumWindowSize ? 150 : '100%'
        },
        rangeOption: {
          alignItems: 'center',
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'flex',
          padding: StyleConstants.Spacing.SMALL + 'px ' + StyleConstants.Spacing.MEDIUM + 'px',
          width: isLargeOrMediumWindowSize ? '100%' : '50%',

          ':hover': {
            backgroundColor: StyleConstants.Colors.PORCELAIN
          }
        },
        rangeOptionIcon: {
          paddingRight: StyleConstants.Spacing.SMALL
        },

        //Selected and Selecting Range
        selectedDay: {
          backgroundColor: _this.props.primaryColor,
          color: StyleConstants.Colors.WHITE
        },
        betweenDay: {
          backgroundColor: StyleConstants.adjustHexOpacity(_this.props.primaryColor, 0.5),
          borderRadius: 0,

          ':hover': {
            border: '1px solid' + _this.props.primaryColor
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateRangePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var isUpdatedSelectedEndDate = newProps.selectedEndDate && newProps.selectedEndDate !== this.props.selectedEndDate;
      var isUpdatedSelectedStartDate = newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate;

      if (isUpdatedSelectedEndDate || isUpdatedSelectedStartDate) {
        this.setState({
          currentDate: newProps.selectedEndDate ? newProps.selectedEndDate : newProps.selectedStartDate
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles();
      var spans = this.spans();

      return React.createElement(
        'div',
        { style: styles.component },
        React.createElement(
          'div',
          { onClick: this._toggleCalendar, style: styles.selectedDateWrapper },
          React.createElement(Icon, {
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
          React.createElement(Icon, {
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
                  selectedEndDate: this.props.selectedEndDate,
                  selectedStartDate: this.props.selectedStartDate,
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
                    [{ label: 'S', value: 'Sunday' }, { label: 'M', value: 'Monday' }, { label: 'T', value: 'Tuesday' }, { label: 'W', value: 'Wednesday' }, { label: 'T', value: 'Thursday' }, { label: 'F', value: 'Friday' }, { label: 'S', value: 'Saturday' }].map(function (day) {
                      return React.createElement(
                        'div',
                        { key: day.value, style: styles.calendarWeekDay },
                        day.label
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
    }
  }]);

  return DateRangePicker;
}(React.Component);

DateRangePicker.propTypes = {
  closeCalendarOnRangeSelect: PropTypes.bool,
  defaultRanges: PropTypes.arrayOf(PropTypes.shape({
    displayValue: PropTypes.string,
    endDate: PropTypes.number,
    startDate: PropTypes.number
  })),
  format: PropTypes.string,
  isRelative: PropTypes.bool,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onDateSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  primaryColor: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  showDefaultRanges: PropTypes.bool,
  style: PropTypes.object
};
DateRangePicker.defaultProps = {
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


module.exports = Radium(DateRangePicker);