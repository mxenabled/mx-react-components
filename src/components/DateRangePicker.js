const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const moment = require('moment');

const Icon = require('./Icon');

const Column = require('../components/grid/Column');
const Container = require('../components/grid/Container');
const Row = require('../components/grid/Row');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

const DefaultRanges = Radium(({ defaultRanges, handleDefaultRangeSelection, primaryColor, selectedStartDate, selectedEndDate, styles }) => (
  <div style={styles.rangeOptions}>
    <div style={Object.assign({}, styles.defaultRangesTitle, { color: primaryColor })}>
      Select a Range
    </div>
    {defaultRanges.map(range => (
      <div key={range.displayValue + range.startDate} onClick={handleDefaultRangeSelection.bind(null, range)} style={styles.rangeOption}>
        <div>
          <Icon
            size={20}
            style={Object.assign({}, styles.rangeOptionIcon, {
              fill: range.startDate === selectedStartDate && range.endDate === selectedEndDate ? primaryColor : 'transparent'
            })}
            type='check-solid'
          />
        </div>
        <div>
          {range.displayValue}
        </div>
      </div>
    ))}
  </div>
));

DefaultRanges.propTypes = {
  defaultRanges: PropTypes.array,
  handleDefaultRangeSelection: PropTypes.func,
  primaryColor: PropTypes.string,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.shape({
    defaultRangesTitle: PropTypes.object,
    rangeOption: PropTypes.object,
    rangeOptions: PropTypes.object
  })
};

const MonthTable = ({
  activeSelectDate,
  currentDate,
  getDateRangePosition,
  handleDateHover,
  handleDateSelect,
  isInActiveRange,
  minimumDate,
  selectedEndDate,
  selectedStartDate,
  styles
}) => {
  const days = [];
  let startDate = moment.unix(currentDate).startOf('month').startOf('week');
  const endDate = moment.unix(currentDate).endOf('month').endOf('week');

  while (moment(startDate).isBefore(endDate)) {
    const disabledDay = minimumDate && startDate.isBefore(moment.unix(minimumDate));
    const isActiveRange = (selectedStartDate || selectedEndDate) ?
      isInActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate) :
      false;
    const whereInRange = getDateRangePosition(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
    const isSelectedDay = startDate.isSame(moment.unix(selectedStartDate), 'day') || startDate.isSame(moment.unix(selectedEndDate), 'day');

    const day = (
      <div
        key={startDate}
        onClick={!disabledDay && handleDateSelect.bind(null, startDate.unix())}
        onMouseEnter={!disabledDay && handleDateHover.bind(null, startDate.unix())}
        style={Object.assign({},
          styles.calendarDay,
          startDate.isSame(moment.unix(currentDate), 'month') && styles.currentMonth,
          disabledDay && styles.calendarDayDisabled,
          (startDate.isSame(moment(), 'day') && !isActiveRange) && styles.today,
          isActiveRange && Object.assign({}, styles.betweenDay, styles['betweenDay' + whereInRange]),
          isSelectedDay && Object.assign({}, styles.selectedDay, styles['selected' + whereInRange])
        )}
      >
        {startDate.date()}
      </div>
    );

    days.push(day);
    startDate = startDate.add(1, 'd');
  }

  return (<div style={styles.calendarTable}>{days}</div>);
};

