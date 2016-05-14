const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const DatePicker = React.createClass({
  propTypes: {
    format: React.PropTypes.string,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    selectedEndDate: React.PropTypes.number,
    selectedStartDate: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      format: 'MMM D, YYYY',
      locale: 'en',
      onDateSelect () {},
      placeholderText: 'Select A Date Range',
      primaryColor: StyleConstants.Colors.PRIMARY
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
    if (this.state.selectedStartDate === date) {
      this.state.selectedStartDate = null;
      return;
    }
    if (this.state.selectedEndDate === date) {
      this.state.selectedEndDate = null;
      return;
    }

    if (!this.state.selectedStartDate || this.state.selectedStartDate > date) {
      this.state.selectedStartDate = date;
    } else if (this.state.selectedStartDate < date) {
      this.state.selectedEndDate = date;
    }

    console.log(this.state.selectedStartDate, this.state.selectedEndDate);

    this.props.onDateSelect(this.state.selectedStartDate, this.state.selectedEndDate);
  },

  _handleDateHover (date) {
    this.state.activeSelectDate = date;
    console.log(moment.unix(date).format(this.props.format));
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

  _renderMonthTable () {
    const styles = this.styles();
    const days = [];
    let startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');

    while (moment(startDate).isBefore(endDate)) {
      const isToday = startDate.isSame(moment(), 'day');
      const isCurrentMonth = startDate.isSame(moment.unix(this.state.currentDate), 'month');
      const disabledDay = this.props.minimumDate ? startDate.isBefore(moment.unix(this.props.minimumDate)) : null;
      const isSelectedStartDay = startDate.isSame(moment.unix(this.state.selectedStartDate), 'day');
      const isSelectedEndDay = startDate.isSame(moment.unix(this.state.selectedEndDate), 'day');
      const isActiveRange = startDate.isBetween(moment.unix(this.state.selectedStartDate), moment.unix(this.state.activeSelectDate));
      const isSelectedRange = startDate.isBetween(moment.unix(this.state.selectedStartDate), moment.unix(this.state.selectedEndDate));

      const day = (
        <div
          key={startDate}
          onClick={disabledDay ? null : this._handleDateSelect.bind(null, startDate.unix())}
          onMouseOver={(disabledDay || !this.state.selectedStartDate || this.state.selectedEndDate) ? null : this._handleDateHover.bind(null, startDate.unix())}
          style={Object.assign({},
            styles.calendarDay,
            isCurrentMonth && styles.currentMonth,
            disabledDay && styles.calendarDayDisabled,
            (isToday && (!isActiveRange || !isSelectedRange)) && styles.today,
            isSelectedStartDay && Object.assign({}, styles.selectedDay, styles.selectedStartDay),
            isSelectedEndDay && Object.assign({}, styles.selectedDay, styles.selectedEndDay),
            (isSelectedRange || isActiveRange) && styles.betweenDay
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
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          <Icon
            size={20}
            style={styles.selectedDateIcon}
            type='calendar'
          />
          <div style={styles.selectedDateText}>
            {this.state.selectedStartDate && this.state.selectedEndDate ? (
              <div>
                <span>{moment.unix(this.state.selectedStartDate).format(this.props.format)}</span>
                <span> - </span>
                <span>{moment.unix(this.state.selectedEndDate).format(this.props.format)}</span>
              </div>
            ) : this.props.placeholderText}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
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
        color: (this.state.selectedStartDate && this.state.selectedEndDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      //Calendar Styles
      calendarWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'block' : 'none',
        marginTop: 10,
        padding: 20,
        position: 'absolute',
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
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },
      selectedStartDay: {
        borderRadius: '3px 0 0 3px'
      },
      selectedEndDay: {
        borderRadius: '0 3px 3px 0'
      },
      betweenDay: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.5),
        borderRadius: 0
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
