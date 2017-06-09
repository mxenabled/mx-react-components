const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

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
    currentDate: this.props.selectedDate || this.props.minimumDate || moment().unix()
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

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

  _renderMonthTable = (styles) => {
    const days = [];
    let startDate = moment.unix(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment.unix(this.state.currentDate).endOf('month').endOf('week');

    while (moment(startDate).isBefore(endDate)) {
      const isCurrentMonth = startDate.isSame(moment.unix(this.state.currentDate), 'month');
      const isSelectedDay = startDate.isSame(moment.unix(this.props.selectedDate), 'day');
      const isToday = startDate.isSame(moment(), 'day');
      const disabledDay = this.props.minimumDate ? startDate.isBefore(moment.unix(this.props.minimumDate), 'day') : null;

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
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const styles = this.styles(theme);

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
          {this._renderMonthTable(styles)}
        </div>
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: Object.assign({
        backgroundColor: theme.Colors.WHITE,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        boxSizing: 'border-box',
        marginTop: 10,
        padding: 20,
        width: 250
      }, this.props.style),

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
      calendarWeek: {
        alignItems: 'center',
        color: theme.Colors.GRAY_500,
        display: 'flex',
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.SMALL,
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