MonthTable.propTypes = {
  activeSelectDate: PropTypes.number,
  currentDate: PropTypes.number,
  getDateRangePosition: PropTypes.func,
  handleDateHover: PropTypes.func,
  handleDateSelect: PropTypes.func,
  isInActiveRange: PropTypes.func,
  minimumDate: PropTypes.number,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.object
};

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
    style: PropTypes.object,
    theme: themeShape
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
    showDefaultRanges: false
  };

  state = {
    currentDate: this.props.selectedEndDate || moment().unix(),
    showCalendar: false
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  componentWillReceiveProps (newProps) {
    const isUpdatedSelectedEndDate = newProps.selectedEndDate && newProps.selectedEndDate !== this.props.selectedEndDate;
    const isUpdatedSelectedStartDate = newProps.selectedStartDate && newProps.selectedStartDate !== this.props.selectedStartDate;

    if (isUpdatedSelectedEndDate || isUpdatedSelectedStartDate) {
      this.setState({
        currentDate: newProps.selectedEndDate ? newProps.selectedEndDate : newProps.selectedStartDate
      });
    }
  }

  _getDateFormat = (isLargeOrMediumWindowSize) => {
    return isLargeOrMediumWindowSize ? this.props.format : 'MMM D';
  };

  _isLargeOrMediumWindowSize = (theme) => {
    const windowSize = StyleUtils.getWindowSize(theme.BreakPoints);

    return windowSize === 'large' || windowSize === 'medium';
  };

  _endDateIsBeforeStartDate = (startDate, endDate) => {
    return moment.unix(endDate).isBefore(moment.unix(startDate));
  };

  _handleDateSelect = (date) => {
    let endDate;
    let startDate;
    const existingRangeComplete = this.props.selectedStartDate && this.props.selectedEndDate;
    const existingRangeEmpty = !this.props.selectedStartDate && !this.props.selectedEndDate;

    if (existingRangeComplete || existingRangeEmpty) {
      startDate = date;
      endDate = null;
    } else {
      startDate = this.props.selectedStartDate;
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
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);
    const styles = this.styles(theme, isLargeOrMediumWindowSize);
    const spans = this.spans();
    const shouldShowCalendarIcon = StyleUtils.getWindowSize(theme.BreakPoints) !== 'small';

    return (
      <div style={styles.component}>
        <div onClick={this._toggleCalendar} style={styles.selectedDateWrapper}>
          {shouldShowCalendarIcon ? (
            <Icon
              size={20}
              style={styles.selectedDateIcon}
              type='calendar'
            />
          ) : null}
          <div style={styles.selectedDateText}>
            {this.props.selectedStartDate && this.props.selectedEndDate ? (
              <div>
                <span>{moment.unix(this.props.selectedStartDate).format(this._getDateFormat(isLargeOrMediumWindowSize))}</span>
                <span> - </span>
                <span>{moment.unix(this.props.selectedEndDate).format(this._getDateFormat(isLargeOrMediumWindowSize))}</span>
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
              {isLargeOrMediumWindowSize && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <DefaultRanges
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      primaryColor={theme.Colors.PRIMARY}
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
                    <Icon
                      elementProps={{
                        onClick: this._handlePreviousClick
                      }}
                      size={20}
                      style={styles.calendarHeaderNav}
                      type='caret-left'
                    />
                    <div>
                      {moment.unix(this.state.currentDate).format('MMMM YYYY')}
                    </div>
                    <Icon
                      elementProps={{
                        onClick: this._handleNextClick
                      }}
                      size={20}
                      style={styles.calendarHeaderNav}
                      type='caret-right'
                    />
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
              {!isLargeOrMediumWindowSize && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <DefaultRanges
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      primaryColor={theme.Colors.PRIMARY}
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
        large: this.props.showDefaultRanges ? 8 : 12,
        medium: this.props.showDefaultRanges ? 8 : 12,
        small: 12
      },
      defaultRanges: {
        large: this.props.showDefaultRanges ? 4 : 0,
        medium: this.props.showDefaultRanges ? 4 : 0,
        small: this.props.showDefaultRanges ? 12 : 0
      }
    };
  };

  styles = (theme, isLargeOrMediumWindowSize) => {
    return {
      component: Object.assign({
        backgroundColor: theme.Colors.WHITE,
        borderColor: this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_300,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_900,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
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
        fill: theme.Colors.PRIMARY,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedStartDate && this.props.selectedEndDate) ? theme.Colors.GRAY_700 : theme.Colors.GRAY_500
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? theme.Colors.PRIMARY : theme.Colors.GRAY_500
      },

      //Calendar Styles
      optionsWrapper: {
        backgroundColor: theme.Colors.WHITE,
        border: '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        boxShadow: theme.ShadowHigh,
        boxSizing: 'border-box',
        display: this.state.showCalendar ? 'flex' : 'none',
        flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
        justifyContent: 'center',
        marginTop: isLargeOrMediumWindowSize ? 10 : 5,
        position: 'absolute',
        left: this.props.isRelative && window.innerWidth > 450 ? 'auto' : 0,
        right: 0,
        maxWidth: 450,
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
        color: theme.Colors.GRAY_700,
        display: 'flex',
        fontSize: theme.FontSizes.LARGE,
        height: 30,
        justifyContent: 'space-between',
        marginBottom: 15,
        position: 'relative',
        textAlign: 'center'
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      //Calendar week
      calendarWeek: {
        alignItems: 'center',
        color: theme.Colors.GRAY_500,
        display: 'flex',
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.SMALL,
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
        color: theme.Colors.GRAY_300,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 30,

        ':hover': {
          border: '1px solid' + theme.Colors.PRIMARY
        }
      },
      calendarDayDisabled: {
        color: theme.Colors.GRAY_300,

        ':hover': {
          cursor: 'default',
          border: 'none'
        }
      },
      today: {
        backgroundColor: theme.Colors.GRAY_300,
        color: theme.Colors.WHITE
      },
      currentMonth: {
        color: theme.Colors.GRAY_700
      },

      //Default Ranges
      defaultRangesTitle: {
        color: theme.Colors.PRIMARY,
        display: isLargeOrMediumWindowSize ? 'inline-block' : 'none',
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.SMALL,
        padding: `${theme.Spacing.LARGE}px 0px ${theme.Spacing.SMALL}px ${theme.Spacing.LARGE}px`
      },
      rangeOptions: {
        borderRight: isLargeOrMediumWindowSize ? '1px solid ' + theme.Colors.GRAY_300 : 'none',
        borderTop: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + theme.Colors.GRAY_300,
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        display: isLargeOrMediumWindowSize ? 'inline-block' : 'flex',
        flexDirection: isLargeOrMediumWindowSize ? 'column' : 'row',
        flexWrap: isLargeOrMediumWindowSize ? 'nowrap' : 'wrap',
        fontSize: theme.FontSizes.MEDIUM,
        marginLeft: isLargeOrMediumWindowSize ? -10 : 0,
        marginRight: isLargeOrMediumWindowSize ? -10 : 0,
        maxWidth: window.innerWidth > 450 ? 250 : 'inherit',
        width: isLargeOrMediumWindowSize ? 150 : '100%'
      },
      rangeOption: {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        padding: `${theme.Spacing.SMALL}px ${theme.Spacing.MEDIUM}px`,
        width: isLargeOrMediumWindowSize ? '100%' : '50%',

        ':hover': {
          backgroundColor: theme.Colors.GRAY_100
        }
      },
      rangeOptionIcon: {
        paddingRight: theme.Spacing.SMALL
      },

      //Selected and Selecting Range
      selectedDay: {
        backgroundColor: theme.Colors.PRIMARY,
        color: theme.Colors.WHITE
      },
      betweenDay: {
        backgroundColor: StyleUtils.adjustHexOpacity(theme.Colors.PRIMARY, 0.5),
        borderRadius: 0,

        ':hover': {
          border: '1px solid' + theme.Colors.PRIMARY
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
