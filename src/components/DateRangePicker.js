const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const keycode = require('keycode');

const moment = require('moment');
const _merge = require('lodash/merge');

const Icon = require('./Icon');
const Button = require('./Button');
const MXFocusTrap = require('../components/MXFocusTrap');

const { SelectedBox } = require('../constants/DateRangePicker');
const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');
const { deprecatePrimaryColor } = require('../utils/Deprecation');

const MonthTable = require('./DateRangePicker/MonthTable');
const { MonthSelector, YearSelector } = require('./DateRangePicker/Selector');
const SelectionPane = require('./DateRangePicker/SelectionPane');

class DateRangePicker extends React.Component {
  static propTypes = {
    defaultRanges: PropTypes.arrayOf(
      PropTypes.shape({
        displayValue: PropTypes.string,
        getEndDate: PropTypes.func,
        getStartDate: PropTypes.func
      })
    ),
    elementRef: PropTypes.func,
    focusTrapProps: PropTypes.object,
    format: PropTypes.string,
    isRelative: PropTypes.bool,
    locale: PropTypes.string,
    minimumDate: PropTypes.number,
    onClose: PropTypes.func,
    onDateSelect: PropTypes.func,
    placeholderText: PropTypes.string,
    primaryColor: PropTypes.string,
    selectedEndDate: PropTypes.number,
    selectedStartDate: PropTypes.number,
    showDefaultRanges: PropTypes.bool,
    style: PropTypes.object,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    defaultRanges: [
      {
        displayValue: 'This Month',
        getEndDate: () =>
          moment()
            .endOf('month')
            .unix(),
        getStartDate: () =>
          moment()
            .startOf('month')
            .unix()
      },
      {
        displayValue: 'Last 30 Days',
        getEndDate: () =>
          moment()
            .endOf('day')
            .unix(),
        getStartDate: () =>
          moment()
            .subtract(29, 'days')
            .startOf('day')
            .unix()
      },
      {
        displayValue: 'Last Month',
        getEndDate: () =>
          moment()
            .subtract(1, 'months')
            .endOf('month')
            .unix(),
        getStartDate: () =>
          moment()
            .subtract(1, 'months')
            .startOf('month')
            .unix()
      },
      {
        displayValue: 'Last 90 Days',
        getEndDate: () =>
          moment()
            .endOf('day')
            .unix(),
        getStartDate: () =>
          moment()
            .subtract(89, 'days')
            .startOf('day')
            .unix()
      },
      {
        displayValue: 'Year To Date',
        getEndDate: () =>
          moment()
            .endOf('day')
            .unix(),
        getStartDate: () =>
          moment()
            .startOf('year')
            .unix()
      },
      {
        displayValue: 'Last Year',
        getEndDate: () =>
          moment()
            .startOf('year')
            .subtract(1, 'd')
            .unix(),
        getStartDate: () =>
          moment()
            .startOf('year')
            .subtract(1, 'y')
            .unix()
      }
    ],
    focusTrapProps: {},
    format: 'MMM D, YYYY',
    isRelative: true,
    locale: 'en',
    onClose () {},
    onDateSelect () {},
    placeholderText: 'Select A Date Range',
    showDefaultRanges: false
  };

  constructor (props) {
    super(props);

    this.state = {
      currentDate: props.selectedEndDate || moment().unix(),
      focusedDay: props.selectedEndDate || moment().unix(),
      selectedBox: SelectedBox.FROM,
      selectedStartDate: this.props.selectedStartDate,
      selectedEndDate: this.props.selectedEndDate,
      showSelectionPane: false
    };
  }

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  componentWillReceiveProps (newProps) {
    const isUpdatedSelectedEndDate =
      newProps.selectedEndDate &&
      newProps.selectedEndDate !== this.props.selectedEndDate;
    const isUpdatedSelectedStartDate =
      newProps.selectedStartDate &&
      newProps.selectedStartDate !== this.props.selectedStartDate;

    if (isUpdatedSelectedEndDate || isUpdatedSelectedStartDate) {
      this.setState({
        currentDate: newProps.selectedEndDate ?
          newProps.selectedEndDate :
          newProps.selectedStartDate
      });
    }
  }

