'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var PropTypes = require('prop-types');
var moment = require('moment');

var MonthTable = function MonthTable(_ref) {
  var activeSelectDate = _ref.activeSelectDate,
      currentDate = _ref.currentDate,
      getDateRangePosition = _ref.getDateRangePosition,
      handleDateHover = _ref.handleDateHover,
      handleDateSelect = _ref.handleDateSelect,
      isInActiveRange = _ref.isInActiveRange,
      minimumDate = _ref.minimumDate,
      selectedEndDate = _ref.selectedEndDate,
      selectedStartDate = _ref.selectedStartDate,
      styles = _ref.styles;

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

module.exports = MonthTable;