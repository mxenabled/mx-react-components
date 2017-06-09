const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class Calendar extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    primaryColor: PropTypes.string,
    selectedDate: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    locale: 'en',
    onDateSelect () {},
    primaryColor: StyleConstants.Colors.PRIMARY
  };

  state = {
    currentDate: this.props.selectedDate || this.props.minimumDate || moment().unix()
  };

  componentWillReceiveProps (newProps) {
    if (newProps.selectedDate && newProps.selectedDate !== this.props.selectedDate) {
      this.setState({
        currentDate: newProps.selectedDate
      });
    }
  }

  _handleDateSelect = (date, e) => {
    this.props.onDateSelect(date, e);
  };

  _handlePreviousClick = () => {
    const currentDate = moment.unix(this.state.currentDate).startOf('month').subtract(1, 'm').unix();

    this.setState({
      currentDate
    });
  };

  _handleNextClick = () => {
    const currentDate = moment.unix(this.state.currentDate).endOf('month').add(1, 'd').unix();

    this.setState({
      currentDate
    });
  };

  _getWeeks = () => {
    const startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');
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

  _renderMonthTable = () => {
    const styles = this.styles();
    const weeks = this._getWeeks();

    return weeks.map(week => {
      return (
        <div style={styles.calendarWeek}>
          {week.map(day => {
            const isCurrentMonth = day.isSame(moment.unix(this.state.currentDate), 'month');
            const isSelectedDay = day.isSame(moment.unix(this.props.selectedDate), 'day');
            const isToday = day.isSame(moment(), 'day');
            const disabledDay = this.props.minimumDate ? day.isBefore(moment.unix(this.props.minimumDate), 'day') : null;

            return (
              <div
                key={day}
                onClick={disabledDay ? null : this._handleDateSelect.bind(null, day.unix())}
                style={Object.assign({},
                  styles.calendarDay,
                  isCurrentMonth && styles.currentMonth,
                  disabledDay && styles.calendarDayDisabled,
                  isToday && styles.today,
                  isSelectedDay && styles.selectedDay
                )}
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
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div style={styles.calendarHeader}>
          <Icon
            elementProps={{
              onClick: this._handlePreviousClick
            }}
            size={20}
            style={styles.calendayHeaderNav}
            type='caret-left'
          />
          <div>
            {moment(this.state.currentDate, 'X').format('MMMM YYYY')}
          </div>
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
        {this._renderMonthTable()}
      </div>
    );
  }

  styles = () => {
    return {
      component: Object.assign({
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.GRAY_300,
        borderRadius: 3,
        boxSizing: 'border-box',
        marginTop: 10,
        padding: 20
      }, this.props.style),

      //Calendar Header
      calendarHeader: {
        alignItems: 'center',
        color: StyleConstants.Colors.GRAY_700,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.LARGE,
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
        color: StyleConstants.Colors.GRAY_500,
        display: 'flex',
        flex: '1 1 100%',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
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
        color: StyleConstants.Colors.GRAY_300,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 35,

        ':hover': {
          border: '1px solid ' + this.props.primaryColor
        }
      },
      calendarDayDisabled: {
        color: StyleConstants.Colors.GRAY_300,

        ':hover': {
          cursor: 'default',
          border: 'none'
        }
      },

      today: {
        backgroundColor: StyleConstants.Colors.GRAY_300,
        color: StyleConstants.Colors.WHITE
      },
      currentMonth: {
        color: StyleConstants.Colors.GRAY_700
      },
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      }
    };
  };
}

module.exports = Radium(Calendar);
