const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class DatePickerFullScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: moment().unix(),
      selectedDate: this.props.defaultDate,
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

  _handleCloseClick () {
    this.setState({
      showCalendar: false
    });
  }

  _handleDateSelect (selectedDate) {
    const updatedState = {
      selectedDate
    };

    if (this.props.closeOnDateSelect) {
      updatedState.showCalendar = false;
    }

    this.setState(updatedState);

    this.props.onDateSelect(selectedDate);
  }

  _handlePreviousClick () {
    this.setState({
      currentDate: moment.unix(this.state.currentDate).locale(this.props.locale).startOf('month').subtract(1, 'm').unix()
    });
  }

  _handleNextClick () {
    this.setState({
      currentDate: moment.unix(this.state.currentDate).locale(this.props.locale).endOf('month').add(1, 'd').unix()
    });
  }

  _toggleCalendar () {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  _renderMonthTable () {
    const days = [];
    const startDate = moment(this.state.currentDate).startOf('month').startOf('week');
    const endDate = moment(this.state.currentDate).endOf('month').endOf('week');

    while (startDate.isBefore(endDate)) {
      const isCurrentMonth = startDate.month() === moment(this.state.currentDate).month();
      const isCurrentDay = startDate.format(this.props.format) === moment(this.state.selectedDate).format(this.props.format);
      const active = this.props.minimumDate ? startDate.isAfter(moment.unix(this.props.minimumDate)) : true;

      days.push((
        <div
          key={startDate.format('DDDD')}
          onClick={active ? this._handleDateSelect.bind(this, startDate.unix()) : null}
          style={[
            styles.dayContent,
            isCurrentMonth && styles.currentMonth,
            isCurrentDay && styles.currentDay,
            active && styles.dayActive
          ]}
        >
          {startDate.date()}
        </div>
      ));

      startDate.add(1, 'd');
    }

    return days;
  }

  render () {
    return (
      <div className='mx-date-picker-full-screen' style={[styles.component, this.props.style]}>
        <div key='selectedDate' onClick={this._toggleCalendar.bind(this)} style={[styles.placeholder, this.state.selectedDate && styles.selectedDate]}>
          {this.state.selectedDate ? moment.unix(this.state.selectedDate).locale(this.props.locale).format(this.props.format) : 'Select A Date'}
        </div>
        {this.state.showCalendar ? (
          <div className='mx-date-picker-full-screen-calendar-scrim' key='modal' style={[styles.modal, this.props.isFixed && { position: 'fixed' }]}>
            <div onClick={this._handleCloseClick.bind(this)} style={styles.close}>
              <Icon size={20} style={styles.closeIcon} type={this.props.closeIcon} />
              <div style={styles.closeText}>ESC</div>
            </div>
            <div className='mx-date-picker-full-screen-calendar-wrapper' style={styles.calendarWrapper}>
              {this.props.title ? (
                <div key='title' style={styles.title}>
                  {this.props.title}
                </div>
              ) : null }
              <div className='mx-date-picker-full-screen-calendar-header' key='header' style={styles.header}>
                <Icon
                  onClick={this._handlePreviousClick.bind(this)}
                  size='32px'
                  style={styles.navIcon}
                  type='caret-left'
                />
                {moment.unix(this.state.currentDate).format('MMMM YYYY')}
                <Icon
                  onClick={this._handleNextClick.bind(this)}
                  size='32px'
                  style={[styles.navIcon, styles.navRight]}
                  type='caret-right'
                />
              </div>
              <div style={styles.calendar}>
                {this._renderMonthTable()}
              </div>
              <div onClick={this._handleDateSelect.bind(this, null)} style={styles.clearButton}>Clear Date</div>
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

DatePickerFullScreen.propTypes = {
  closeIcon: React.PropTypes.string,
  closeOnDateSelect: React.PropTypes.bool,
  defaultDate: React.PropTypes.number,
  format: React.PropTypes.string,
  isFixed: React.PropTypes.bool,
  locale: React.PropTypes.string,
  minimumDate: React.PropTypes.number,
  onDateSelect: React.PropTypes.func,
  placeholderText: React.PropTypes.string,
  placeholderTextStyle: React.PropTypes.object,
  style: React.PropTypes.object,
  title: React.PropTypes.string
};

DatePickerFullScreen.defaultProps = {
  closeIcon: 'close',
  closeOnDateSelect: false,
  format: 'MMM D, YYYY',
  isFixed: false,
  locale: 'en',
  onDateSelect () {},
  placeholderText: 'Select A Date',
  title: 'Select A Date'
};

const styles = {
  component: {
    backgroundColor: '#fff',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    width: '100%',

    ':focus': {
      boxShadow: 'none',
      outline: 'none'
    }
  },
  placeholder: {
    color: StyleConstants.Colors.ASH,
    fontSize: StyleConstants.FontSizes.LARGE
  },
  selectedDate: {
    color: StyleConstants.Colors.CHARCOAL,
    cursor: 'pointer',
    fontSize: StyleConstants.FontSizes.LARGE,
    verticalAlign: 'middle',
    width: '100%',

    ':hover': {
      color: StyleConstants.Colors.BLUE
    }
  },
  modal: {
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    margin: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  title: {
    boxSizing: 'border-box',
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 600,
    padding: '0 10px 20px'
  },
  calendarWrapper: {
    maxHeight: 300,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  header: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XLARGE,
    fontWeight: 'normal',
    padding: '5px 0px 7px 0px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'none'
  },
  navIcon: {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  navRight: {
    right: '0',
    left: 'auto'
  },
  calendar: {
    width: '100%',
    padding: '0px 2px 10px 6px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  dayContent: {
    color: StyleConstants.Colors.ASH,
    borderRadius: '100%',
    height: 32,
    lineHeight: '32px',
    width: 32,
    marginTop: 10,
    textAlign: 'center',
    fontSize: StyleConstants.FontSizes.MEDIUM
  },
  dayActive: {
    cursor: 'pointer',

    ':hover': {
      backgroundColor: StyleConstants.Colors.BLUE,
      color: StyleConstants.Colors.INVERSE_PRIMARY
    }
  },
  currentDay: {
    backgroundColor: StyleConstants.Colors.BLUE,
    color: StyleConstants.Colors.INVERSE_PRIMARY
  },
  currentMonth: {
    color: StyleConstants.Colors.CHARCOAL
  },
  clearButton: {
    fontSize: StyleConstants.FontSizes.LARGE,
    backgroundColor: StyleConstants.Colors.FOG,
    color: StyleConstants.Colors.CHARCOAL,
    fontWeight: 500,
    padding: '7px 14px',
    borderRadius: 2,
    textAlign: 'center',
    cursor: 'pointer'
  }
};

module.exports = Radium(DatePickerFullScreen);