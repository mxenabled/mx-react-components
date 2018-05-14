const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');
const keycode = require('keycode');

import { withTheme } from './Theme';
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
                aria-label={`${day.format('dddd, MMMM Do, YYYY')}${isSelectedDay ? ', Currently Selected' : ''}`}
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
                role='button'
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
    const daysOfWeek = [
      { label: 'Sunday', value: 'S' },
      { label: 'Monday', value: 'M' },
      { label: 'Tuesday', value: 'T' },
      { label: 'Wednesday', value: 'W' },
      { label: 'Thursday', value: 'T' },
      { label: 'Friday', value: 'F' },
      { label: 'Saturday', value: 'S' }
    ];
    const currentMonthText = moment.unix(this.state.currentDate).format('MMMM YYYY');
    const nextMonthText = moment.unix(this.state.currentDate).add(1, 'month').format('MMMM YYYY');
    const previousMonthText = moment.unix(this.state.currentDate).subtract(1, 'month').format('MMMM YYYY');

    return (
      <div className='mx-calendar' style={styles.component}>
        <div style={styles.calendarHeader}>
          <a
            aria-label={`Go back a month to ${previousMonthText}`}
            onClick={this._handlePreviousClick}
            onKeyUp={e => keycode(e) === 'enter' && this._handlePreviousClick()}
            role='button'
            tabIndex={0}
          >
            <Icon
              size={20}
              style={styles.calendayHeaderNav}
              type='caret-left'
            />
          </a>
          <div aria-label={`Currently in ${currentMonthText}`} role='heading'>{currentMonthText}</div>
          <a
            aria-label={`Go forward a month to ${nextMonthText}`}
            onClick={this._handleNextClick}
            onKeyUp={e => keycode(e) === 'enter' && this._handleNextClick()}
            role='button'
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
          {daysOfWeek.map((day) => {
            return (
              <div
                aria-hidden={true}
                key={day.label}
                style={styles.calendarWeekDay}
              >
                {day.value}
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

export default withTheme(Radium(Calendar));
