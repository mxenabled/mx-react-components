const React = require('react');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

class DatePicker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDate: null,
      showCalendar: false
    };
  }

  _shouldBorderCell (cellCount) {
    return cellCount % this.props.calendarColumns !== 0;
  }

  _shouldBorderRow (currentCell, cellCount) {
    const rows = (cellCount / this.props.calendarColumns) - 1;

    return (currentCell / this.props.calendarColumns) < rows;
  }

  _handleDateSelect (date) {
    if (this.props.closeOnDateSelect) {
      this._handleBlur();
    }

    this.props.onDateSelect(date);
  }

  _handlePreviousClick () {
    const selectedDate = moment.unix(this.props.selectedDate).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.startOf('month').subtract(1, 'm'), this.props.format);

    this.setState({
      currentDate
    });
  }

  _handleNextClick () {
    const selectedDate = moment.unix(this.props.selectedDate).locale(this.props.locale);
    let currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;

    currentDate = moment(currentDate.endOf('month').add(1, 'd'), this.props.format);

    this.setState({
      currentDate
    });
  }

  _renderMonthTable (styles, currentDate, selectedDate) {
    const days = [];
    const startDate = moment(currentDate, this.props.format).startOf('month').startOf('week');
    const endDate = moment(currentDate, this.props.format).endOf('month').endOf('week');
    const minimumDate = this.props.minimumDate ? moment(this.props.minimumDate, this.props.format) : null;

    while (startDate.isBefore(endDate)) {
      const isCurrentMonth = startDate.month() === currentDate.month();
      const isCurrentDay = startDate.format(this.props.format) === selectedDate.format(this.props.format);
      const day = startDate.isBefore(minimumDate) ? (
        <div
          key={startDate.month() + '-' + startDate.date()}
          style={styles.calendarDay}
        >
          <div
            key={startDate.format('DDDD')}
            style={[styles.calendarDayContent, styles.calendarDayDisabled]}
          >
            {startDate.date()}
          </div>
        </div>
      ) : (
        <div
          key={startDate.month() + '-' + startDate.date()}
          onClick={this._handleDateSelect.bind(this, startDate.unix())}
          style={[
            styles.calendarDay,
            isCurrentMonth && styles.currentMonth
          ]}
        >
          <div
            key={startDate.format('DDDD')}
            style={[styles.calendarDayContent, isCurrentDay && styles.currentDay]}
          >
            <div style={styles.calendarDayText}>{startDate.date()}</div>
          </div>
        </div>
      );

      days.push(day);
      startDate.add(1, 'd');
    }

    //Divide calendar columns/Rows
    if (this.props.divideCells) {
      for (let i = 0; i < days.length; i++) {
        if (this._shouldBorderCell(i + 1)) {
          days[i].props.style.push(styles.borderRight);
        }

        if (this._shouldBorderRow(i + 1, days.length + 1)) {
          days[i].props.style.push(styles.borderBottom);
        }
      }
    }

    return days;
  }

  _renderScrim (styles) {
    if (this.props.useScrim && this.state.showCalendar) {
      return (
        <div style={[styles.scrim, this.props.scrimStyle]}/>
      );
    }
  }

  _renderSelectedDate (styles) {
    if (this.props.useInputForSelectedDate) {
      return (
        <div>
          <input
            key='input'
            onClick={this._toggleCalendar.bind(this)}
            style={styles.input}
            type='text'
            value={moment.unix(this.props.selectedDate).format(this.props.format)}
          />
          <Icon
            onClick={this._toggleCalendar.bind(this)}
            size='1.75em'
            style={styles.calendarIcon}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
      );
    } else {
      return (
        <div
          key='selectedDate'
          onClick={this._toggleCalendar.bind(this)}
          style={styles.selectedDate}
        >
          {moment.unix(this.props.selectedDate).format(this.props.format)}
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
    } else {
      return (
        <div></div>
      );
    }
  }

  _toggleCalendar () {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  _handleBlur () {
    this.setState({
      showCalendar: false
    });
  }

  render () {
    const selectedDate = moment.unix(this.props.selectedDate).locale(this.props.locale);
    const currentDate = this.state.currentDate ? this.state.currentDate.locale(this.props.locale) : selectedDate;
    const styles = {
      calendar: {
        borderTopColor: '#E5E5E5',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        display: 'none',
        padding: '10px 0'
      },
      calendarDay: {
        color: '#DDDDDD',
        float: 'left',
        paddingBottom: 100/(this.props.calendarColumns + 2) + '%',
        position: 'relative',
        width: 100/(this.props.calendarColumns + 1) + 1 + '%'
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
        padding: '0px 2px 0px 6px'
      },
      calendarDayContent: {
        borderRadius: '0%',
        height: '75%',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        width: '90%',

        ':hover': {
          backgroundColor: '#359BCF',
          color: '#FFFFFF',
          cursor: 'pointer'
        }
      },
      calendarDayText: {
        borderRadius: '100%',
        fontSize: '1em',
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
        borderBottom: '#E5E5E5',
        borderBottomStyle: this.props.divideCells ? 'solid' : 'none',
        borderBottomWidth: '1px',
        fontSize: '1em',
        fontWeight: 'normal',
        padding: '5px 0px 7px 0px',
        position: 'relative',
        textAlign: 'center',
        textTransform: 'normal'
      },
      calendarIcon: {
        color: '#DDDDDD',
        position: 'absolute',
        right: '0.8em',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      calendarShow: {
        display: 'block'
      },
      clearFix: {
        clear: 'both'
      },
      component: {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        fontSize: this.props.fontSize,
        height: '100%',
        WebkitAppearance: 'none',
        width: '100%',

        '@media (max-width: 768px)': {
          fontSize: '0.6em'
        },

        ':focus': {
          boxShadow: 'none',
          outline: 'none'
        }
      },
      componentBottom: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: '3px',
        borderBottomRightRadius: '3px',
        borderColor: '#E5E5E5',
        borderStyle: 'solid',
        borderWidth: '1px 1px 1px 1px',
        boxShadow: '0 30px 30px 10px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        display: 'none',
        marginTop: '10px',
        maxWidth: '300px',
        padding: '0px 0px 0px 0px',
        position: 'absolute',
        width: '100%',
        zIndex: 10
      },
      componentTop: {
        borderBottomWidth: '1px',
        borderColor: '#E5E5E5',
        borderRadius: '3px 3px 3px 3px',
        borderStyle: 'solid',
        borderWidth: '1px 1px 1px 1px',
        position: 'relative',
        padding: '10px 10px 0 10px'
      },
      componentTopOpen: {
        borderBottomWidth: '0',
        borderRadius: '3px 3px 0 0'
      },
      currentDay: {
        backgroundColor: '#359BCF',
        color: '#FFFFFF'
      },
      currentMonth: {
        color: '#000000'
      },
      input: {
        backgroundColor: '#FFFFFF',
        border: 'none',
        fontSize: '1em',
        outline: 'none',
        paddingBottom: '10px',
        WebkitAppearance: 'none',
        width: '80%',

        ':focus': {
          border: 'none',
          boxShadow: 'none',
          outline: 'none'
        }
      },
      navIcon: {
        color: '#000000',
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
        fontSize: '1.2em',
        fontWeight: 'bold',
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
        fontSize: '1em',
        margin: '1px'
      }
    };

    return (
      <div
        onBlur={this._handleBlur.bind(this)}
        style={[styles.component, styles.clearFix]}
        tabIndex='0'
      >
        <div key='componentTop' style={[styles.componentTop, this.state.showCalendar && styles.componentTopOpen]}>
          {this._renderSelectedDate(styles)}
        </div>
        <div key='componentBottom' style={[styles.componentBottom, this.state.showCalendar && styles.calendarShow]}>
          {this._renderTitle(styles)}
          <div key='calendarHeader' style={[styles.calendarHeader, styles.clearFix]}>
            <Icon
              onClick={this._handlePreviousClick.bind(this)}
              size='2em'
              style={[styles.navIcon, styles.navLeft, this.props.divideCells && styles.borderRight]}
              type='caret-left'
            />
            {currentDate.format('MMMM YYYY')}
            <Icon
              onClick={this._handleNextClick.bind(this)}
              size='2em'
              style={[styles.navIcon, styles.navRight, this.props.divideCells && styles.borderLeft]}
              type='caret-right'
            />
          </div>
          <div style={styles.calendarContainer}>
            {this._renderMonthTable(styles, currentDate, selectedDate)}
          </div>
          <div style={styles.clearFix}></div>
        </div>
        {this._renderScrim(styles)}
      </div>
    );
  }
}

DatePicker.propTypes = {
  calendarColumns: React.PropTypes.number,
  closeOnDateSelect: React.PropTypes.bool,
  divideCells: React.PropTypes.bool,
  fontSize: React.PropTypes.string,
  format: React.PropTypes.string,
  locale: React.PropTypes.string,
  minimumDate: React.PropTypes.string,
  onDateSelect: React.PropTypes.func,
  scrimStyle: React.PropTypes.object,
  selectedDate: React.PropTypes.number,
  useInputForSelectedDate: React.PropTypes.bool,
  useScrim: React.PropTypes.bool
};

DatePicker.defaultProps = {
  calendarColumns: 7,
  closeOnDateSelect: false,
  divideCells: false,
  selectedDate: moment().unix(),
  fontSize: '1em',
  format: 'YYYY-MM-DD',
  locale: 'en',
  onDateSelect () {},
  scrimStyle: {},
  title: null,
  useInputForSelectedDate: true,
  useScrim: false
};

module.exports = Radium(DatePicker);