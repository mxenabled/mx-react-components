const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const DateRangePicker = React.createClass({
  propTypes: {
    defaultRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
      displayValue: React.PropTypes.string,
      endDate: React.PropTypes.number,
      startDate: React.PropTypes.number
    })),
    format: React.PropTypes.string,
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

  getDefaultProps () {
    return {
      defaultRanges: [
        {
          displayValue: 'Today',
          endDate: moment().endOf('day').unix(),
          startDate: moment().startOf('day').unix()
        },
        {
          displayValue: 'This Month',
          endDate: moment().endOf('month').unix(),
          startDate: moment().startOf('month').unix()
        },
        {
          displayValue: 'Last Month',
          endDate: moment().subtract(1, 'months').endOf('month').unix(),
          startDate: moment().subtract(1, 'months').startOf('month').unix()
        },
        {
          displayValue: 'Last 7 Days',
          endDate: moment().endOf('day').unix(),
          startDate: moment().subtract(6, 'days').startOf('day').unix()
        },
        {
          displayValue: 'Last 30 Days',
          endDate: moment().endOf('day').unix(),
          startDate: moment().subtract(29, 'days').startOf('day').unix()
        },
        {
          displayValue: 'Last 90 Days',
          endDate: moment().endOf('day').unix(),
          startDate: moment().subtract(89, 'days').startOf('day').unix()
        }
      ],
      format: 'MMM D, YYYY',
      locale: 'en',
      onDateSelect () {},
      placeholderText: 'Select A Date Range',
      primaryColor: StyleConstants.Colors.PRIMARY,
      showDefaultRanges: false
    };
  },

  getInitialState () {
    return {
      currentDate: this.props.selectedStartDate || moment().unix(),
      showCalendar: false
    };
  },

  componentWillReceiveProps (newProps) {
    if (newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate) {
      this.setState({
        currentDate: newProps.selectedStartDate
      });
    }
  },

  _handleDateSelect (date) {
    const selectedStartDate = this.props.selectedStartDate;
    const selectedEndDate = this.props.selectedEndDate;
    let updatedDates = [null, null];

    updatedDates = this._deselectDate(date, selectedStartDate, selectedEndDate);
    updatedDates = updatedDates || this._startAndEndDate(date, selectedStartDate, selectedEndDate);
    updatedDates = updatedDates || this._noEndDate(date, selectedStartDate, selectedEndDate);
    updatedDates = updatedDates || this._noStartDate(date, selectedStartDate, selectedEndDate);
    updatedDates = updatedDates || this._noStartOrEndDate(date, selectedStartDate, selectedEndDate);

    this.props.onDateSelect(updatedDates[0], updatedDates[1]);
  },

  _startAndEndDate (selected, start, end) {
    let updatedDates;

    if (start && end) {
      if (selected < start && selected < end) {
        updatedDates = [selected, end];
      } else if ((selected > start && selected < end) || selected > end) {
        updatedDates = [start, selected];
      }
    }

    return updatedDates;
  },

  _noEndDate (selected, start, end) {
    let updatedDates;

    if (start && !end) {
      if (selected > start) {
        updatedDates = [start, selected];
      } else {
        updatedDates = [selected, start];
      }
    }

    return updatedDates;
  },

  _noStartDate (selected, start, end) {
    let updatedDates;

    if (!start && end) {
      if (selected < end) {
        updatedDates = [selected, end];
      } else {
        updatedDates = [end, selected];
      }
    }

    return updatedDates;
  },

  _noStartOrEndDate (selected, start, end) {
    return (!start && !end) ? [selected, end] : null;
  },

  _deselectDate (selected, start, end) {
    let updatedDates;

    if (selected === start) {
      updatedDates = [null, end];
    } else if (selected === end) {
      updatedDates = [start, null];
    }

    return updatedDates;
  },

  _handleDefaultRangeSelection (range) {
    this.props.onDateSelect(range.startDate, range.endDate);
  },

  _handleDateHover (activeSelectDate) {
    this.setState({
      activeSelectDate
    });
  },

  _handlePreviousClick () {
    const currentDate = moment.unix(this.state.currentDate).startOf('month').subtract(1, 'm').unix();

    this.setState({
      currentDate
    });
  },

  _handleNextClick () {
    const currentDate = moment.unix(this.state.currentDate).endOf('month').add(1, 'd').unix();

    this.setState({
      currentDate
    });
  },

  _handleScrimClick () {
    this.setState({
      showCalendar: false
    });
  },

  _toggleCalendar () {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  },

  _isActiveRange (selectedStart, selectedEnd, active, date) {
    const start = selectedStart || active;
    const end = selectedEnd || active;

    let isActive;

    if (start < end) {
      isActive = date.isSameOrAfter(moment.unix(start)) && date.isSameOrBefore(moment.unix(end));
    } else {
      isActive = date.isSameOrBefore(moment.unix(start)) && date.isSameOrAfter(moment.unix(end));
    }

    return isActive;
  },

  _whereInDateRange (selectedStart, selectedEnd, active, date) {
    const start = selectedStart || active;
    const end = selectedEnd || active;

    let where;

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

  _renderDefaultRanges () {
    const styles = this.styles();

    return (
      <div style={styles.rangeOptions}>
        <div style={styles.defaultRangesTitle}>
          Select a Range
        </div>
        {this.props.defaultRanges.map(range => {
          return (
            <div key={range.displayValue + range.startDate} style={styles.rangeOption}>
              {this._renderSelectedRangeIcon(range)}
              <div onClick={this._handleDefaultRangeSelection.bind(null, range)}>
                {range.displayValue}
              </div>
            </div>
          );
        })}
      </div>
    );
  },

  _renderMonthTable () {
    const styles = this.styles();
    const days = [];
    let startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');

    while (moment(startDate).isBefore(endDate)) {
      const selectedStartDate = this.props.selectedStartDate;
      const selectedEndDate = this.props.selectedEndDate;
      const activeSelectDate = this.state.activeSelectDate;
      const isToday = startDate.isSame(moment(), 'day');
      const isCurrentMonth = startDate.isSame(moment.unix(this.state.currentDate), 'month');
      const disabledDay = this.props.minimumDate ? startDate.isBefore(moment.unix(this.props.minimumDate)) : null;
      const isActiveRange = (selectedStartDate || selectedEndDate) ? this._isActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate) : false;
      const whereInRange = this._whereInDateRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
      const isSelectedDay = startDate.isSame(moment.unix(selectedStartDate), 'day') || startDate.isSame(moment.unix(selectedEndDate), 'day');

      const day = (
        <div
          key={startDate}
          onClick={disabledDay ? null : this._handleDateSelect.bind(null, startDate.unix())}
          onMouseEnter={disabledDay ? null : this._handleDateHover.bind(null, startDate.unix())}
          style={Object.assign({},
            styles.calendarDay,
            isCurrentMonth && styles.currentMonth,
            disabledDay && styles.calendarDayDisabled,
            (isToday && !isActiveRange) && styles.today,
            isActiveRange && Object.assign({}, styles.betweenDay, styles['betweenDay' + whereInRange]),
            isSelectedDay && Object.assign({}, styles.selectedDay, styles['selected' + whereInRange])
          )}
        >
          {startDate.date()}
        </div>
      );

      days.push(day);
      startDate = startDate.add(1, 'd');
    }

    return days;
  },

  _renderSelectedRangeIcon (range) {
    const isSelectedRange = range.startDate === this.props.selectedStartDate && range.endDate === this.props.selectedEndDate;
    const iconStyle = { fill: isSelectedRange ? this.props.primaryColor : 'transparent' };

    return (
      <div>
        <Icon
          size={20}
          style={iconStyle}
          type='check-solid'
        />
      </div>
    );
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          <Icon
            size={20}
            style={styles.selectedDateIcon}
            type='calendar'
          />
          <div style={styles.selectedDateText}>
            {this.props.selectedStartDate && this.props.selectedEndDate ? (
              <div>
                <span>{moment.unix(this.props.selectedStartDate).format(this.props.format)}</span>
                <span> - </span>
                <span>{moment.unix(this.props.selectedEndDate).format(this.props.format)}</span>
              </div>
            ) : this.props.placeholderText}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
        <div style={styles.optionsWrapper}>
          {this.props.showDefaultRanges && this._renderDefaultRanges()}
          <div style={styles.calendarWrapper}>
            <div style={styles.calendarHeader}>
              <Icon
                onClick={this._handlePreviousClick}
                size={20}
                style={styles.calendayHeaderNav}
                type='caret-left'
              />
              <div>
                {moment(this.state.currentDate, 'X').format('MMMM YYYY')}
              </div>
              <Icon
                onClick={this._handleNextClick}
                size={20}
                style={styles.calendayHeaderNav}
                type='caret-right'
              />
            </div>
            <div style={styles.calendarWeek}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => {
                return (
                  <div key={i} style={styles.calendarWeekDay}>
                    {day}
                  </div>
                );
              })}
            </div>
            <div style={styles.calendarTable}>
              {this._renderMonthTable()}
            </div>
          </div>
        </div>
        {(this.state.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative',
        width: '100%'
      }, this.props.style),

      // Selected Date styles
      selectedDateWrapper: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 15px',
        position: 'relative'
      },
      selectedDateIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedStartDate && this.props.selectedEndDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1
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
        justifyContent: 'center',
        marginTop: 10,
        position: 'absolute',
        right: 0,
        zIndex: 10
      },
      calendarWrapper: {
        boxSizing: 'border-box',
        padding: 20,
        width: 285
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
      calendayHeaderNav: {
        width: 35
      },

      //Calendar week
      calendarWeek: {
        alignItems: 'center',
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        height: 30,
        justifyContent: 'space-around',
        marginBottom: 2
      },
      calendarWeekDay: {
        textAlign: 'center',
        width: 30
      },

      //Calenday table
      calendarTable: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
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
        fontSize: StyleConstants.FontSizes.LARGE,
        marginTop: 10,
        marginBottom: 20
      },
      rangeOptions: {
        borderRight: '1px solid ' + StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.CHARCOAL,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: 20,
        width: 115
      },
      rangeOption: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        marginBottom: 20,

        ':hover': {
          color: this.props.primaryColor
        }
      },

      //Selected and Selecting Range
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },
      selectedStart: {
        borderRadius: '3px 0 0 3px'
      },
      selectedEnd: {
        borderRadius: '0 3px 3px 0'
      },
      betweenDay: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.5),
        borderRadius: 0,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
        }
      },
      betweenDayStart: {
        borderRadius: '3px 0 0 3px'
      },
      betweenDayEnd: {
        borderRadius: '0 3px 3px 0'
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