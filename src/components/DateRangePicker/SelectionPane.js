const React = require('react');
const moment = require('moment');
const PropTypes = require('prop-types');

// const Icon = require('../Icon');
const StyleConstants = require('../../constants/Style');

const DefaultRanges = require('../DateRangePicker/DefaultRanges');

class SelectionPane extends React.Component {
  static propTypes = {
    currentDate: PropTypes.string,
    defaultRanges: PropTypes.array,
    handleFromClick: PropTypes.func,
    handleToClick: PropTypes.func,
    isLargeOrMediumWindowSize: PropTypes.string,
    primaryColor: PropTypes.string,
    selectedBox: PropTypes.string,
    selectedEndDate: PropTypes.number,
    selectedStartDate: PropTypes.number,
    setCurrentDate: PropTypes.func
  };

  state = {
    selectedBox: 'from'
  }

  _handleDateBoxClick = (date, selectedBox) => {
    // console.log("XXX date", date)
    // this.setState({
    //   selectedBox
    // });

    this.props.handleFromClick(date, selectedBox);
  }

  render () {
    const styles = this.styles();
    const { selectedStartDate, selectedEndDate } = this.props;

    return (
      <div style={styles.container}>
        <div>
          <label style={styles.boxLabel}>From</label>
          <div onClick={() => this._handleDateBoxClick(selectedStartDate, 'from')} style={Object.assign({}, styles.dateSelectBox, this.props.selectedBox === 'from' ? styles.selectedDateSelectBox : null)}>{selectedStartDate ? moment.unix(selectedStartDate).format('MMM D, YYYY') : 'Select Start Date'}</div>

          <label style={styles.boxLabel}>To</label>
          <div onClick={() => this._handleDateBoxClick(selectedEndDate, 'to')} style={Object.assign({}, styles.dateSelectBox, this.props.selectedBox === 'to' ? styles.selectedDateSelectBox : null)}>{selectedEndDate ? moment.unix(selectedEndDate).format('MMM D, YYYY') : 'Select End Date'}</div>
        </div>
        <div>
          <div style={Object.assign({}, styles.defaultRangesTitle, { color: this.props.primaryColor })}>
            Select a Range
          </div>
          <DefaultRanges {...this.props} styles={styles} />
        </div>
      </div>
    );
  }

  styles = () => {
    const { isLargeOrMediumWindowSize } = this.props;

    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: isLargeOrMediumWindowSize ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        borderTop: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + StyleConstants.Colors.FOG,
        width: 300
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      dateSelectBox: {
        // borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderColor: StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        cursor: 'pointer',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '10px 15px'
      },
      selectedDateSelectBox: {
        borderColor: this.props.primaryColor,
        cursor: 'pointer',
        color: this.props.primaryColor
      },

      //Default Ranges
      defaultRangesTitle: {
        color: StyleConstants.Colors.PRIMARY,
        display: isLargeOrMediumWindowSize ? 'inline-block' : 'none',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        padding: `${StyleConstants.Spacing.LARGE}px 0px ${StyleConstants.Spacing.SMALL}px ${StyleConstants.Spacing.LARGE}px`
      },
      rangeOptions: {
        // borderRight: isLargeOrMediumWindowSize ? '1px solid ' + StyleConstants.Colors.FOG : 'none',
        // borderTop: isLargeOrMediumWindowSize ? 'none' : '1px solid ' + StyleConstants.Colors.FOG,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        // flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: StyleConstants.FontSizes.MEDIUM,
        marginLeft: isLargeOrMediumWindowSize ? -10 : 0,
        marginRight: isLargeOrMediumWindowSize ? -10 : 0,
        // maxWidth: window.innerWidth > 450 ? 250 : 'inherit',
        width: '100%'
      },
      rangeOption: {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        padding: `${StyleConstants.Spacing.SMALL}px ${StyleConstants.Spacing.MEDIUM}px`,
        width: '50%',

        ':hover': {
          backgroundColor: StyleConstants.Colors.PORCELAIN
        }
      },
      rangeOptionIcon: {
        paddingRight: StyleConstants.Spacing.SMALL
      }

    };
  }
}

module.exports = SelectionPane;
