const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const Column = require('../components/grid/Column');
const Container = require('../components/grid/Container');
const Row = require('../components/grid/Row');

const StyleConstants = require('../constants/Style');

const DefaultRanges = require('./DateRangePicker/DefaultRanges');
const MonthTable = require('./DateRangePicker/MonthTable');
const MonthSelector = require('./DateRangePicker/MonthSelector');
const YearSelector = require('./DateRangePicker/YearSelector');
const SelectionPane = require('./DateRangePicker/SelectionPane');


class DateRangePicker extends React.Component {
  static propTypes = {
    closeCalendarOnRangeSelect: PropTypes.bool,
    defaultRanges: PropTypes.arrayOf(PropTypes.shape({
      displayValue: PropTypes.string,
      endDate: PropTypes.number,
      startDate: PropTypes.number
    })),
    format: PropTypes.string,
    isRelative: PropTypes.bool,
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onDateSelect: PropTypes.func,
    placeholderText: PropTypes.string,
    primaryColor: PropTypes.string,
    selectedEndDate: PropTypes.number,
    selectedStartDate: PropTypes.number,
    showDefaultRanges: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    closeCalendarOnRangeSelect: false,
    defaultRanges: [
      {
        displayValue: 'Today',
        endDate: moment().endOf('day').unix(),
        startDate: moment().startOf('day').unix()
      },
      {
        displayValue: 'This Month',
        endDate: moment().endOf('month').unix(),
        startDate: moment().startOf('month').unix()
      },
      {
        displayValue: 'Last Month',
        endDate: moment().subtract(1, 'months').endOf('month').unix(),
        startDate: moment().subtract(1, 'months').startOf('month').unix()
      },
      {
        displayValue: 'Last 7 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(6, 'days').startOf('day').unix()
      },
      {
        displayValue: 'Last 30 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(29, 'days').startOf('day').unix()
      },
      {
        displayValue: 'Last 90 Days',
        endDate: moment().endOf('day').unix(),
        startDate: moment().subtract(89, 'days').startOf('day').unix()
      }
    ],
    format: 'MMM D, YYYY',
    isRelative: true,
    locale: 'en',
    onDateSelect () {},
    placeholderText: 'Select A Date Range',
    primaryColor: StyleConstants.Colors.PRIMARY,
    showDefaultRanges: false
  };

  state = {
    currentDate: this.props.selectedEndDate || moment().unix(),
    selectedBox: 'from',
    showCalendar: false
  };

  // componentWillReceiveProps (newProps) {
  //   const isUpdatedSelectedEndDate = newProps.selectedEndDate && newProps.selectedEndDate !== this.props.selectedEndDate;
  //   const isUpdatedSelectedStartDate = newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate;
  //
  //   if (isUpdatedSelectedEndDate || isUpdatedSelectedStartDate) {
  //     this.setState({
  //       currentDate: newProps.selectedEndDate ? newProps.selectedEndDate : newProps.selectedStartDate
  //     });
  //   }
  // }

  _getDateFormat = () => {
    return this._isLargeOrMediumWindowSize() ? this.props.format : 'MMM D';
  };

  _isLargeOrMediumWindowSize = () => {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  };

  _endDateIsBeforeStartDate = (startDate, endDate) => {
    return moment.unix(endDate).isBefore(moment.unix(startDate));
  };

  _handleDateSelect = (date) => {
    console.log('_hds date', moment.unix(date).format('MMM D, YYYY'))
    this.setState({
      currentDate: date
    })
    let endDate = this.props.selectedEndDate;
    let startDate = this.props.selectedStartDate;
    // const existingRangeComplete = this.props.selectedStartDate && this.props.selectedEndDate;
    // const existingRangeEmpty = !this.props.selectedStartDate && !this.props.selectedEndDate;
    //
    // if (existingRangeComplete || existingRangeEmpty) {
    //   startDate = date;
    //   endDate = null;
    // } else {
    //   startDate = this.props.selectedStartDate;
    //   endDate = date;
    // }

    if (this.state.selectedBox === 'from') {
      startDate = date;
    }

    if (this.state.selectedBox === 'to') {
      endDate = date;
    }

    const modifiedRangeCompleteButDatesInversed = startDate && endDate && this._endDateIsBeforeStartDate(startDate, endDate);

    if (modifiedRangeCompleteButDatesInversed) {
      this.props.onDateSelect(endDate, startDate);
    } else {
      this.props.onDateSelect(startDate, endDate);
    }

    if (startDate && endDate && this.props.closeCalendarOnRangeSelect) {
      this._handleScrimClick();
    }
  };

