const React = require('react');
const Radium = require('radium');
const moment = require('moment-timezone/builds/moment-timezone-with-data.min');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const DatePicker = React.createClass({
  propTypes: {
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
    style: React.PropTypes.object,
    timeFormat: React.PropTypes.string,
    timeIcon: React.PropTypes.string,
    timePlaceholder: React.PropTypes.string,
    timeZone: React.PropTypes.string,
    timeZoneFormat: React.PropTypes.oneOf(['abbr', 'name']),
    timeZoneNames: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: true,
      dateFormat: 'MMM D, YYYY',
      dateIcon: 'calendar',
      datePlaceholder: 'Select a Date',
      locale: 'en',
      onDateSelect () {},
      primaryColor: StyleConstants.Colors.PRIMARY,
      showIcons: true,
      timeFormat: 'LT',
      timeIcon: 'clock',
      timePlaceholder: 'Select a Time',
      timeZone: moment.tz.guess(),
      timeZoneNames: {
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

  getInitialState () {
    return {
      activeDate: null,
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
    this.refs.dateSelect.blur();

    this.setState({
      showCalendar: false
    });
  },

  _handleDateHover (activeDate) {
    this.setState({
      activeDate
    });
  },

  _handleDateSelect (date, e) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.props.onDateSelect(date);
    e.stopPropagation();
  },

  _handleTimeFocus () {
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
    const value = e.target.value.toLowerCase().replace('.', '');

    const time = value.split(':');
    const pm = value.includes('pm');
    const hour = pm ? Number(time[0]) + 12 : Number(time[0]);
    const minute = Number(time[1].substring(0, 2));
    const date = selectedDate.hour(hour).minute(minute).second(0).unix();

    this.setState({
      showTimes: false
    });

    this.props.onDateSelect(date);
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
      const isActiveDate = startDate.unix() === this.state.activeDate;

      const day = (
        <div
          key={startDate.unix()}
          onClick={disabledDay ? null : this._handleDateSelect.bind(null, startDate.unix())}
          onMouseEnter={this._handleDateHover.bind(null, startDate.unix())}
          onMouseLeave={this._handleDateHover}
          style={Object.assign({},
            styles.calendarDay,
            isActiveDate ? styles.calendarDayActive : null,
            isCurrentMonth ? styles.currentMonth : null,
            disabledDay ? styles.calendarDayDisabled : null,
            isToday ? styles.today : null,
            isSelectedDay ? styles.selectedDay : null
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

  _getTimeZone (date) {
    const timeZoneAbbr = moment.unix(date).tz(this.props.timeZone).format('z');

    if (this.props.timeZoneFormat === 'name') {
      return this.props.timeZoneNames[timeZoneAbbr] || timeZoneAbbr;
    } else if (this.props.timeZoneFormat === 'abbr') {
      return timeZoneAbbr;
    } else {
      return null;
    }
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div
          onBlur={this._handleDateBlur}
          onFocus={this._handleDateFocus}
          ref='dateSelect'
          style={Object.assign({}, styles.selectWrapper, this.state.showCalendar ? styles.activeSelectWrapper : null)}
          tabIndex={0}
        >
          {this.props.showIcons ? (
            <Icon
              size={20}
              style={styles.selectedIcon}
              type={this.props.dateIcon}
            />
          ) : null}
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
          tabIndex={0}
        >
          {this.props.showIcons ? (
            <Icon
              size={20}
              style={styles.selectedIcon}
              type='clock'
            />
          ) : null}
          {this.state.showTimes ? (
            <input
              autoFocus={true}
              defaultValue={this.state.showTimes ? moment.unix(this.props.selectedDate).format('HH:mm') : null}
              name='time'
              onBlur={this._handleTimeSelect}
              ref='timeInput'
              style={styles.timeInput}
              type='time'
            />
          ) : (
            <div style={styles.timeDisplay}>
              {this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.timeFormat) : this.props.timePlaceholder}
            </div>
          )}
        {this.props.timeZoneFormat ? (
          <div style={styles.timeZone}>
            {this._getTimeZone(this.props.selectedDate)}
          </div>
        ) : null}
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
      selectedTimeCaret: {
        fill: this.state.showTimes ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      // Time Styles
      timeInput: {
        flex: 1,
        boxShadow: 'none',
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none'
      },
      timeDisplay: {
        flex: 1,
        lineHeight: '1.55em',
        color: this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
      },
      timeZone: {
        paddingLeft: 10,
        textAlign: 'right',
        color: StyleConstants.Colors.ASH
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
        right: 0,
        top: 50,
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
        width: 35
      },
      calendarDayActive: {
        border: '1px solid' + this.props.primaryColor
      },
      calendarDayDisabled: {
        color: StyleConstants.Colors.FOG,
        border: 'none',
        cursor: 'default'
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