  _getDateFormat = isLargeOrMediumWindowSize => {
    return isLargeOrMediumWindowSize ? this.props.format : 'MMM D';
  };

  _isLargeOrMediumWindowSize = theme => {
    const windowSize = StyleUtils.getWindowSize(theme.BreakPoints);

    return windowSize === 'large' || windowSize === 'medium';
  };

  _endDateIsBeforeStartDate = (startDate, endDate) => {
    return moment.unix(endDate).isBefore(moment.unix(startDate));
  };

  _handleDateSelect = date => {
    const theme = StyleUtils.mergeTheme(
      this.props.theme,
      this.props.primaryColor
    );
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);

    this.setState({
      currentDate: date,
      focusedDay: date
    });

    let endDate = this.state.selectedEndDate;
    let startDate = this.state.selectedStartDate;

    if (this.state.selectedBox === SelectedBox.FROM) {
      startDate = date;
      if (isLargeOrMediumWindowSize)
        this.setState({ selectedBox: SelectedBox.TO });
    }

    if (this.state.selectedBox === SelectedBox.TO) {
      endDate = date;
      if (isLargeOrMediumWindowSize)
        this.setState({ selectedBox: SelectedBox.FROM });
    }

    const modifiedRangeCompleteButDatesInversed =
      startDate &&
      endDate &&
      this._endDateIsBeforeStartDate(startDate, endDate);

