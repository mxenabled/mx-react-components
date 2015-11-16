const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class DatePicker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: null,
      inputValue: this._getInputValueByDate(this.props.defaultDate),
      isValid: true,
      selectedDate: this.props.defaultDate,
      showCalendar: false
    };
  }

  _getInputValueByDate (date) {
    let inputValue = null;

    if (date) {
      const newDate = moment.utc(date * 1000);

      if (newDate.isValid()) {
        inputValue = newDate.format(this.props.format);
      } else {
        inputValue = date;
      }
    }

    return inputValue;
  }

  _getSelectedDate () {
    const selectedDate = this.state.selectedDate;

    return selectedDate && moment.utc(selectedDate * 1000).isValid() ? this.state.selectedDate : moment().unix();
  }

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.setState({
      inputValue: moment.utc(date * 1000).format(this.props.format),
      isValid: true,
      selectedDate: date
    });

    this.props.onDateSelect(date);
  }

  _handleInputBlur (evt) {
    if (evt.target.value.length === 0) {
      this.props.onDateSelect(null);

      this.setState({
        inputValue: null,
        selectedDate: null
      });
    } else {
      this.setState({
        inputValue: moment.utc(this.state.selectedDate * 1000).format(this.props.format)
      });
    }
  }

  _handleInputChange (evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  _handlePreviousClick () {
    const selectedDate = moment.utc(this._getSelectedDate() * 1000).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), this.props.format);

    this.setState({
      currentDate
    });
  }

  _handleNextClick () {
    const selectedDate = moment.utc(this._getSelectedDate() * 1000).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.endOf('month').add(1, 'd'), this.props.format);

    this.setState({
      currentDate
    });
  }

  _handleScrimClick () {
    this.setState({
      showCalendar: false
    });
  }

  _toggleCalendar () {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  _renderMonthTable (currentDate, selectedDate) {
    const days = [];
    const startDate = moment(currentDate, this.props.format).startOf('month').startOf('week');
    const endDate = moment(currentDate, this.props.format).endOf('month').endOf('week');
    const minimumDate = this.props.minimumDate ? moment.utc(this.props.minimumDate * 1000) : null;

    while (startDate.isBefore(endDate)) {
      const isCurrentMonth = startDate.month() === currentDate.month();
      const isCurrentDay = startDate.format(this.props.format) === selectedDate.format(this.props.format);
      let day;
      const noSelectDay = startDate.isBefore(minimumDate);

      day = (
        <div
          key={startDate.month() + '-' + startDate.date()}
          onClick={!noSelectDay ? this._handleDateSelect.bind(this, startDate.unix()) : null}
          style={[
            styles.calendarDay,
            (!noSelectDay && isCurrentMonth) && styles.currentMonth
          ]}
        >
          <div
            key={startDate.format('DDDD')}
            style={[styles.calendarDayContent, noSelectDay ? styles.calendarDayDisabled : isCurrentDay && styles.currentDay]}
          >
            <div style={styles.calendarDayText}>{startDate.date()}</div>
          </div>
        </div>);

      if (this.props.showDayBorders) {
        day.props.style.push([styles.borderRight, styles.borderBottom]);
      }

      days.push(day);
      startDate.add(1, 'd');
    }

    return days;
  }

  _renderScrim (styles) {
    if (this.state.showCalendar) {
      return (
        <div onClick={this._handleScrimClick.bind(this)} style={[styles.scrim, this.props.scrimStyle]}/>
      );
    }
  }

  _renderSelectedDate () {
    if (this.props.useInputForSelectedDate) {
      const hidePlaceholder = this.state.inputValue && this.state.inputValue.length;

      return (
        <div>
          <input
            key='input'
            onBlur={this._handleInputBlur.bind(this)}
            onChange={this._handleInputChange.bind(this)}
            onClick={this._toggleCalendar.bind(this)}
            style={[styles.input, this.props.inputStyle, hidePlaceholder && { opacity: 1 }]}
            type='text'
            value={this.state.inputValue}
          />
          <div style={[styles.placeholderText, this.props.placeholderTextStyle]}>
            {this.props.placeholderText || 'Select A Date'}
          </div>
          {this._renderCaret()}
        </div>
      );
    } else {
      return (
        <div
          key='selectedDate'
          onClick={this._toggleCalendar.bind(this)}
          style={styles.selectedDate}
        >
          {this.state.inputValue}
          {this._renderCaret()}
        </div>
      );
    }
  }

  _renderTitle (styles) {
    if (this.props.title) {
      return (
        <div key='title' style={styles.title}>
          {this.props.title}
        </div>
      );
    }
  }

  _renderCaret () {
    if (this.props.showCaret) {
      return (
        <div style={[styles.caretWrapper, this.props.caretWrapperStyle]}>
          <Icon
            onClick={this._toggleCalendar.bind(this)}
            size='20'
            style={styles.caret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
      );
    }
  }

  render () {
    const selectedDate = moment.utc(this._getSelectedDate() * 1000).locale(this.props.locale);
    const currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    return (
      <div
        style={[styles.component, styles.clearFix, this.props.style]}
        tabIndex='0'
      >
        <div key='selectedDateWrapper' style={[
          styles.selectedDateWrapper,
          this.props.selectedDateWrapperStyle
        ]}>
          {this._renderSelectedDate()}
        </div>
        <div key='calendarWrapper' style={[
          styles.calendarWrapper,
          this.props.calendarWrapperStyle,
          this.state.showCalendar && styles.calendarShow
        ]}>
          {this._renderTitle(styles)}
          <div key='calendarHeader' style={[styles.calendarHeader, { borderBottomStyle: this.props.showDayBorders ? 'solid' : 'none' }, styles.clearFix]}>
            <Icon
              onClick={this._handlePreviousClick.bind(this)}
              size='32px'
              style={[styles.navIcon, styles.navLeft, this.props.showDayBorders && styles.borderRight]}
              type='caret-left'
            />
            {currentDate.format('MMMM YYYY')}
            <Icon
              onClick={this._handleNextClick.bind(this)}
              size='32px'
              style={[styles.navIcon, styles.navRight, this.props.showDayBorders && styles.borderLeft]}
              type='caret-right'
            />
          </div>
          <div style={styles.calendarContainer}>
            {this._renderMonthTable(currentDate, selectedDate)}
          </div>
          <div style={styles.clearFix}></div>
        </div>
        {this._renderScrim(styles)}
      </div>
    );
  }
}

DatePicker.propTypes = {
  calendarWrapperStyle: React.PropTypes.object,
  caretWrapperStyle: React.PropTypes.object,
  closeOnDateSelect: React.PropTypes.bool,
  defaultDate: React.PropTypes.number,
  format: React.PropTypes.string,
  inputStyle: React.PropTypes.object,
  locale: React.PropTypes.string,
  minimumDate: React.PropTypes.number,
  onDateSelect: React.PropTypes.func,
  placeholderText: React.PropTypes.string,
  placeholderTextStyle: React.PropTypes.object,
  scrimStyle: React.PropTypes.object,
  selectedDateWrapperStyle: React.PropTypes.object,
  showCaret: React.PropTypes.bool,
  showDayBorders: React.PropTypes.bool,
  style: React.PropTypes.object,
  title: React.PropTypes.string,
  useInputForSelectedDate: React.PropTypes.bool
};

DatePicker.defaultProps = {
  closeOnDateSelect: false,
  format: 'MMM D, YYYY',
  locale: 'en',
  onDateSelect () {},
  scrimStyle: {},
  showCaret: true,
  showDayBorders: false,
  title: null,
  useInputForSelectedDate: true
};

const styles = {
  caret: {
    color: '#CCCCCC',
    cursor: 'pointer',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  caretWrapper: {
    position: 'absolute',
    top: '50%',
    right: '5px'
  },
  calendarDay: {
    color: '#DDDDDD',
    float: 'left',
    paddingBottom: '11%',
    position: 'relative',
    width: '13.5%'
  },
  borderBottom: {
    borderBottom: '#E5E5E5',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
  },
  borderRight: {
    borderRight: '#E5E5E5',
    borderRightStyle: 'solid',
    borderRightWidth: '1px'
  },
  borderLeft: {
    borderLeft: '#E5E5E5',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px'
  },
  calendarContainer: {
    width: '100%',
    padding: '0px 2px 10px 6px'
  },
  calendarDayContent: {
    borderRadius: '50%',
    height: '32px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    width: '32px',

    ':hover': {
      backgroundColor: '#359BCF',
      color: '#FFFFFF',
      cursor: 'pointer'
    }
  },
  calendarDayText: {
    borderRadius: '100%',
    fontSize: StyleConstants.FontSize,
    fontWeight: 'normal',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)'
  },
  calendarDayDisabled: {
    ':hover': {
      background: 'none',
      color: '#DDDDDD'
    }
  },
  calendarHeader: {
    color: '#606060',
    borderBottom: '#E5E5E5',
    borderBottomWidth: '1px',
    fontSize: '15px',
    fontWeight: 'normal',
    padding: '5px 0px 7px 0px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'none'
  },
  calendarIcon: {
    color: '#DDDDDD',
    position: 'absolute',
    right: '12.8px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  calendarShow: {
    display: 'block'
  },
  clearFix: {
    clear: 'both',
    marginBottom: '15px'
  },
  component: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSize,
    WebkitAppearance: 'none',
    width: '100%',

    '@media (max-width: 768px)': {
      fontSize: '8px'
    },

    ':focus': {
      boxShadow: 'none',
      outline: 'none'
    }
  },
  calendarWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: StyleConstants.BoxShadow,
    boxSizing: 'border-box',
    display: 'none',
    maxWidth: '270px',
    padding: '0px 0px 0px 0px',
    margin: '0 0 40px 0',
    position: 'absolute',
    width: '100%',
    zIndex: 10
  },
  selectedDateWrapper: {
    borderBottomWidth: '1px',
    borderColor: '#E5E5E5',
    borderRadius: '3px 3px 3px 3px',
    borderStyle: 'solid',
    borderWidth: '1px 1px 1px 1px',
    position: 'relative',
    padding: '5px 5px 5px 5px'
  },
  currentDay: {
    backgroundColor: '#359BCF',
    color: '#FFFFFF'
  },
  currentMonth: {
    color: '#606060'
  },
  input: {
    backgroundColor: '#FFFFFF',
    border: 'none',
    fontSize: StyleConstants.FontSize,
    opacity: 0,
    outline: 'none',
    paddingBottom: '10px',
    paddingLeft: '5px',
    position: 'relative',
    top: '5px',
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
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  navRight: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  placeholderText: {
    color: '#AAAAAA',
    fontSize: '14px',
    paddingLeft: '5px',
    position: 'absolute',
    top: '10px'
  },
  scrim: {
    position: 'fixed',
    zIndex: 9,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  selectedDate: {
    color: '#606060',
    cursor: 'pointer',
    fontSize: StyleConstants.FontSize,
    padding: '5px 0 5px 5px',
    verticalAlign: 'middle',
    width: '100%',

    ':hover': {
      color: '#359BCF'
    }
  },
  title: {
    backgroundColor: '#666666',
    color: '#f2f2f2',
    textAlign: 'center',
    padding: '7px 0px 7px 0px',
    fontSize: StyleConstants.FontSize,
    margin: '1px'
  }
};

module.exports = Radium(DatePicker);