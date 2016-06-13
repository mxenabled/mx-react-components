const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Calendar = require('./Calendar');
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
    selectedDate: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      closeOnDateSelect: false,
      format: 'MMM D, YYYY',
      locale: 'en',
      onDateSelect () {},
      placeholderText: 'Select A Date',
      primaryColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {
      currentDate: this.props.selectedDate || this.props.defaultDate || moment().unix(),
      showCalendar: false
    };
  },

  componentDidMount () {
    if (this.props.defaultDate) {
      console.warn('WARNING: defaultDate has been replaced with selectedDate and will be removed in a future release. Check usage of ' + this.constructor.displayName + '.');
    }
  },

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
  },

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleScrimClick();
    }

    this.props.onDateSelect(date);
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

  render () {
    const styles = this.styles();

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
          />
        </div>
        {(this.state.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    );
  },

  styles () {
    return {
      component: Object.assign({
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        position: 'relative',
        width: '100%'
      }, this.props.style),
      calendar: {
        boxShadow: StyleConstants.ShadowHigh
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
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedDate || this.props.defaultDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
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
  }
});

module.exports = Radium(DatePicker);
