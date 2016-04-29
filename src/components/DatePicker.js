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
      primaryColor: StyleConstants.Colors.PRIMARY,
      showCalendar: false
    };
  },

  getInitialState () {
    return {
      inputValue: this._getInputValueByDate(this.props.defaultDate),
      selectedDate: this.props.defaultDate
    };
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultDate !== this.props.defaultDate) {
      this.setState({
        selectedDate: nextProps.defaultDate,
        inputValue: moment.unix(nextProps.defaultDate).format(this.props.format)
      });
    }
  },

  _getInputValueByDate (date) {
    let inputValue = '';

    if (date) {
      const newDate = moment.unix(date);

      if (newDate.isValid()) {
        inputValue = newDate.format(this.props.format);
      } else {
        inputValue = date;
      }
    }

    return inputValue;
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

  _handleInputBlur (evt) {
    if (evt.target.value.length === 0) {
      this.props.onDateSelect(null);

      this.setState({
        inputValue: '',
        selectedDate: ''
      });
    } else {
      this.setState({
        inputValue: moment.unix(this.state.selectedDate).format(this.props.format)
      });
    }
  },

  _handleInputChange (evt) {
    this.setState({
      inputValue: evt.target.value
    });
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
          style={[
            styles.calendarDay,
            (!noSelectDay && isCurrentMonth) && styles.currentMonth
          ]}
        >
          <div
            key={startDate.format('DDDD')}
            style={[
              styles.calendarDayContent,
              styles.dayHover,
              noSelectDay && styles.calendarDayDisabled,
              isCurrentDay && styles.selectedDay,
              (isToday && !isCurrentDay) && styles.currentDay
            ]}
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

  _renderScrim (styles) {
    if (this.state.showCalendar) {
      return (
        <div onClick={this._handleScrimClick} style={styles.scrim} />
      );
    } else {
      return null;
    }
  },

  _renderSelectedDate (styles) {
    return (
      <div>
        <Icon
          onClick={this._toggleCalendar}
          style={styles.calendarIcon}
          type='calendar'
        />
        <input
          key='input'
          onBlur={this._handleInputBlur}
          onChange={this._handleInputChange}
          onClick={this._toggleCalendar}
          placeholder={this.props.placeholderText || 'Select A Date'}
          style={styles.input}
          type='text'
          value={this.state.inputValue}
        />
        {this._renderCaret(styles)}
      </div>
    );
  },

  _renderCaret (styles) {
    return (
      <div style={styles.caretWrapper}>
        <Icon
          onClick={this._toggleCalendar}
          style={styles.caret}
          type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
        />
      </div>
    );
  },

  render () {
    const styles = this.styles();
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    const currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;
    let leftNavIconStyle = Object.assign({}, styles.navIcon, styles.navLeft);
    let rightNavIconStyle = Object.assign({}, styles.navIcon, styles.navRight);

    return (
      <div
        style={[styles.component, styles.clearFix, this.props.style]}
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
          <div key='calendarHeader' style={[styles.calendarHeader, { borderBottomStyle: 'none' }, styles.clearFix]}>
            <Icon
              onClick={this._handlePreviousClick}
              size={20}
              style={leftNavIconStyle}
              type='caret-left'
            />
            {currentDate.format('MMMM YYYY')}
            <Icon
              onClick={this._handleNextClick}
              size={20}
              style={rightNavIconStyle}
              type='caret-right'
            />
          </div>
          <div style={styles.calendarContainer}>
            {this._renderDayTitles(styles)}
            {this._renderMonthTable(currentDate, selectedDate, styles)}
          </div>
          <div style={styles.clearFix}></div>
        </div>
        {this._renderScrim(styles)}
      </div>
    );
  },

  styles () {
    return {
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
      calendarDay: {
        color: StyleConstants.Colors.FOG,
        float: 'left',
        height: 30,
        marginBottom: 2,
        position: 'relative',
        width: 35
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
      calendarDayContent: {
        borderRadius: 3,
        height: 30,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        width: 35
      },
      calendarDayText: {
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      },
      calendarDayDisabled: {
        ':hover': {
          background: 'none',
          color: StyleConstants.Colors.FOG
        }
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
        fill: this.props.primaryColor,
        margin: '2px 3px -3px'
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
      dayHover: {
        ':hover': {
          border: '1px solid' + this.props.primaryColor,
          borderRadius: 3,
          cursor: 'pointer'
        }
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
        position: 'relative',
        padding: 5
      },
      currentDay: {
        backgroundColor: StyleConstants.Colors.FOG
      },
      currentMonth: {
        color: StyleConstants.Colors.CHARCOAL
      },
      input: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none',
        paddingBottom: 10,
        paddingLeft: 5,
        position: 'relative',
        top: 5,
        WebkitAppearance: 'none',
        width: '80%',
        zIndex: 2,

        ':focus': {
          border: 'none',
          boxShadow: 'none',
          outline: 'none'
        }
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
