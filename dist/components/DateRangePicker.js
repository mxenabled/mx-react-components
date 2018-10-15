"use strict";

var _Theme = require("./Theme");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var keycode = require('keycode');

var moment = require('moment');

var _merge = require('lodash/merge');

var Icon = require('./Icon');

var Button = require('./Button');

var MXFocusTrap = require('../components/MXFocusTrap');

var _require = require('../constants/DateRangePicker'),
    SelectedBox = _require.SelectedBox;

var _require2 = require('../constants/App'),
    themeShape = _require2.themeShape;

var StyleUtils = require('../utils/Style');

var MonthTable = require('./DateRangePicker/MonthTable');

var _require3 = require('./DateRangePicker/Selector'),
    MonthSelector = _require3.MonthSelector,
    YearSelector = _require3.YearSelector;

var SelectionPane = require('./DateRangePicker/SelectionPane');

var DateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DateRangePicker, _React$Component);

  function DateRangePicker(props) {
    var _this;

    _classCallCheck(this, DateRangePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRangePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getDateFormat", function (isLargeOrMediumWindowSize) {
      return isLargeOrMediumWindowSize ? _this.props.format : 'MMM D';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_isLargeOrMediumWindowSize", function (theme) {
      var windowSize = StyleUtils.getWindowSize(theme.BreakPoints);
      return windowSize === 'large' || windowSize === 'medium';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_endDateIsBeforeStartDate", function (startDate, endDate) {
      return moment.unix(endDate).isBefore(moment.unix(startDate));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusFromButton", function () {
      if (_this._fromButton && _this._fromButton.focus) {
        _this._fromButton.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusToButton", function () {
      if (_this._toButton && _this._toButton.focus) {
        _this._toButton.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getToggledSelectBox", function (currentSelectBox) {
      return currentSelectBox === SelectedBox.FROM ? SelectedBox.TO : SelectedBox.FROM;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDateSelect", function (date) {
      var theme = StyleUtils.mergeTheme(_this.props.theme);

      var isLargeOrMediumWindowSize = _this._isLargeOrMediumWindowSize(theme);

      var _this$state = _this.state,
          selectedBox = _this$state.selectedBox,
          selectedEndDate = _this$state.selectedEndDate,
          selectedStartDate = _this$state.selectedStartDate;
      var endDate = selectedBox === SelectedBox.TO ? date : selectedEndDate;
      var startDate = selectedBox === SelectedBox.FROM ? date : selectedStartDate;

      var modifiedRangeCompleteButDatesInversed = startDate && endDate && _this._endDateIsBeforeStartDate(startDate, endDate);

      _this.setState(function (state) {
        return {
          currentDate: date,
          focusedDay: date,
          selectedBox: isLargeOrMediumWindowSize ? _this._getToggledSelectBox(state.selectedBox) : state.selectedBox,
          selectedStartDate: modifiedRangeCompleteButDatesInversed ? endDate : startDate,
          selectedEndDate: modifiedRangeCompleteButDatesInversed ? startDate : endDate,
          showCalendar: false
        };
      }, function () {
        if (!isLargeOrMediumWindowSize) {
          switch (_this.state.selectedBox) {
            case SelectedBox.FROM:
              _this._focusFromButton();

              break;

            case SelectedBox.TO:
              _this._focusToButton();

              break;
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDefaultRangeSelection", function (range) {
      _this.setState({
        selectedStartDate: range.getStartDate(),
        selectedEndDate: range.getEndDate(),
        focusedDay: range.getEndDate()
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDayKeyDown", function (date, e) {
      var startDate = moment.unix(_this.state.currentDate).startOf('month').startOf('week');
      var endDate = moment.unix(_this.state.currentDate).endOf('month').endOf('week');

      if (keycode(e) === 'right') {
        var day = moment.unix(_this.state.focusedDay).add(1, 'days').startOf('day');

        if (day.isSameOrAfter(endDate)) {
          _this.setState({
            currentDate: day.unix()
          });
        }

        _this.setState({
          focusedDay: day.unix()
        });
      } else if (keycode(e) === 'left') {
        var _day = moment.unix(_this.state.focusedDay).subtract(1, 'days').startOf('day');

        if (_day.isBefore(startDate)) {
          _this.setState({
            currentDate: _day.unix()
          });
        }

        _this.setState({
          focusedDay: _day.unix()
        });
      } else if (keycode(e) === 'enter') {
        e.preventDefault();
        e.stopPropagation();

        _this._handleDateSelect(date);
      } else if (keycode(e) === 'up') {
        e.preventDefault(); //stop browser scrolling

        var _day2 = moment.unix(_this.state.focusedDay).subtract(7, 'days').startOf('day');

        if (_day2.isBefore(startDate)) {
          _this.setState({
            currentDate: _day2.unix()
          });
        }

        _this.setState({
          focusedDay: _day2.unix()
        });
      } else if (keycode(e) === 'down') {
        e.preventDefault(); //stop browser scrolling

        var _day3 = moment.unix(_this.state.focusedDay).add(7, 'days').startOf('day');

        if (_day3.isSameOrAfter(endDate)) {
          _this.setState({
            currentDate: _day3.unix()
          });
        }

        _this.setState({
          focusedDay: _day3.unix()
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDateHover", function (activeSelectDate) {
      _this.setState({
        activeSelectDate: activeSelectDate
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_toggleSelectionPane", function () {
      _this.setState({
        showSelectionPane: !_this.state.showSelectionPane
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_isInActiveRange", function (selectedStart, selectedEnd, active, date) {
      var start = selectedStart || active;
      var end = selectedEnd || active;
      var isActive;

      if (start < end) {
        isActive = date.isSameOrAfter(moment.unix(start)) && date.isSameOrBefore(moment.unix(end));
      } else {
        isActive = date.isSameOrBefore(moment.unix(start)) && date.isSameOrAfter(moment.unix(end));
      }

      return isActive;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getDateRangePosition", function (selectedStart, selectedEnd, active, date) {
      var start = selectedStart || active;
      var end = selectedEnd || active;
      var where;

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
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_resetToPropValuesAndClose", function () {
      _this.props.onClose();

      _this.setState({
        focusedDay: _this.props.selectedStartDate,
        selectedStartDate: _this.props.selectedStartDate,
        selectedEndDate: _this.props.selectedEndDate,
        showCalendar: false,
        showSelectionPane: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "styles", function (theme, isLargeOrMediumWindowSize) {
      return _merge({}, {
        component: _extends({
          backgroundColor: theme.Colors.WHITE,
          borderColor: _this.state.showSelectionPane ? theme.Colors.PRIMARY : theme.Colors.GRAY_300,
          borderRadius: 3,
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
          color: theme.Colors.GRAY_900,
          cursor: 'pointer',
          display: 'inline-block',
          fontFamily: theme.FontFamily,
          fontSize: theme.FontSizes.MEDIUM,
          padding: '10px 15px',
          position: _this.props.isRelative && window.innerWidth > 450 ? 'relative' : 'static',
          width: '100%'
        }, _this.props.style),
        container: {
          flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column-reverse'
        },
        bottomPane: {
          backgroundColor: theme.Colors.GRAY_100,
          display: 'flex',
          flexDirection: 'row',
          padding: theme.Spacing.SMALL,
          paddingRight: theme.Spacing.MEDIUM,
          justifyContent: 'flex-end'
        },
        bottomPaneMobile: {
          display: 'flex',
          flexDirection: 'row',
          padding: theme.Spacing.SMALL,
          paddingTop: theme.Spacing.MEDIUM,
          justifyContent: 'flex-end'
        },
        selectionContainer: {
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 auto'
        },
        row: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        },
        // Selected Date styles
        selectedDateButton: {
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          margin: 0,
          padding: 0,
          width: '100%'
        },
        selectedDateIcon: {
          fill: theme.Colors.PRIMARY,
          marginRight: 5
        },
        selectedDateText: {
          color: _this.state.selectedStartDate && _this.state.selectedEndDate ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500
        },
        selectedDateCaret: {
          fill: _this.state.showSelectionPane ? theme.Colors.PRIMARY : theme.Colors.GRAY_500
        },
        //Calendar Styles
        optionsWrapper: {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          display: _this.state.showSelectionPane ? 'flex' : 'none',
          flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
          justifyContent: 'center',
          marginTop: isLargeOrMediumWindowSize ? 10 : 5,
          position: 'absolute',
          left: isLargeOrMediumWindowSize ? '50%' : 0,
          right: isLargeOrMediumWindowSize ? 'auto' : 0,
          transform: isLargeOrMediumWindowSize ? 'translateX(-50%)' : null,
          zIndex: 10,
          maxWidth: 575,
          width: window.innerWidth
        },
        calendarWrapper: {
          boxSizing: 'border-box',
          padding: 20,
          margin: 'auto',
          maxWidth: 275,
          width: isLargeOrMediumWindowSize ? 275 : '100%'
        },
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
        //Calendar week
        calendarWeek: {
          alignItems: 'center',
          color: theme.Colors.GRAY_500,
          display: 'flex',
          fontFamily: theme.Fonts.SEMIBOLD,
          fontSize: theme.FontSizes.SMALL,
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
          color: theme.Colors.GRAY_300,
          cursor: 'pointer',
          display: 'flex',
          height: 30,
          justifyContent: 'center',
          marginBottom: 2,
          width: 30,
          ':hover': {
            border: '1px solid' + theme.Colors.PRIMARY
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
        applyButton: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: theme.Spacing.MEDIUM
        },
        //Selected and Selecting Range
        selectedDay: {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE
        },
        betweenDay: {
          backgroundColor: StyleUtils.adjustHexOpacity(theme.Colors.PRIMARY, 0.5),
          borderRadius: 0,
          ':hover': {
            border: '1px solid' + theme.Colors.PRIMARY
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
      }, _this.props.styles);
    });

    _this.state = {
      currentDate: props.selectedEndDate || moment().startOf('day').unix(),
      focusedDay: props.selectedEndDate || moment().startOf('day').unix(),
      selectedBox: SelectedBox.FROM,
      selectedStartDate: _this.props.selectedStartDate,
      selectedEndDate: _this.props.selectedEndDate,
      showSelectionPane: false
    };
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var isUpdatedSelectedEndDate = newProps.selectedEndDate && newProps.selectedEndDate !== this.props.selectedEndDate;
      var isUpdatedSelectedStartDate = newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate;

      if (isUpdatedSelectedEndDate || isUpdatedSelectedStartDate) {
        this.setState({
          focusedDay: isUpdatedSelectedEndDate ? newProps.selectedEndDate : this.state.focusedDay,
          currentDate: newProps.selectedEndDate ? newProps.selectedEndDate : newProps.selectedStartDate,
          selectedEndDate: isUpdatedSelectedEndDate ? newProps.selectedEndDate : this.state.selectedEndDate,
          selectedStartDate: isUpdatedSelectedStartDate ? newProps.selectedStartDate : this.state.selectedStartDate
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var theme = StyleUtils.mergeTheme(this.props.theme);

      var isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);

      var styles = this.styles(theme, isLargeOrMediumWindowSize);
      var shouldShowCalendarIcon = StyleUtils.getWindowSize(theme.BreakPoints) !== 'small';
      var showCalendar = isLargeOrMediumWindowSize || this.state.showCalendar;
      var _this$state2 = this.state,
          selectedEndDate = _this$state2.selectedEndDate,
          selectedStartDate = _this$state2.selectedStartDate;
      var placeholderText = this.props.placeholderText;
      var selectedEndDateFromPropsAsMoment = moment.unix(this.props.selectedEndDate);
      var selectedStartDateFromPropsAsMoment = moment.unix(this.props.selectedStartDate);

      var mergedFocusTrapProps = _objectSpread({
        focusTrapOptions: {
          clickOutsideDeactivates: true
        },
        paused: false
      }, this.props.focusTrapProps);

      return React.createElement("div", {
        className: "mx-date-range-picker",
        style: styles.component
      }, React.createElement("button", {
        "aria-controls": "calendarMenu",
        "aria-expanded": this.state.showSelectionPane,
        "aria-haspopup": "menu",
        "aria-label": "".concat(placeholderText).concat(this.props.selectedStartDate && this.props.selectedEndDate ? ", ".concat(selectedStartDateFromPropsAsMoment.format('MMMM Do, YYYY'), " to ").concat(selectedEndDateFromPropsAsMoment.format('MMMM Do, YYYY'), " currently selected") : ''),
        onClick: this._toggleSelectionPane,
        ref: this.props.elementRef,
        style: styles.selectedDateButton
      }, shouldShowCalendarIcon ? React.createElement(Icon, {
        size: 20,
        style: styles.selectedDateIcon,
        type: "calendar"
      }) : null, React.createElement("div", {
        className: "mx-date-range-picker-selected-date-text",
        style: styles.selectedDateText
      }, this.props.selectedStartDate && this.props.selectedEndDate ? React.createElement("div", null, React.createElement("span", null, selectedStartDateFromPropsAsMoment.format(this._getDateFormat(isLargeOrMediumWindowSize))), React.createElement("span", null, " - "), React.createElement("span", null, selectedEndDateFromPropsAsMoment.format(this._getDateFormat(isLargeOrMediumWindowSize)))) : placeholderText), React.createElement(Icon, {
        size: 20,
        style: styles.selectedDateCaret,
        type: this.state.showSelectionPane ? 'caret-up' : 'caret-down'
      })), React.createElement("div", {
        style: styles.container
      }, React.createElement("div", null, this.state.showSelectionPane ? React.createElement(MXFocusTrap, mergedFocusTrapProps, React.createElement("div", {
        id: "calendarMenu",
        onKeyUp: function onKeyUp(e) {
          if (keycode(e) === 'esc') {
            _this2.setState({
              showSelectionPane: false
            });
          }
        },
        role: "menu",
        style: styles.optionsWrapper
      }, React.createElement("div", {
        className: "mx-date-range-picker-pane",
        style: styles.selectionContainer
      }, React.createElement("div", {
        style: styles.row
      }, !this.state.showCalendar && React.createElement("div", null, this.props.showDefaultRanges && React.createElement(SelectionPane, {
        defaultRanges: this.props.defaultRanges,
        getFromButtonRef: function getFromButtonRef(ref) {
          return _this2._fromButton = ref;
        },
        getToButtonRef: function getToButtonRef(ref) {
          return _this2._toButton = ref;
        },
        handleDefaultRangeSelection: this._handleDefaultRangeSelection,
        onDateBoxClick: function onDateBoxClick(date, selectedBox) {
          _this2.setState({
            currentDate: date || moment().unix(),
            selectedBox: selectedBox,
            showCalendar: !isLargeOrMediumWindowSize
          });
        },
        selectedBox: this.state.selectedBox,
        selectedEndDate: selectedEndDate,
        selectedStartDate: selectedStartDate,
        styles: styles,
        theme: theme
      })), showCalendar ? React.createElement("div", null, React.createElement("div", {
        className: "mx-date-range-picker-calendar",
        style: styles.calendarWrapper
      }, React.createElement("div", {
        className: "mx-date-range-picker-calendar-header",
        style: styles.calendarHeader
      }, React.createElement(MonthSelector, {
        currentDate: this.state.currentDate,
        setCurrentDate: function setCurrentDate(currentDate) {
          return _this2.setState({
            currentDate: currentDate,
            focusedDay: currentDate
          });
        }
      }), React.createElement(YearSelector, {
        currentDate: this.state.currentDate,
        setCurrentDate: function setCurrentDate(currentDate) {
          return _this2.setState({
            currentDate: currentDate,
            focusedDay: currentDate
          });
        }
      })), React.createElement("div", {
        className: "mx-date-range-picker-week-label",
        style: styles.calendarWeek
      }, [{
        label: 'S',
        value: 'Sunday'
      }, {
        label: 'M',
        value: 'Monday'
      }, {
        label: 'T',
        value: 'Tuesday'
      }, {
        label: 'W',
        value: 'Wednesday'
      }, {
        label: 'T',
        value: 'Thursday'
      }, {
        label: 'F',
        value: 'Friday'
      }, {
        label: 'S',
        value: 'Saturday'
      }].map(function (day) {
        return React.createElement("div", {
          "aria-hidden": true,
          key: day.value,
          style: styles.calendarWeekDay
        }, day.label);
      })), React.createElement(MonthTable, {
        activeSelectDate: this.state.activeSelectDate,
        currentDate: this.state.currentDate,
        focusedDay: this.state.focusedDay || this.state.currentDate,
        getDateRangePosition: this._getDateRangePosition,
        handleDateHover: this._handleDateHover,
        handleDateSelect: this._handleDateSelect,
        handleKeyDown: this._handleDayKeyDown,
        isInActiveRange: this._isInActiveRange,
        minimumDate: this.props.minimumDate,
        selectedBox: this.state.selectedBox,
        selectedEndDate: selectedEndDate,
        selectedStartDate: selectedStartDate,
        styles: styles
      }))) : null), React.createElement("div", {
        style: styles.bottomPane
      }, React.createElement(Button, {
        "aria-label": "Cancel Date Range Selection",
        onClick: function onClick() {
          _this2._resetToPropValuesAndClose();
        },
        theme: this.props.theme,
        type: "secondary"
      }, "Cancel"), React.createElement(Button, {
        "aria-label": "Apply Date Range Selection",
        onClick: function onClick() {
          _this2.props.onDateRangeSelect(selectedStartDate, selectedEndDate);

          _this2._resetToPropValuesAndClose();
        },
        style: styles.applyButton,
        theme: this.props.theme,
        type: selectedStartDate && selectedEndDate ? 'primary' : 'disabled'
      }, "Apply"))))) : null)), this.state.showSelectionPane ? React.createElement("div", {
        onClick: this._resetToPropValuesAndClose,
        style: styles.scrim
      }) : null);
    }
  }]);

  return DateRangePicker;
}(React.Component);

_defineProperty(DateRangePicker, "propTypes", {
  defaultRanges: PropTypes.arrayOf(PropTypes.shape({
    displayValue: PropTypes.string,
    getEndDate: PropTypes.func,
    getStartDate: PropTypes.func
  })),
  elementRef: PropTypes.func,
  focusTrapProps: PropTypes.object,
  format: PropTypes.string,
  isRelative: PropTypes.bool,
  locale: PropTypes.string,
  minimumDate: PropTypes.number,
  onClose: PropTypes.func,
  onDateRangeSelect: PropTypes.func,
  placeholderText: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  showDefaultRanges: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object,
  theme: themeShape
});

_defineProperty(DateRangePicker, "defaultProps", {
  defaultRanges: [{
    displayValue: 'This Month',
    getEndDate: function getEndDate() {
      return moment().endOf('month').unix();
    },
    getStartDate: function getStartDate() {
      return moment().startOf('month').unix();
    }
  }, {
    displayValue: 'Last 30 Days',
    getEndDate: function getEndDate() {
      return moment().endOf('day').unix();
    },
    getStartDate: function getStartDate() {
      return moment().subtract(29, 'days').startOf('day').unix();
    }
  }, {
    displayValue: 'Last Month',
    getEndDate: function getEndDate() {
      return moment().subtract(1, 'months').endOf('month').unix();
    },
    getStartDate: function getStartDate() {
      return moment().subtract(1, 'months').startOf('month').unix();
    }
  }, {
    displayValue: 'Last 90 Days',
    getEndDate: function getEndDate() {
      return moment().endOf('day').unix();
    },
    getStartDate: function getStartDate() {
      return moment().subtract(89, 'days').startOf('day').unix();
    }
  }, {
    displayValue: 'Year To Date',
    getEndDate: function getEndDate() {
      return moment().endOf('day').unix();
    },
    getStartDate: function getStartDate() {
      return moment().startOf('year').unix();
    }
  }, {
    displayValue: 'Last Year',
    getEndDate: function getEndDate() {
      return moment().startOf('year').subtract(1, 'd').unix();
    },
    getStartDate: function getStartDate() {
      return moment().startOf('year').subtract(1, 'y').unix();
    }
  }],
  focusTrapProps: {},
  format: 'MMM D, YYYY',
  isRelative: true,
  locale: 'en',
  onClose: function onClose() {},
  placeholderText: 'Select A Date Range',
  showDefaultRanges: false
});

module.exports = (0, _Theme.withTheme)(Radium(DateRangePicker));