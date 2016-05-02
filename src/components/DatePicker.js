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
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      currentDate: null,
      format: 'MMM D, YYYY',
      isValid: true,
      locale: 'en',
      onDateSelect () {},
      placeholderText: 'Select A Date',
      primaryColor: StyleConstants.Colors.PRIMARY,
      showCalendar: false
    };
  },

  getInitialState () {
    return {
      inputValue: this.props.defaultDate,
      selectedDate: this.props.defaultDate
    };
  },

  _getSelectedDate () {
    const selectedDate = this.state.selectedDate;

    return selectedDate && moment.unix(selectedDate).isValid() ? this.state.selectedDate : moment().unix();
  },

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.setState({
      inputValue: moment.unix(date).format(this.props.format),
      isValid: true,
      selectedDate: date
    });

    this.props.onDateSelect(date);
  },

  _handlePreviousClick () {
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), this.props.format);

    this.setState({
      currentDate
    });
  },

  _handleNextClick () {
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.endOf('month').add(1, 'd'), this.props.format);

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

  _renderDayTitles (styles) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <div>
        {days.map((day, i) => {
          return (
            <div key={i} style={styles.calendarWeekContent}>
              <div style={styles.calendarWeekText}>
                {day}
              </div>
            </div>
          );
        })}
      </div>
    );
  },

  _renderMonthTable (currentDate, selectedDate, styles) {
    const days = [];
    const startDate = moment(currentDate, this.props.format).startOf('month').startOf('week');
    const endDate = moment(currentDate, this.props.format).endOf('month').endOf('week');
    const minimumDate = this.props.minimumDate ? moment.unix(this.props.minimumDate) : null;

    while (startDate.isBefore(endDate)) {
      const isCurrentMonth = startDate.month() === currentDate.month();
      const isCurrentDay = startDate.format(this.props.format) === selectedDate.format(this.props.format);
      const isToday = startDate.format(this.props.format) === moment().format(this.props.format);
      const noSelectDay = startDate.isBefore(minimumDate);
      const day = (
        <div
          key={startDate.month() + '-' + startDate.date()}
          onClick={!noSelectDay ? this._handleDateSelect.bind(null, startDate.unix()) : null}
          style={styles.calendarDay}
        >
          <div
            key={startDate.format('DDDD')}
            style={Object.assign({},
              styles.calendarDayContent,
              noSelectDay && styles.calendarDayDisabled,
              isCurrentDay && styles.selectedDay,
              (isToday && !isCurrentDay) && styles.currentDay,
              (!noSelectDay && isCurrentMonth && !isCurrentDay) && styles.currentMonth
            )}
          >
            <div style={styles.calendarDayText}>{startDate.date()}</div>
          </div>
        </div>
      );

      days.push(day);
      startDate.add(1, 'd');
    }

    return days;
  },

  _renderSelectedDate (styles) {
    return (
      <div
        key='dateDisplay'
        onClick={this._toggleCalendar}
        style={styles.dateDisplay}
      >
        <Icon
          style={styles.calendarIcon}
          type='calendar'
        />
        <div style={styles.inputValue}>
          {this.state.inputValue || this.props.placeholderText}
        </div>
        <div style={styles.caretWrapper}>
          <Icon
            style={styles.caret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
      </div>
    );
  },

  render () {
    const styles = this.styles();
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    const currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    return (
      <div
        style={Object.assign({},
          styles.component,
          styles.clearFix,
          this.props.style
        )}
        tabIndex={0}
      >
        <div
          key='selectedDateWrapper'
          style={styles.selectedDateWrapper}
        >
          {this._renderSelectedDate(styles)}
        </div>
        <div
          key='calendarWrapper'
          style={styles.calendarWrapper}
        >
          <div key='calendarHeader'
            style={Object.assign({},
              styles.calendarHeader,
              styles.clearFix
            )}
          >
            <Icon
              onClick={this._handlePreviousClick}
              size={20}
              style={Object.assign({}, styles.navIcon, styles.navLeft)}
              type='caret-left'
            />
            {currentDate.format('MMMM YYYY')}
            <Icon
              onClick={this._handleNextClick}
              size={20}
              style={Object.assign({}, styles.navIcon, styles.navRight)}
              type='caret-right'
            />
          </div>
          <div style={styles.calendarContainer}>
            {this._renderDayTitles(styles)}
            {this._renderMonthTable(currentDate, selectedDate, styles)}
          </div>
          <div style={styles.clearFix}></div>
        </div>
        {(this.state.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    );
  },

  styles () {
    return {
      calendarDay: {
        color: StyleConstants.Colors.FOG,
        float: 'left',
        height: 30,
        marginBottom: 2,
        position: 'relative',
        width: 35
      },
      calendarDayContent: {
        borderRadius: 3,
        height: 30,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        width: 35,

        ':hover': {
          border: '1px solid' + this.props.primaryColor,
          borderRadius: 3,
          cursor: 'pointer'
        }
      },
      calendarDayDisabled: {
        ':hover': {
          background: 'none',
          color: StyleConstants.Colors.FOG
        }
      },
      calendarDayText: {
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      },
      calendarHeader: {
        color: StyleConstants.Colors.CHARCOAL,
        fontSize: StyleConstants.FontSizes.LARGE,
        height: 30,
        padding: '7px 0',
        position: 'relative',
        textAlign: 'center'
      },
      calendarIcon: {
        left: 10,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      calendarWeekContent: {
        color: StyleConstants.Colors.ASH,
        float: 'left',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        height: 30,
        marginBottom: 2,
        position: 'relative',
        width: 35
      },
      calendarWeekText: {
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      },
      calendarWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderColor: StyleConstants.Colors.FOG,
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'block' : 'none',
        marginTop: 10,
        padding: '20px 20px 0 20px',
        position: 'absolute',
        right: 0,
        width: 287,
        zIndex: 10
      },
      caret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH,
        position: 'absolute',
        right: 5,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      caretWrapper: {
        position: 'absolute',
        top: '50%',
        right: 5
      },
      clearFix: {
        clear: 'both',
        marginBottom: 15
      },
      component: {
        backgroundColor: StyleConstants.Colors.WHITE,
        color: StyleConstants.Colors.BLACK,
        display: 'inline-block',
        float: 'right',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative',
        WebkitAppearance: 'none',
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },
      currentDay: {
        backgroundColor: StyleConstants.Colors.FOG
      },
      currentMonth: {
        color: StyleConstants.Colors.CHARCOAL
      },
      dateDisplay: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fill: this.props.primaryColor,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none',
        WebkitAppearance: 'none',
        zIndex: 2,

        ':focus': {
          border: 'none',
          boxShadow: 'none',
          outline: 'none'
        }
      },
      inputValue: {
        color: this.state.inputValue ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        display: 'inline-block',
        left: 40,
        position: 'absolute'
      },
      navIcon: {
        cursor: 'pointer'
      },
      navLeft: {
        position: 'absolute',
        left: 7,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      navRight: {
        position: 'absolute',
        right: 7,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },
      selectedDateWrapper: {
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        cursor: 'pointer',
        height: 40,
        position: 'relative',
        padding: 13
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
