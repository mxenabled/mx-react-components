const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

const Calendar = require('./Calendar');
const Icon = require('./Icon');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

class DatePicker extends React.Component {
  static propTypes = {
    closeOnDateSelect: PropTypes.bool,
    defaultDate: PropTypes.number,
    format: PropTypes.string,
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    placeholderText: PropTypes.string,
    primaryColor: PropTypes.string,
    selectedDate: PropTypes.number,
    style: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    closeOnDateSelect: false,
    format: 'MMM D, YYYY',
    locale: 'en',
    onDateSelect () {},
    placeholderText: 'Select A Date'
  };

  state = {
    currentDate: this.props.selectedDate || this.props.defaultDate || moment().unix(),
    showCalendar: false
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
    if (this.props.defaultDate) {
      console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
    }
  }

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
  }

  _handleDateSelect = (date) => {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.props.onDateSelect(date);
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

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const styles = this.styles(theme);

    return (
      <div style={styles.component}>
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          <Icon
            size={20}
            style={styles.selectedDateIcon}
            type='calendar'
          />
          <div style={styles.selectedDateText}>
            {(this.props.selectedDate || this.props.defaultDate) ? moment.unix(this.props.selectedDate || this.props.defaultDate).format(this.props.format) : this.props.placeholderText}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
        <div style={styles.calendarWrapper}>
          <Calendar
            onDateSelect={this._handleDateSelect}
            selectedDate={this.state.currentDate}
            style={styles.calendar}
            theme={theme}
          />
        </div>
        {(this.state.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    );
  }

  styles = (theme) => {
    return {
      component: Object.assign({
        backgroundColor: theme.Colors.WHITE,
        borderColor: this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_300,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: theme.Colors.BLACK,
        display: 'inline-block',
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        position: 'relative',
        width: '100%'
      }, this.props.style),
      calendar: {
        boxShadow: theme.ShadowHigh
      },
      calendarWrapper: {
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'block' : 'none',
        position: 'absolute',
        right: 0,
        width: 287,
        zIndex: 10
      },

      // Selected Date styles
      selectedDateWrapper: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 15px',
        position: 'relative'
      },
      selectedDateIcon: {
        fill: theme.Colors.PRIMARY,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedDate || this.props.defaultDate) ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500,
        flex: 1
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_500
      },
      scrim: {
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9
      }
    };
  };
}

module.exports = Radium(DatePicker);
