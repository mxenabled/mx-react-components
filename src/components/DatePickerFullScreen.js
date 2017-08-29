const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class DatePickerFullScreen extends React.Component {
  static propTypes = {
    closeIcon: PropTypes.string,
    closeOnDateSelect: PropTypes.bool,
    defaultDate: PropTypes.number,
    format: PropTypes.string,
    inputStyle: PropTypes.object,
    isFixed: PropTypes.bool,
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    placeholderText: PropTypes.string,
    placeholderTextStyle: PropTypes.object,
    selectedDateWrapperStyle: PropTypes.object,
    showDayBorders: PropTypes.bool,
    style: PropTypes.object,
    theme: themeShape,
    title: PropTypes.string,
    useInputForSelectedDate: PropTypes.bool
  };

  static defaultProps = {
    closeIcon: 'close',
    closeOnDateSelect: false,
    format: 'MMM D, YYYY',
    isFixed: false,
    locale: 'en',
    onDateSelect () {},
    showDayBorders: false,
    title: 'Select A Date',
    useInputForSelectedDate: true
  };

  constructor (props) {
    super(props);

    this.state = {
      currentDate: null,
      inputValue: this._getInputValueByDate(props.defaultDate),
      isValid: true,
      selectedDate: props.defaultDate,
      showCalendar: false
    };
  }

  componentDidMount () {
    window.onkeyup = e => {
      if (e.keyCode === 27) {
        this._handleCloseClick();
      }
    };
  }

  _getInputValueByDate = (date) => {
    let inputValue = null;

    if (date) {
      const newDate = moment.unix(date);

      if (newDate.isValid()) {
        inputValue = newDate.format(this.props.format);
      } else {
        inputValue = date;
      }
    }

    return inputValue;
  };

  _getSelectedDate = () => {
    const selectedDate = this.state.selectedDate;

    return selectedDate && moment.unix(selectedDate).isValid() ? this.state.selectedDate : moment().unix();
  };

  _handleCloseClick = () => {
    this.setState({
      showCalendar: false
    });
  };

  _handleDateSelect = (date) => {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.setState({
      inputValue: moment.unix(date).format(this.props.format),
      isValid: true,
      selectedDate: date
    });

    this.props.onDateSelect(date);
  };

  _handleInputBlur = (evt) => {
    if (evt.target.value.length === 0) {
      this.props.onDateSelect(null);

      this.setState({
        inputValue: null,
        selectedDate: null
      });
    } else {
      this.setState({
        inputValue: moment.unix(this.state.selectedDate).format(this.props.format)
      });
    }
  };

  _handleInputChange = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  };

  _handlePreviousClick = () => {
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), this.props.format);

    this.setState({
      currentDate
    });
  };

  _handleNextClick = () => {
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.endOf('month').add(1, 'd'), this.props.format);

    this.setState({
      currentDate
    });
  };

  _handleScrimClick = () => {
    this.setState({
      showCalendar: false
    });
  };

  _toggleCalendar = () => {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  };

  _renderMonthTable = (styles, currentDate, selectedDate) => {
    const days = [];
    const startDate = moment(currentDate, this.props.format).startOf('month').startOf('week');
    const endDate = moment(currentDate, this.props.format).endOf('month').endOf('week');
    const minimumDate = this.props.minimumDate ? moment.unix(this.props.minimumDate) : null;

    while (startDate.isBefore(endDate)) {
      const isCurrentMonth = startDate.month() === currentDate.month();
      const isCurrentDay = startDate.format(this.props.format) === selectedDate.format(this.props.format);
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
            style={[styles.calendarDayContent, noSelectDay ? styles.calendarDayDisabled : isCurrentDay && styles.currentDay]}
          >
            <div style={styles.calendarDayText}>{startDate.date()}</div>
          </div>
        </div>
      );

      if (this.props.showDayBorders) {
        day.props.style.push([styles.borderRight, styles.borderBottom]);
      }

      days.push(day);
      startDate.add(1, 'd');
    }

    return days;
  };

  _renderSelectedDate = (styles, theme) => {
    if (this.props.useInputForSelectedDate) {
      const hidePlaceholder = this.state.inputValue && this.state.inputValue.length;

      return (
        <div>
          <input
            key='input'
            onBlur={this._handleInputBlur}
            onChange={this._handleInputChange}
            onClick={this._toggleCalendar}
            style={[styles.input, this.props.inputStyle, hidePlaceholder && { backgroundColor: theme.Colors.WHITE }]}
            type='text'
            value={this.state.inputValue}
          />
          <div style={[styles.placeholderText, this.props.placeholderTextStyle]}>
            {this.props.placeholderText || 'Select A Date'}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key='selectedDate'
          onClick={this._toggleCalendar}
          style={styles.selectedDate}
        >
          {this.state.inputValue}
        </div>
      );
    }
  };

  _renderTitle = (styles) => {
    if (this.props.title) {
      return (
        <div key='title' style={styles.title}>
          {this.props.title}
        </div>
      );
    } else {
      return null;
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const selectedDate = moment.unix(this._getSelectedDate()).locale(this.props.locale);
    const currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;
    let leftNavIconStyle = Object.assign({}, styles.navIcon, styles.navLeft);
    let rightNavIconStyle = Object.assign({}, styles.navIcon, styles.navRight);

    if (this.props.showDayBorders) {
      leftNavIconStyle = Object.assign(leftNavIconStyle, styles.borderRight);
      rightNavIconStyle = Object.assign(rightNavIconStyle, styles.borderLeft);
    }

    return (
      <div
        className='mx-date-picker-full-screen'
        style={[styles.component, styles.clearFix, this.props.style]}
        tabIndex='0'
      >
        <div
          className='mx-date-picker-full-screen-selected-date'
          key='selectedDateWrapper'
          style={[
            styles.selectedDateWrapper,
            this.props.selectedDateWrapperStyle
          ]}
        >
          {this._renderSelectedDate(styles, theme)}
        </div>
        <div
          className='mx-date-picker-full-screen-calendar-scrim'
          key='calendarModal'
          style={[
            styles.calendarModal,
            this.state.showCalendar && styles.calendarShow,
            this.props.isFixed && { position: 'fixed' }
          ]}
        >
          <div onClick={this._handleCloseClick} style={styles.close}>
            <Icon
              size={20}
              style={styles.closeIcon}
              type={this.props.closeIcon}
            />
            <div style={styles.closeText}>ESC</div>
          </div>
          <div className='mx-date-picker-full-screen-calendar-wrapper' style={styles.calendarWrapper}>
            {this._renderTitle(styles)}
            <div className='mx-date-picker-full-screen-calendar-header' key='calendarHeader' style={[styles.calendarHeader, { borderBottomStyle: this.props.showDayBorders ? 'solid' : 'none' }, styles.clearFix]}>
              <Icon
                elementProps={{
                  onClick: this._handlePreviousClick
                }}
                size={32}
                style={leftNavIconStyle}
                type='caret-left'
              />
              {currentDate.format('MMMM YYYY')}
              <Icon
                elementProps={{
                  onClick: this._handleNextClick
                }}
                size={32}
                style={rightNavIconStyle}
                type='caret-right'
              />
            </div>
            <div style={styles.calendarContainer}>
              {this._renderMonthTable(styles, currentDate, selectedDate)}
            </div>
            <div style={styles.clearFix} />
          </div>
        </div>
      </div>
    );
  }

  styles = (theme) => {
    return {
      calendarDay: {
        color: theme.Colors.GRAY_500,
        float: 'left',
        paddingBottom: '11%',
        position: 'relative',
        width: '13.5%'
      },
      borderBottom: {
        borderBottom: theme.Colors.GRAY_300,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
      },
      borderRight: {
        borderRight: theme.Colors.GRAY_300,
        borderRightStyle: 'solid',
        borderRightWidth: 1
      },
      borderLeft: {
        borderLeft: theme.Colors.GRAY_300,
        borderLeftStyle: 'solid',
        borderLeftWidth: 1
      },
      calendarContainer: {
        width: '100%',
        padding: '0px 2px 10px 6px'
      },
      calendarDayContent: {
        borderRadius: '50%',
        height: 32,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        width: 32,

        ':hover': {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE,
          cursor: 'pointer'
        }
      },
      calendarDayText: {
        borderRadius: '100%',
        fontSize: theme.FontSizes.MEDIUM,
        fontWeight: 'normal',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
      },
      calendarDayDisabled: {
        ':hover': {
          background: 'none',
          color: theme.Colors.GRAY_100
        }
      },
      calendarHeader: {
        color: theme.Colors.GRAY_700,
        borderBottom: theme.Colors.GRAY_300,
        borderBottomWidth: 1,
        fontSize: theme.FontSizes.XLARGE,
        fontWeight: 'normal',
        padding: '5px 0px 7px 0px',
        position: 'relative',
        textAlign: 'center',
        textTransform: 'none'
      },
      calendarIcon: {
        color: theme.Colors.GRAY_100,
        position: 'absolute',
        right: 12.8,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      calendarShow: {
        display: 'block'
      },
      close: {
        position: 'absolute',
        right: 20,
        top: 15,
        textAlign: 'center',
        cursor: 'pointer',
        color: theme.Colors.GRAY_500
      },
      closeIcon: {
        color: theme.Colors.GRAY_500
      },
      closeText: {
        fontSize: theme.FontSizes.TINY
      },
      clearFix: {
        clear: 'both',
        marginBottom: 15
      },
      component: {
        backgroundColor: '#fff',
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.LARGE,
        width: '100%',

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },
      calendarModal: {
        backgroundColor: '#fff',
        bottom: 0,
        display: 'none',
        left: 0,
        margin: 0,
        padding: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 999
      },
      calendarWrapper: {
        height: 300,
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300
      },
      selectedDateWrapper: {
        position: 'relative',
        cursor: 'pointer'
      },
      currentDay: {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE
      },
      currentMonth: {
        color: theme.Colors.GRAY_700
      },
      input: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: theme.FontSizes.MEDIUM,
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
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      navRight: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      placeholderText: {
        color: theme.Colors.GRAY_700,
        fontSize: theme.FontSizes.MEDIUM,
        paddingLeft: 5,
        position: 'absolute',
        top: 10
      },
      selectedDate: {
        color: theme.Colors.GRAY_700,
        cursor: 'pointer',
        fontSize: theme.FontSizes.MEDIUM,
        padding: '5px 0 5px 5px',
        verticalAlign: 'middle',
        width: '100%',

        ':hover': {
          color: theme.Colors.PRIMARY
        }
      },
      title: {
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        fontSize: theme.FontSizes.XXLARGE,
        fontWeight: 'bold',
        padding: '0px 0px 20px 10px'
      }
    };
  }
}

module.exports = Radium(DatePickerFullScreen);
