const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');
const keycode = require('keycode');

const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class Calendar extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    primaryColor: PropTypes.string,
    selectedDate: PropTypes.number,
    style: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    locale: 'en',
    onDateSelect () {}
  };

  state = {
    currentDate:
      this.props.selectedDate || this.props.minimumDate || moment().unix(),
    focusedDay:
      this.props.selectedDate || this.props.minimumDate || moment().unix()
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  componentWillReceiveProps (newProps) {
    if (
      newProps.selectedDate &&
      newProps.selectedDate !== this.props.selectedDate
    ) {
      this.setState({
        currentDate: newProps.selectedDate
      });
    }
  }

  _handleDateSelect = (date, e) => {
    this.props.onDateSelect(date, e);
  };

  _handlePreviousClick = () => {
    const currentDate = moment
      .unix(this.state.currentDate)
      .startOf('month')
      .subtract(1, 'm')
      .unix();

    this.setState({
      currentDate
    });
  };

  _handleDayKeyDown = (e) => {
    const startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');

    if (keycode(e) === 'right') {
      const day = moment.unix(this.state.focusedDay).add(1, 'days').startOf('day');

      if (day.isSameOrAfter(endDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'left') {
      const day = moment.unix(this.state.focusedDay).subtract(1, 'days').startOf('day');

      if (day.isBefore(startDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'enter') {
      this._handleDateSelect(this.state.focusedDay, e);
    } else if (keycode(e) === 'up') {
      e.preventDefault(); //stop browser scrolling
      const day = moment.unix(this.state.focusedDay).subtract(7, 'days').startOf('day');

      if (day.isBefore(startDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'down') {
      e.preventDefault(); //stop browser scrolling
      const day = moment.unix(this.state.focusedDay).add(7, 'days').startOf('day');

      if (day.isSameOrAfter(endDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    }
  };

  _handleNextClick = () => {
    const currentDate = moment
      .unix(this.state.currentDate)
      .endOf('month')
      .add(1, 'd')
      .unix();

    this.setState({
      currentDate
    });
  };

  _getWeeks = () => {
    const startDate = moment
      .unix(this.state.currentDate)
      .startOf('month')
      .startOf('week');
    const endDate = moment
      .unix(this.state.currentDate)
      .endOf('month')
      .endOf('week');
    const weekLength = 7;
    const weeks = [];
    let days = [];

    while (moment(startDate).isBefore(endDate)) {
      const day = startDate.clone();

      if (days.length < weekLength) {
        days.push(day);
        startDate.add(1, 'd');
      } else {
        days = [];
      }

      if (days.length === weekLength) {
        weeks.push(days);
      }
    }

    return weeks;
  };

  _renderMonthTable = styles => {
    const weeks = this._getWeeks();

    return weeks.map(week => {
      return (
        <div key={week} style={styles.calendarWeek}>
          {week.map(day => {
            const isCurrentMonth = day.isSame(
              moment.unix(this.state.currentDate),
              'month'
            );
            const isSelectedDay = day.isSame(
              moment.unix(this.props.selectedDate),
              'day'
            );
            const isToday = day.isSame(moment(), 'day');
            const disabledDay = this.props.minimumDate ?
              day.isBefore(moment.unix(this.props.minimumDate), 'day') :
              null;
            const savedStartDate = day.date();


            return (
              <div
                className="calendar-day"
                id={day.isSame(moment.unix(this.state.focusedDay), 'day') ? 'focused-day': null}
                key={day}
                onClick={
                  disabledDay ?
                    null :
                    this._handleDateSelect.bind(null, day.unix())
                }
                onKeyDown={this._handleDayKeyDown}
                ref={ref => {
                  if (ref && moment.unix(this.state.focusedDay).date() === savedStartDate) {
                    ref.focus();
                  }
                }}
                style={Object.assign(
                  {},
                  styles.calendarDay,
                  isCurrentMonth && styles.currentMonth,
                  disabledDay && styles.calendarDayDisabled,
                  isToday && styles.today,
                  isSelectedDay && styles.selectedDay
                )}
                tabIndex={day.isSame(moment.unix(this.state.focusedDay), 'day') ? 0 : null}
              >
                {day.date()}
              </div>
            );
          })}
        </div>
      );
    });
  };

  render () {
    const theme = StyleUtils.mergeTheme(
      this.props.theme,
      this.props.primaryColor
    );
    const styles = this.styles(theme);

    return (
      <div className="anotherTest" style={styles.component}>
        <div style={styles.calendarHeader}>
          <Icon
            elementProps={{
              onClick: this._handlePreviousClick
            }}
            size={20}
            style={styles.calendayHeaderNav}
            type='caret-left'
          />
          <div>{moment.unix(this.state.currentDate).format('MMMM YYYY')}</div>
          <Icon
            elementProps={{
              onClick: this._handleNextClick
            }}
            size={20}
            style={styles.calendayHeaderNav}
            type='caret-right'
          />
        </div>
        <div style={styles.calendarWeekHeader}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => {
            return (
              <div key={i} style={styles.calendarWeekDay}>
                {day}
              </div>
            );
          })}
        </div>
        {this._renderMonthTable(styles)}
      </div>
    );
  }

  styles = theme => {
    return {
      component: Object.assign(
        {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxSizing: 'border-box',
          marginTop: 10,
          padding: 20
        },
        this.props.style
      ),

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
      calendayHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      //Calendar week
      calendarWeekHeader: {
        alignItems: 'center',
        color: theme.Colors.GRAY_500,
        display: 'flex',
        flex: '1 1 100%',
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.SMALL,
        height: 30,
        justifyContent: 'center',
        marginBottom: 2
      },
      calendarWeekDay: {
        textAlign: 'center',
        width: 35
      },
      calendarWeek: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'center'
      },

      //Calenday table
      calendarDay: {
        alignItems: 'center',
        borderRadius: 3,
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_300,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 35,

        ':hover': {
          border: '1px solid ' + theme.Colors.PRIMARY
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
      selectedDay: {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE
      }
    };
  };
}

module.exports = Radium(Calendar);
