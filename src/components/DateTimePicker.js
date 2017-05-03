const PropTypes = require('prop-types');
const React = require('react');
const moment = require('moment-timezone/builds/moment-timezone-with-data.min');

const Calendar = require('./Calendar');
const Column = require('./grid/Column');
const Container = require('./grid/Container');
const Icon = require('./Icon');
const Row = require('./grid/Row');

const StyleConstants = require('../constants/Style');

const MAX_HOUR = 23;
const MAX_MINUTE = 59;

class DatePicker extends React.Component {
  static propTypes = {
    calendarStyle: PropTypes.object,
    closeOnDateSelect: PropTypes.bool,
    dateFormat: PropTypes.string,
    dateIcon: PropTypes.string,
    datePlaceholder: PropTypes.string,
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    primaryColor: PropTypes.string,
    selectedDate: PropTypes.number,
    showIcons: PropTypes.bool,
    styles: PropTypes.object,
    timeFormat: PropTypes.string,
    timeIcon: PropTypes.string,
    timePlaceholder: PropTypes.string,
    timezone: PropTypes.string,
    timezoneFormat: PropTypes.oneOf(['abbr', 'name']),
    timezoneNames: PropTypes.object
  };

  static defaultProps = {
    closeOnDateSelect: true,
    dateFormat: 'MMM D, YYYY',
    dateIcon: 'calendar',
    datePlaceholder: 'Select a Date',
    locale: 'en',
    onDateSelect () {},
    primaryColor: StyleConstants.Colors.PRIMARY,
    showIcons: true,
    timeFormat: 'LT',
    timeIcon: 'clock',
    timePlaceholder: 'Select a Time',
    timezone: moment.tz.guess(),
    timezoneNames: {
      EST: 'Eastern Standard Time',
      EDT: 'Eastern Daylight Time',
      CST: 'Central Standard Time',
      CDT: 'Central Daylight Time',
      MST: 'Mountain Standard Time',
      MDT: 'Mountain Daylight Time',
      PST: 'Pacific Standard Time',
      PDT: 'Pacific Daylight Time'
    }
  };

  state = {
    showCalendar: false,
    editTime: false
  };

  _handleDateBlur = () => {
    this.setState({
      showCalendar: false
    });
  };

  _handleDateFocus = () => {
    this.setState({
      showCalendar: true
    });
  };

  _handleDateSelect = (date, e) => {
    e.stopPropagation();

    if (this.props.closeOnDateSelect) {
      this.dateSelect.blur();

      this.setState({
        showCalendar: false
      });
    }

    const hour = this.props.selectedDate ? moment.unix(this.props.selectedDate).hour() : 0;
    const minutes = this.props.selectedDate ? moment.unix(this.props.selectedDate).minute() : 0;

    this.props.onDateSelect(moment.unix(date).hour(hour).minute(minutes).seconds(0).unix());
  };

  _handleTimeBlur = () => {
    this.setState({
      editTime: false
    });
  };

  _handleTimeFocus = () => {
    this.setState({
      editTime: true
    });
  };

  _handleTimeSelect = (e) => {
    const selectedDate = this.props.selectedDate ? moment.unix(this.props.selectedDate) : moment();
    const value = e.target.value.toLowerCase().replace('.', '');

    const time = value.split(':');
    const am = value.indexOf('am') >= 0;
    const pm = value.indexOf('pm') >= 0;
    const minute = Number(time[1].substring(0, 2));
    let hour = Number(time[0]);

    hour = am && hour === 12 ? 0 : hour;
    hour = pm && hour !== 12 ? hour + 12 : hour;

    if (hour > MAX_HOUR || minute > MAX_MINUTE) {
      e.value.target = '';
    } else {
      this.setState({
        editTime: false
      });
      const date = selectedDate.hour(hour).minute(minute).second(0).unix();

      this.props.onDateSelect(date);
    }
  };

  _getTimezone = (date) => {
    const timezoneAbbr = date ? moment.unix(date).tz(this.props.timezone).format('z') : moment().tz(this.props.timezone).format('z');

    if (this.props.timezoneFormat === 'name') {
      return this.props.timezoneNames[timezoneAbbr] || timezoneAbbr;
    } else if (this.props.timezoneFormat === 'abbr') {
      return timezoneAbbr;
    } else {
      return null;
    }
  };

