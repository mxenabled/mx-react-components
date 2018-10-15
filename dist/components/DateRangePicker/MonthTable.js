"use strict";

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

var moment = require('moment');

var _require = require('../../constants/DateRangePicker'),
    SelectedBox = _require.SelectedBox;

var MonthTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonthTable, _React$Component);

  function MonthTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MonthTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonthTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_focusDay", function (day) {
      var refForDay = _this[day];

      if (refForDay && refForDay.focus) {
        refForDay.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_setRefForDay", function (day) {
      return function (ref) {
        _this[day] = ref;
      };
    });

    return _this;
  }

  _createClass(MonthTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._focusDay(this.props.focusedDay);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.focusedDay !== this.props.focusedDay) {
        this._focusDay(this.props.focusedDay);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeSelectDate = _this$props.activeSelectDate,
          currentDate = _this$props.currentDate,
          focusedDay = _this$props.focusedDay,
          getDateRangePosition = _this$props.getDateRangePosition,
          handleDateHover = _this$props.handleDateHover,
          handleDateSelect = _this$props.handleDateSelect,
          handleKeyDown = _this$props.handleKeyDown,
          isInActiveRange = _this$props.isInActiveRange,
          minimumDate = _this$props.minimumDate,
          selectedBox = _this$props.selectedBox,
          selectedEndDate = _this$props.selectedEndDate,
          selectedStartDate = _this$props.selectedStartDate,
          styles = _this$props.styles;
      var days = [];
      var startDate = moment.unix(currentDate).startOf('month').startOf('week');
      var endDate = moment.unix(currentDate).endOf('month').endOf('week');

      while (moment(startDate).isBefore(endDate)) {
        var disabledDay = minimumDate && startDate.isBefore(moment.unix(minimumDate));
        var isActiveRange = selectedStartDate || selectedEndDate ? isInActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate) : false;
        var whereInRange = getDateRangePosition(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
        var isSelectedStartDay = startDate.isSame(moment.unix(selectedStartDate), 'day');
        var isSelectedEndDay = startDate.isSame(moment.unix(selectedEndDate), 'day');
        var isSelectedDay = isSelectedStartDay || isSelectedEndDay;
        /**
         * Aria label possible states
         *
         * 1. Not in range, not selected
         *      Thursday, April 13th, 2018
         * 2. In range, not selected
         *      Thursday, April 13th, 2018, within selected range.
         * 3. In range, selected start date
         *      Thursday, April 13th, 2018, selected start date for range.
         * 4. In range, selected end date
         *      Thursday, April 13th, 2018, selected end date for range.
         * */

        var ariaLabelStateText = '';
        var ariaLabelBeginningText = "Select ".concat(selectedBox === SelectedBox.FROM ? 'start' : 'end', " date for range, ");
        var ariaLabelDateText = moment(startDate).format('dddd, MMMM Do, YYYY');

        if (!isSelectedDay && isActiveRange) {
          ariaLabelStateText = ', within selected range';
        } else if (isSelectedStartDay) {
          ariaLabelStateText = ', selected start date for range.';
        } else if (isSelectedEndDay) {
          ariaLabelStateText = ', selected end date for range.';
        }

        var day = React.createElement("a", {
          "aria-label": ariaLabelBeginningText + ariaLabelDateText + ariaLabelStateText,
          "aria-pressed": isSelectedDay,
          className: "mx-month-table-day",
          key: startDate,
          onClick: !disabledDay && handleDateSelect.bind(null, startDate.unix()),
          onKeyDown: handleKeyDown.bind(null, startDate.unix()),
          onMouseEnter: !disabledDay && handleDateHover.bind(null, startDate.unix()),
          ref: this._setRefForDay(startDate.unix()),
          role: "button",
          style: _extends({}, styles.calendarDay, startDate.isSame(moment.unix(currentDate), 'month') && styles.currentMonth, disabledDay && styles.calendarDayDisabled, startDate.isSame(moment(), 'day') && !isActiveRange && styles.today, isActiveRange && _extends({}, styles.betweenDay, styles['betweenDay' + whereInRange]), isSelectedDay && _extends({}, styles.selectedDay, styles['selected' + whereInRange])),
          tabIndex: startDate.isSame(moment.unix(focusedDay), 'day') ? 0 : null
        }, startDate.date());
        days.push(day);
        startDate = startDate.add(1, 'd');
      }

      return React.createElement("div", {
        className: "mx-month-table",
        style: styles.calendarTable
      }, days);
    }
  }]);

  return MonthTable;
}(React.Component);

MonthTable.propTypes = {
  activeSelectDate: PropTypes.number,
  currentDate: PropTypes.number,
  focusedDay: PropTypes.number,
  getDateRangePosition: PropTypes.func,
  handleDateHover: PropTypes.func,
  handleDateSelect: PropTypes.func,
  handleKeyDown: PropTypes.func,
  isInActiveRange: PropTypes.func,
  minimumDate: PropTypes.number,
  selectedBox: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.object
};
module.exports = MonthTable;