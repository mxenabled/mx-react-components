const React = require('react');
const Radium = require('radium');
const moment = require('moment-timezone/builds/moment-timezone-with-data.min');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const DatePicker = React.createClass({
  propTypes: {
    closeOnDateSelect: React.PropTypes.bool,
    dateFormat: React.PropTypes.string,
    datePlaceholder: React.PropTypes.string,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    primaryColor: React.PropTypes.string,
    selectedDate: React.PropTypes.number,
    style: React.PropTypes.object,
    timeFormat: React.PropTypes.string,
    timeIncrement: React.PropTypes.number,
    timePlaceholder: React.PropTypes.string,
    timezone: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      dateFormat: 'MMM D, YYYY',
      datePlaceholder: 'Select a Date',
      locale: 'en',
      onDateSelect () {},
      primaryColor: StyleConstants.Colors.PRIMARY,
      timeFormat: 'LT',
      timeIncrement: 10,
      timePlaceholder: 'Select a Time',
      timezone: 'America/Denver'
    };
  },

  getInitialState () {
    return {
      activeTime: null,
      currentDate: moment().unix(),
      showCalendar: false,
      showTimes: false
    };
  },

  componentWillReceiveProps (newProps) {
    if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
      this.setState({
        currentDate: newProps.selectedDate
      });
    }
  },

  _handleDateFocus () {
    this.setState({
      showCalendar: true
    });
  },

  _handleDateBlur () {
    this.setState({
      showCalendar: false
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

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.props.onDateSelect(date);
  },

  _handleTimeFocus () {
    this.refs.timeInput.focus();

    this.setState({
      showTimes: true
    });
  },

  _handleTimeBlur () {
    this.setState({
      showTimes: false
    });
  },

  _handleTimeSelect (e) {
    const selectedDate = this.props.selectedDate ? moment.unix(this.props.selectedDate) : moment();

    const time = e.target.value.split(':');
    const hour = time[0];
    const minute = time[1].substring(0, 2);
    const date = selectedDate.hour(hour).minute(minute).second(0).unix();

    this.props.onDateSelect(date);

    this.setState({
      showTimes: false
    });
  },

  _renderMonthTable () {
    const styles = this.styles();
    const days = [];
    let startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');

    while (moment(startDate).isBefore(endDate)) {
      const isCurrentMonth = startDate.isSame(moment.unix(this.state.currentDate), 'month');
      const isSelectedDay = startDate.isSame(moment.unix(this.props.selectedDate), 'day');
      const isToday = startDate.isSame(moment(), 'day');
      const disabledDay = this.props.minimumDate ? startDate.isBefore(moment.unix(this.props.minimumDate)) : null;

      const day = (
        <div
          key={startDate}
          onClick={disabledDay ? null : this._handleDateSelect.bind(null, startDate.unix())}
          style={Object.assign({},
            styles.calendarDay,
            isCurrentMonth && styles.currentMonth,
            disabledDay && styles.calendarDayDisabled,
            isToday && styles.today,
            isSelectedDay && styles.selectedDay
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

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div
          onBlur={this._handleDateBlur}
          onFocus={this._handleDateFocus}
          style={Object.assign({}, styles.selectWrapper, this.state.showCalendar ? styles.activeSelectWrapper : null)}
          tabIndex={0}
        >
          <Icon
            size={20}
            style={styles.selectedIcon}
            type='calendar'
          />
          <div style={styles.selectedText}>
            {this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.dateFormat) : this.props.datePlaceholder}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        {this.state.showCalendar ? (
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
        ) : null}
        </div>
        <div>
          {this.props.children}
        </div>
        <div
          onBlur={this._handleTimeBlur}
          onFocus={this._handleTimeFocus}
          style={Object.assign({}, styles.selectWrapper, this.state.showTimes ? styles.activeSelectWrapper : null)}
          tabIndex={1}
        >
          <Icon
            size={20}
            style={styles.selectedIcon}
            type='clock'
          />
          <input
            defaultValue={this.props.selectedDate ? moment.unix(this.props.selectedDate).format('HH:mm') : ''}
            name='time'
            onBlur={this._handleTimeSelect}
            ref='timeInput'
            style={styles.timeInput}
            type='time'
          />
        </div>
        <div>
          {moment(this.state.selectedDate).format('z')}
        </div>
        {this.state.showCalendar || this.state.showTimes ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null}
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }, this.props.style),

      // Selected styles
      selectWrapper: {
        fontSize: StyleConstants.FontSizes.MEDIUM,
        color: StyleConstants.Colors.CHARCOAL,
        boxSizing: 'border-box',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        flex: '1 0 0%',
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        padding: '10px 15px',
        position: 'relative',
        outline: 'none',
        boxShadow: 'none'
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
      selectedTimeCaret: {
        fill: this.state.showTimes ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      // Time Styles
      timeInput: {
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      },
      timeOption: {
        textAlign: 'right',
        padding: 10
      },
      activeTimeOption: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },

      //Calendar Styles
      calendarWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        padding: 20,
        position: 'absolute',
        top: 50,
        right: 0,
        width: 287,
        zIndex: 10
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
        width: 35
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
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },

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

module.exports = Radium(DatePicker);