  render () {
    const styles = this.styles();
    const spans = this.spans();

    return (
      <Container fluid={true}>
        <Row>
          <Column span={spans.date}>
            <div
              onBlur={this._handleDateBlur}
              onClick={this._handleDateClick}
              onFocus={this._handleDateFocus}
              ref={(ref) => this.dateSelect = ref}
              style={Object.assign({}, styles.selectWrapper, this.state.showCalendar ? styles.activeSelectWrapper : null)}
              tabIndex={0}
            >
              {this.props.showIcons ? (
                <Icon
                  size={20}
                  style={styles.selectedIcon}
                  type={this.props.dateIcon}
                />
              ) : null}
              <div style={styles.selectedText}>
                {this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.dateFormat) : this.props.datePlaceholder}
              </div>
              <Icon
                size={20}
                style={styles.selectedDateCaret}
                type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
              />
              <div style={styles.calendarWrapper}>
                <Calendar
                  {...this.props}
                  onDateSelect={this._handleDateSelect}
                  style={styles.calendar}
                />
              </div>
            </div>
          </Column>
          {this.props.children ? (
            <Column span={spans.children}>
              <div style={styles.children}>
                {this.props.children}
              </div>
            </Column>
          ) : null}
          <Column span={spans.time}>
            <div
              onBlur={this._handleTimeBlur}
              onFocus={this._handleTimeFocus}
              style={Object.assign({}, styles.selectWrapper, this.state.editTime ? styles.activeSelectWrapper : null)}
              tabIndex={0}
            >
              {this.props.showIcons ? (
                <Icon
                  size={20}
                  style={styles.selectedIcon}
                  type={this.props.timeIcon}
                />
              ) : null}
              {this.state.editTime ? (
                <input
                  autoFocus={true}
                  defaultValue={this.state.editTime ? moment.unix(this.props.selectedDate).format('HH:mm') : null}
                  name='time'
                  onBlur={this._handleTimeSelect}
                  style={styles.timeInput}
                  type='time'
                />
              ) : (
                <div style={styles.timeDisplay}>
                  {this.props.selectedDate ? moment.unix(this.props.selectedDate).format(this.props.timeFormat) : this.props.timePlaceholder}
                </div>
              )}
              {this.props.timezoneFormat ? (
                <div style={styles.timezone}>
                  {this._getTimezone(this.props.selectedDate)}
                </div>
              ) : null}
            </div>
          </Column>
        </Row>
      </Container>
    );
  }

  spans = () => {
    return {
      date: {
        large: this.props.children ? 5 : 6,
        medium: this.props.children ? 5 : 6,
        small: 12
      },

      children: {
        large: 1,
        medium: 1,
        small: 12
      },

      time: {
        large: 6,
        medium: 6,
        small: 12
      }
    };
  };

  styles = () => {
    return Object.assign({}, {
      children: {
        textAlign: 'center'
      },

      // Select styles
      selectWrapper: {
        alignItems: 'center',
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: 'none',
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        cursor: 'pointer',
        display: 'flex',
        flex: '1 0 0%',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none',
        padding: '10px 15px',
        position: 'relative'
      },
      activeSelectWrapper: {
        borderColor: this.props.primaryColor
      },
      selectedIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedText: {
        color: this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      // Time Styles
      timeInput: {
        border: 'none',
        boxShadow: 'none',
        flex: 1,
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        outline: 'none'
      },
      timeDisplay: {
        color: this.props.selectedDate ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH,
        flex: 1,
        lineHeight: '1.55em'
      },
      timezone: {
        color: StyleConstants.Colors.ASH,
        paddingLeft: 10,
        textAlign: 'right'
      },

      //Calendar Styles
      calendarWrapper: {
        display: this.state.showCalendar ? 'block' : 'none'
      },
      calendar: Object.assign({}, {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        padding: 20,
        position: 'absolute',
        right: 0,
        top: 50,
        width: 287,
        zIndex: 10
      }, this.props.calendarStyle)
    }, this.props.styles);
  };
}

module.exports = DatePicker;
