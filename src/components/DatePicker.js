const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const DatePicker = React.createClass({
  propTypes: {
    closeOnDateSelect: React.PropTypes.bool,
    defaultDate: React.PropTypes.number,
    format: React.PropTypes.string,
    locale: React.PropTypes.string,
    minimumDate: React.PropTypes.number,
    onDateSelect: React.PropTypes.func,
    placeholderText: React.PropTypes.string,
    primaryColor: React.PropTypes.string,
    selectedDate: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      format: 'MMM D, YYYY',
      locale: 'en',
      onDateSelect () {},
      placeholderText: 'Select A Date',
      primaryColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {
      currentDate: this.props.selectedDate || this.props.defaultDate || moment().unix(),
      showCalendar: false
    };
  },

  componentDidMount () {
    if (this.props.defaultDate) {
      console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
    }
  },

  componentWillReceiveProps (newProps) {
    if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
      this.setState({
        currentDate: newProps.selectedDate
      });
    }

    if (newProps.defaultDate && newProps.defaultDate !== this.props.defaultDate) {
      console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
      this.setState({
        currentDate: newProps.defaultDate
      });
    }
  },

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.props.onDateSelect(date);
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
      const isCurrentMonth = startDate.isSame(moment.unix(this.state.currentDate), 'month');
      const isSelectedDay = startDate.isSame(moment.unix(this.props.selectedDate || this.props.defaultDate), 'day');
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
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          <Icon
            style={styles.selectedDateIcon}
            type='calendar'
          />
          <div style={styles.selectedDateText}>
            {(this.props.selectedDate || this.props.defaultDate) ? moment.unix(this.props.selectedDate || this.props.defaultDate).format(this.props.format) : this.props.placeholderText}
          </div>
          <Icon
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
        <div style={styles.calendarWrapper}>
          <div style={styles.calendarHeader}>
            <Icon
              onClick={this._handlePreviousClick}
              type='caret-left'
            />
            <div>
              {moment(this.state.currentDate, 'X').format('MMMM YYYY')}
            </div>
            <Icon
              onClick={this._handleNextClick}
              type='caret-right'
            />
          </div>
          <div style={styles.calendarWeek}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => {
              return (
                <div key={i}>
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
        boxSizing: 'border-box',
        backgroundColor: StyleConstants.Colors.WHITE,
        color: StyleConstants.Colors.BLACK,
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative',
        width: '100%',
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1
      }, this.props.style),

      // Selected Date styles
      selectedDateWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        padding: 7
      },
      selectedDateIcon: {
        marginRight: 5,
        fill: this.props.primaryColor
      },
      selectedDateText: {
        flex: '1',
        color: (this.props.selectedDate || this.props.defaultDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: StyleConstants.Colors.CHARCOAL,
        fontSize: StyleConstants.FontSizes.LARGE,
        marginBottom: 15,
        height: 30,
        position: 'relative',
        textAlign: 'center'
      },

      //Calendar week
      calendarWeek: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: StyleConstants.Colors.ASH,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        height: 30,
        marginBottom: 2
      },

      //Calenday table
      calendarTable: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      calendarDay: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: StyleConstants.Colors.FOG,
        borderRadius: 3,
        height: 30,
        width: 35,
        maringBottom: 2,
        cursor: 'pointer',

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
        color: StyleConstants.Colors.WHITE,
        backgroundColor: StyleConstants.Colors.FOG
      },
      currentMonth: {
        color: StyleConstants.Colors.CHARCOAL
      },
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },

      scrim: {
        position: 'fixed',
        zIndex: 9,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };
  }
});

module.exports = Radium(DatePicker);