    if (modifiedRangeCompleteButDatesInversed) {
      this.setState({
        selectedStartDate: endDate,
        selectedEndDate: startDate
      });
    } else {
      this.setState({
        selectedStartDate: startDate,
        selectedEndDate: endDate
      });
    }
  };

  _handleDefaultRangeSelection = range => {
    this.setState({
      selectedStartDate: range.getStartDate(),
      selectedEndDate: range.getEndDate(),
      focusedDay: range.getEndDate()
    });
  };

  _handleDayKeyDown = e => {
    const startDate = moment
      .unix(this.state.currentDate)
      .startOf('month')
      .startOf('week');
    const endDate = moment
      .unix(this.state.currentDate)
      .endOf('month')
      .endOf('week');

    if (keycode(e) === 'right') {
      const day = moment
        .unix(this.state.focusedDay)
        .add(1, 'days')
        .startOf('day');

      if (day.isSameOrAfter(endDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'left') {
      const day = moment
        .unix(this.state.focusedDay)
        .subtract(1, 'days')
        .startOf('day');

      if (day.isBefore(startDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'enter') {
      this._handleDateSelect(this.state.focusedDay);
    } else if (keycode(e) === 'up') {
      e.preventDefault(); //stop browser scrolling
      const day = moment
        .unix(this.state.focusedDay)
        .subtract(7, 'days')
        .startOf('day');

      if (day.isBefore(startDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    } else if (keycode(e) === 'down') {
      e.preventDefault(); //stop browser scrolling
      const day = moment
        .unix(this.state.focusedDay)
        .add(7, 'days')
        .startOf('day');

      if (day.isSameOrAfter(endDate)) {
        this.setState({ currentDate: day.unix() });
      }

      this.setState({ focusedDay: day.unix() });
    }
  };

  _handleDateHover = activeSelectDate => {
    this.setState({
      activeSelectDate
    });
  };

  _handleScrimClick = () => {
    this.props.onClose();

    this.setState({
      showSelectionPane: false
    });
  };

  _toggleSelectionPane = () => {
    this.setState({
      showSelectionPane: !this.state.showSelectionPane
    });
  };

  _isInActiveRange = (selectedStart, selectedEnd, active, date) => {
    const start = selectedStart || active;
    const end = selectedEnd || active;

    let isActive;

    if (start < end) {
      isActive =
        date.isSameOrAfter(moment.unix(start)) &&
        date.isSameOrBefore(moment.unix(end));
    } else {
      isActive =
        date.isSameOrBefore(moment.unix(start)) &&
        date.isSameOrAfter(moment.unix(end));
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
    const theme = StyleUtils.mergeTheme(
      this.props.theme,
      this.props.primaryColor
    );
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize(theme);
    const styles = this.styles(theme, isLargeOrMediumWindowSize);
    const shouldShowCalendarIcon =
      StyleUtils.getWindowSize(theme.BreakPoints) !== 'small';
    const showCalendar = isLargeOrMediumWindowSize || this.state.showCalendar;
    const { selectedEndDate, selectedStartDate } = this.state;

    const mergedFocusTrapProps = {
      focusTrapOptions: {
        clickOutsideDeactivates: true
      },
      paused: false,
      ...this.props.focusTrapProps
    };

    return (
      <div style={styles.component}>
        <a
          onClick={this._toggleSelectionPane}
          onKeyDown={e => keycode(e) === 'enter' && this._toggleSelectionPane()}
          ref={this.props.elementRef}
          style={styles.selectedDateWrapper}
          tabIndex={0}
        >
          {shouldShowCalendarIcon ? (
            <Icon size={20} style={styles.selectedDateIcon} type='calendar' />
          ) : null}
          <div style={styles.selectedDateText}>
            {this.props.selectedStartDate && this.props.selectedEndDate ? (
              <div>
                <span>
                  {moment
                    .unix(this.props.selectedStartDate)
                    .format(this._getDateFormat(isLargeOrMediumWindowSize))}
                </span>
                <span> - </span>
                <span>
                  {moment
                    .unix(this.props.selectedEndDate)
                    .format(this._getDateFormat(isLargeOrMediumWindowSize))}
                </span>
              </div>
            ) : (
              this.props.placeholderText
            )}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showSelectionPane ? 'caret-up' : 'caret-down'}
          />
        </a>
        <div style={styles.container}>
          <div>
            {this.state.showSelectionPane && (
              <MXFocusTrap {...mergedFocusTrapProps}>
                <div style={styles.optionsWrapper}>
                  <div style={styles.column}>
                    <div style={styles.row}>
                      {!this.state.showCalendar && (
                        <div>
                          {this.props.showDefaultRanges && (
                            <SelectionPane
                              defaultRanges={this.props.defaultRanges}
                              handleDefaultRangeSelection={
                                this._handleDefaultRangeSelection
                              }
                              onDateBoxClick={(date, selectedBox) => {
                                this.setState({
                                  currentDate: date || moment().unix(),
                                  selectedBox,
                                  showCalendar: true
                                });
                              }}
                              selectedBox={this.state.selectedBox}
                              selectedEndDate={selectedEndDate}
                              selectedStartDate={selectedStartDate}
                              styles={styles}
                              theme={theme}
                            />
                          )}
                        </div>
                      )}

                      {showCalendar ? (
                        <div>
                          <div style={styles.calendarWrapper}>
                            <div style={styles.calendarHeader}>
                              <MonthSelector
                                currentDate={this.state.currentDate}
                                setCurrentDate={currentDate =>
                                  this.setState({
                                    currentDate,
                                    focusedDay: currentDate
                                  })}
                              />
                              <YearSelector
                                currentDate={this.state.currentDate}
                                setCurrentDate={currentDate =>
                                  this.setState({
                                    currentDate,
                                    focusedDay: currentDate
                                  })}
                              />
                            </div>
                            <div style={styles.calendarWeek}>
                              {[
                                { label: 'S', value: 'Sunday' },
                                { label: 'M', value: 'Monday' },
                                { label: 'T', value: 'Tuesday' },
                                { label: 'W', value: 'Wednesday' },
                                { label: 'T', value: 'Thursday' },
                                { label: 'F', value: 'Friday' },
                                { label: 'S', value: 'Saturday' }
                              ].map(day => {
                                return (
                                  <div
                                    key={day.value}
                                    style={styles.calendarWeekDay}
                                  >
                                    {day.label}
                                  </div>
                                );
                              })}
                            </div>
                            <MonthTable
                              activeSelectDate={this.state.activeSelectDate}
                              currentDate={this.state.currentDate}
                              focusedDay={
                                this.state.focusedDay ||
                                this.state.currentDate
                              }
                              getDateRangePosition={
                                this._getDateRangePosition
                              }
                              handleDateHover={this._handleDateHover}
                              handleDateSelect={date => {
                                this._handleDateSelect(date);
                                this.setState({ showCalendar: false });
                              }}
                              handleKeyDown={this._handleDayKeyDown}
                              isInActiveRange={this._isInActiveRange}
                              minimumDate={this.props.minimumDate}
                              selectedEndDate={selectedEndDate}
                              selectedStartDate={selectedStartDate}
                              styles={styles}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div style={styles.bottomPane}>
                      <Button
                        onClick={() => {
                          this.setState({
                            focusedDay: this.props.selectedStartDate,
                            showCalendar: false,
                            selectedStartDate: this.props.selectedStartDate,
                            selectedEndDate: this.props.selectedEndDate
                          });
                          this._handleScrimClick();
                        }}
                        type='secondary'
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          this.props.onDateSelect(
                            selectedStartDate,
                            selectedEndDate
                          );
                          this._handleScrimClick();
                        }}
                        style={styles.applyButton}
                        type={selectedStartDate && selectedEndDate ? 'primary' : 'disabled'}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </MXFocusTrap>
            )}
          </div>
        </div>
        {this.state.showSelectionPane ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null}
      </div>
    );
  }

  styles = (theme, isLargeOrMediumWindowSize) => {
    return _merge(
      {},
      {
        component: Object.assign(
          {
            backgroundColor: theme.Colors.WHITE,
            borderColor: this.state.showSelectionPane ?
              theme.Colors.PRIMARY :
              theme.Colors.GRAY_300,
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
            position:
              this.props.isRelative && window.innerWidth > 450 ?
                'relative' :
                'static',
            width: '100%'
          },
          this.props.style
        ),

        container: {
          flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column-reverse'
        },

        bottomPane: {
          backgroundColor: theme.Colors.GRAY_100,
          display: 'flex',
          flexDirection: 'row',
          padding: theme.Spacing.SMALL,
          paddingRight: theme.Spacing.MEDIUM,
          justifyContent: 'flex-end'
        },
        bottomPaneMobile: {
          display: 'flex',
          flexDirection: 'row',
          padding: theme.Spacing.SMALL,
          paddingTop: theme.Spacing.MEDIUM,
          justifyContent: 'flex-end'
        },
        column: {
          display: 'flex',
          flexDirection: 'column'
        },
        row: {
          display: 'flex',
          flexDirection: 'row',
          padding: theme.Spacing.SMALL,
          justifyContent: 'center'
        },

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
          color:
            this.state.selectedStartDate && this.state.selectedEndDate ?
              theme.Colors.GRAY_700 :
              theme.Colors.GRAY_500
        },
        selectedDateCaret: {
          fill: this.state.showSelectionPane ?
            theme.Colors.PRIMARY :
            theme.Colors.GRAY_500
        },

        //Calendar Styles
        optionsWrapper: {
          backgroundColor: theme.Colors.WHITE,
          border: '1px solid ' + theme.Colors.GRAY_300,
          borderRadius: 3,
          boxShadow: theme.ShadowHigh,
          boxSizing: 'border-box',
          display: this.state.showSelectionPane ? 'flex' : 'none',
          flexDirection: isLargeOrMediumWindowSize ? 'row' : 'column',
          justifyContent: 'center',
          marginTop: isLargeOrMediumWindowSize ? 10 : 5,
          position: 'absolute',
          left: isLargeOrMediumWindowSize ? '50%' : 0,
          right: isLargeOrMediumWindowSize ? 'auto' : 0,
          transform: isLargeOrMediumWindowSize ? 'translateX(-50%)' : null,
          zIndex: 10,
          maxWidth: 575,
          width: window.innerWidth
        },
        calendarWrapper: {
          boxSizing: 'border-box',
          padding: 20,
          margin: 'auto',
          maxWidth: 275,
          width: isLargeOrMediumWindowSize ? 275 : '100%'
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
        applyButton: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: theme.Spacing.MEDIUM
        },

        //Selected and Selecting Range
        selectedDay: {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE
        },
        betweenDay: {
          backgroundColor: StyleUtils.adjustHexOpacity(
            theme.Colors.PRIMARY,
            0.5
          ),
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
      },
      this.props.styles
    );
  };
}

module.exports = Radium(DateRangePicker);
