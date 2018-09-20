const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');

const { SelectedBox } = require('../../constants/DateRangePicker');

class MonthTable extends React.Component {
  componentDidMount () {
    this._focusDay(this.props.focusedDay);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.focusedDay !== this.props.focusedDay) {
      this._focusDay(this.props.focusedDay);
    }
  }

  _focusDay = day => {
    const refForDay = this[day];

    if (refForDay && refForDay.focus) {
      refForDay.focus();
    }
  }

  _setRefForDay = day => ref => {
    this[day] = ref;
  }

  render () {
    const { activeSelectDate,
      currentDate,
      focusedDay,
      getDateRangePosition,
      handleDateHover,
      handleDateSelect,
      handleKeyDown,
      isInActiveRange,
      minimumDate,
      selectedBox,
      selectedEndDate,
      selectedStartDate,
      styles
    } = this.props;

    const days = [];
    let startDate = moment.unix(currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(currentDate).endOf('month').endOf('week');

    while (moment(startDate).isBefore(endDate)) {
      const disabledDay = minimumDate && startDate.isBefore(moment.unix(minimumDate));
      const isActiveRange = (selectedStartDate || selectedEndDate)
        ? isInActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate)
        : false;
      const whereInRange = getDateRangePosition(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
      const isSelectedStartDay = startDate.isSame(moment.unix(selectedStartDate), 'day');
      const isSelectedEndDay = startDate.isSame(moment.unix(selectedEndDate), 'day');
      const isSelectedDay = isSelectedStartDay || isSelectedEndDay;

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
      let ariaLabelStateText = '';
      const ariaLabelBeginningText = `Select ${selectedBox === SelectedBox.FROM ? 'start' : 'end'} date for range, `;
      const ariaLabelDateText = moment(startDate).format('dddd, MMMM Do, YYYY');

      if (!isSelectedDay && isActiveRange) {
        ariaLabelStateText = ', within selected range';
      } else if (isSelectedStartDay) {
        ariaLabelStateText = ', selected start date for range.';
      } else if (isSelectedEndDay) {
        ariaLabelStateText = ', selected end date for range.';
      }

      const day = (
        <a
          aria-label={ariaLabelBeginningText + ariaLabelDateText + ariaLabelStateText}
          aria-pressed={isSelectedDay}
          className='mx-month-table-day'
          key={startDate}
          onClick={!disabledDay && handleDateSelect.bind(null, startDate.unix())}
          onKeyDown={handleKeyDown.bind(null, startDate.unix())}
          onMouseEnter={!disabledDay && handleDateHover.bind(null, startDate.unix())}
          ref={this._setRefForDay(startDate.unix())}
          role='button'
          style={Object.assign({},
            styles.calendarDay,
            startDate.isSame(moment.unix(currentDate), 'month') && styles.currentMonth,
            disabledDay && styles.calendarDayDisabled,
            (startDate.isSame(moment(), 'day') && !isActiveRange) && styles.today,
            isActiveRange && Object.assign({}, styles.betweenDay, styles['betweenDay' + whereInRange]),
            isSelectedDay && Object.assign({}, styles.selectedDay, styles['selected' + whereInRange])
          )}
          tabIndex={startDate.isSame(moment.unix(focusedDay), 'day') ? 0 : null}
        >
          {startDate.date()}
        </a>
      );

      days.push(day);
      startDate = startDate.add(1, 'd');
    }

    return (<div className='mx-month-table' style={styles.calendarTable}>{days}</div>);
  }
}


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
