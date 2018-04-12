const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');
const keycode = require('keycode');

const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

export const getNewDateStateChange = ({
  code,
  focusedDay,
  startDate,
  endDate
}) => {
  let day = null;
  let currentDate = null;
  // Don't mutate existing focusedDay moment object
  const copyOfFocusedDay = moment(focusedDay);

  if (code === 'right') {
    day = copyOfFocusedDay.add(1, 'days').startOf('day');
  } else if (code === 'left') {
    day = copyOfFocusedDay.subtract(1, 'days').startOf('day');
  } else if (code === 'up') {
    day = copyOfFocusedDay.subtract(7, 'days').startOf('day');
  } else if (code === 'down') {
    day = copyOfFocusedDay.add(7, 'days').startOf('day');
  }

  if (day && (day.isBefore(startDate) || day.isAfter(endDate))) {
    currentDate = day.unix();
  }

  return day ?
  {
    focusedDay: day.unix(),
    ...(currentDate ? { currentDate } : {})
  } :
    null;
};

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

  componentDidUpdate (prevProps, prevState) {
    if (prevState.focusedDay !== this.state.focusedDay) {
      const focusedDayRef = this[this.state.focusedDay];

      if (focusedDayRef && focusedDayRef.focus) focusedDayRef.focus();
    }
  }

  _handleNextClick = () => {
    const currentDate = moment
      .unix(this.state.currentDate)
      .endOf('month')
      .add(1, 'd')
      .unix();

    this.setState({
      currentDate,
      focusedDay: currentDate
    });
  };

  _handlePreviousClick = () => {
    const currentDate = moment
      .unix(this.state.currentDate)
      .startOf('month')
      .subtract(1, 'm')
      .unix();

    this.setState({
      currentDate,
      focusedDay: currentDate
    });
  };

  _handleDayKeyDown = (e, day) => {
    if (keycode(e) === 'up' || keycode(e) === 'down') e.preventDefault();

    if (keycode(e) === 'enter')
      this.props.onDateSelect(day.unix(), e);

    const newDateStateChange = getNewDateStateChange({
      code: keycode(e),
      focusedDay: day,
      startDate: moment
        .unix(this.state.currentDate)
        .startOf('month')
        .startOf('week'),
      endDate: moment
        .unix(this.state.currentDate)
        .endOf('month')
        .endOf('week')
    });

    if (newDateStateChange !== null) this.setState(newDateStateChange);
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

            return (
              <a
                aria-label={day.format('MMMM Do, YYYY')}
                className='calendar-day'
                id={
                  day.isSame(moment.unix(this.state.focusedDay), 'day') ?
                    'focused-day' :
                    null
                }
                key={day.unix()}
                onClick={e => {
                  if (!disabledDay) this.props.onDateSelect(day.unix(), e);
                }}
                onKeyDown={e => this._handleDayKeyDown(e, day)}
                ref={dayAnchorTag => (this[day.unix()] = dayAnchorTag)}
                style={Object.assign(
                  {},
                  styles.calendarDay,
                  isCurrentMonth && styles.currentMonth,
                  disabledDay && styles.calendarDayDisabled,
                  isToday && styles.today,
                  isSelectedDay && styles.selectedDay
                )}
                tabIndex={
                  day.isSame(moment.unix(this.state.focusedDay), 'day') ?
                    0 :
                    null
                }
              >
                {day.date()}
              </a>
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
      <div style={styles.component}>
        <div style={styles.calendarHeader}>
          <a
            onClick={this._handlePreviousClick}
            onKeyUp={e => keycode(e) === 'enter' && this._handlePreviousClick()}
            tabIndex={0}
          >
            <Icon
              size={20}
              style={styles.calendayHeaderNav}
              type='caret-left'
            />
          </a>
          <div>{moment.unix(this.state.currentDate).format('MMMM YYYY')}</div>
          <a
            onClick={this._handleNextClick}
            onKeyUp={e => keycode(e) === 'enter' && this._handleNextClick()}
            tabIndex={0}
          >
            <Icon
              size={20}
              style={styles.calendayHeaderNav}
              type='caret-right'
            />
          </a>
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
      component: {
        backgroundColor: theme.Colors.WHITE,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        boxSizing: 'border-box',
        marginTop: 10,
        padding: 20,
        ...this.props.style
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

export default Radium(Calendar);