  _handleDefaultRangeSelection = (range) => {
    this.props.onDateSelect(range.startDate, range.endDate, range.displayValue);

    if (this.props.closeCalendarOnRangeSelect) {
      this._handleScrimClick();
    }
  };

  _handleDateHover = (activeSelectDate) => {
    this.setState({
      activeSelectDate
    });
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

  _isInActiveRange = (selectedStart, selectedEnd, active, date) => {
    const start = selectedStart || active;
    const end = selectedEnd || active;

    let isActive;

    if (start < end) {
      isActive = date.isSameOrAfter(moment.unix(start)) && date.isSameOrBefore(moment.unix(end));
    } else {
      isActive = date.isSameOrBefore(moment.unix(start)) && date.isSameOrAfter(moment.unix(end));
    }

    return isActive;
  };

  _getDateRangePosition = (selectedStart, selectedEnd, active, date) => {
    const start = selectedStart || active;
    const end = selectedEnd || active;

    let where;

    if (start < end) {
      if (date.isSame(moment.unix(start))) {
        where = 'Start';
      } else if (date.isSame(moment.unix(end))) {
        where = 'End';
      }
    } else if (start > end) {
      if (date.isSame(moment.unix(start))) {
        where = 'End';
      } else if (date.isSame(moment.unix(end))) {
        where = 'Start';
      }
    }

    return where;
  };

  render () {
    const styles = this.styles();
    const spans = this.spans();

    return (
      <div style={styles.component}>
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          <Icon
            size={20}
            style={styles.selectedDateIcon}
            type='calendar'
          />
          <div style={styles.selectedDateText}>
            {this.props.selectedStartDate && this.props.selectedEndDate ? (
              <div>
                <span>{moment.unix(this.props.selectedStartDate).format(this._getDateFormat())}</span>
                <span> - </span>
                <span>{moment.unix(this.props.selectedEndDate).format(this._getDateFormat())}</span>
              </div>
            ) : this.props.placeholderText}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>
        <Container>
          <Row>
            <div style={styles.optionsWrapper}>
              {this._isLargeOrMediumWindowSize() && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <SelectionPane
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      handleFromClick={(date, selectedBox) => {
                        debugger;
                        this.setState({ currentDate: date || moment().unix(), selectedBox });
                      }}
                      isLargeOrMediumWindowSize={this._isLargeOrMediumWindowSize()}
                      primaryColor={this.props.primaryColor}
                      selectedBox={this.state.selectedBox}
                      selectedEndDate={this.props.selectedEndDate}
                      selectedStartDate={this.props.selectedStartDate}
                      styles={styles}
                    />
                  }
                </Column>
              )}
              <Column span={spans.calendar}>
                <div style={styles.calendarWrapper}>
                  <div style={styles.calendarHeader}>
                    <MonthSelector currentDate={this.state.currentDate} setCurrentDate={(currentDate) => this.setState({ currentDate })} />
                    <YearSelector currentDate={this.state.currentDate} setCurrentDate={(currentDate) => this.setState({ currentDate })} />
                  </div>
                  <div style={styles.calendarWeek}>
                    {[{ label: 'S', value: 'Sunday' },
                      { label: 'M', value: 'Monday' },
                      { label: 'T', value: 'Tuesday' },
                      { label: 'W', value: 'Wednesday' },
                      { label: 'T', value: 'Thursday' },
                      { label: 'F', value: 'Friday' },
                      { label: 'S', value: 'Saturday' }].map((day) => {
                        return (
                          <div key={day.value} style={styles.calendarWeekDay}>
                            {day.label}
                          </div>
                        );
                      })}
                  </div>
                  <MonthTable
                    activeSelectDate={this.state.activeSelectDate}
                    currentDate={this.state.currentDate}
                    getDateRangePosition={this._getDateRangePosition}
                    handleDateHover={this._handleDateHover}
                    handleDateSelect={this._handleDateSelect}
                    isInActiveRange={this._isInActiveRange}
                    minimumDate={this.props.minimumDate}
                    selectedEndDate={this.props.selectedEndDate}
                    selectedStartDate={this.props.selectedStartDate}
                    styles={styles}
                  />
                </div>
              </Column>
              {!this._isLargeOrMediumWindowSize() && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <DefaultRanges
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      primaryColor={this.props.primaryColor}
                      styles={styles}
                    />
                  }
                </Column>
              )}
            </div>
          </Row>
        </Container>
        {(this.state.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    );
  }

  spans = () => {
    return {
      calendar: {
        large: this.props.showDefaultRanges ? 6 : 12,
        medium: this.props.showDefaultRanges ? 6 : 12,
        small: 12
      },
      defaultRanges: {
        large: this.props.showDefaultRanges ? 6 : 0,
        medium: this.props.showDefaultRanges ? 6 : 0,
        small: this.props.showDefaultRanges ? 12 : 0
      }
    };
  };

  styles = () => {
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();

    return {
      component: Object.assign({
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '10px 15px',
        position: this.props.isRelative && window.innerWidth > 450 ? 'relative' : 'static',
        width: '100%'
      }, this.props.style),

      // Selected Date styles
      selectedDateWrapper: {
        alignItems: 'center',
        display: 'flex',
        height: 20,
        justifyContent: 'space-between'
      },
      selectedDateIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedStartDate && this.props.selectedEndDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
      },

      //Calendar Styles
      optionsWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'flex' : 'none',
        flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
        justifyContent: 'center',
        marginTop: isLargeOrMediumWindowSize ? 10 : 5,
        padding: StyleConstants.Spacing.SMALL,
        position: 'absolute',
        left: this.props.isRelative && window.innerWidth > 450 ? 'auto' : 0,
        right: 0,
        maxWidth: 650,
        width: window.innerWidth,
        zIndex: 10
      },
      calendarWrapper: {
        boxSizing: 'border-box',
        padding: isLargeOrMediumWindowSize ? 20 : 10,
        margin: 'auto',
        maxWidth: 250,
        width: isLargeOrMediumWindowSize ? 250 : '100%'
      },

      //Calendar Header
      calendarHeader: {
        alignItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.LARGE,
        height: 30,
        justifyContent: 'space-between',
        marginBottom: 15,
        position: 'relative',
        textAlign: 'center'
      },

      //Calendar week
      calendarWeek: {
        alignItems: 'center',
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        height: 30,
        justifyContent: 'center',
        marginBottom: 2
      },
      calendarWeekDay: {
        textAlign: 'center',
        width: 30
      },

      //Calendar table
      calendarTable: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      calendarDay: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: StyleConstants.Colors.FOG,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 30,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
        }
      },
      calendarDayDisabled: {
        color: StyleConstants.Colors.FOG,

        ':hover': {
          // cursor: 'default', why is this here?
          border: 'none'
        }
      },
      today: {
        backgroundColor: StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.WHITE
      },
      currentMonth: {
        color: StyleConstants.Colors.CHARCOAL
      },

      //Selected and Selecting Range
      selectedDay: {
        backgroundColor: this.props.primaryColor,
        color: StyleConstants.Colors.WHITE
      },
      betweenDay: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.5),
        borderRadius: 0,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
        }
      },

      //Scrim
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

module.exports = Radium(DateRangePicker);
