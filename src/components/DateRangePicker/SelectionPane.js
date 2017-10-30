const React = require('react');
const moment = require('moment');
const keycode = require('keycode');
const PropTypes = require('prop-types');

const DefaultRanges = require('../DateRangePicker/DefaultRanges');

const { SelectedBox } = require('../../constants/DateRangePicker');
const { themeShape } = require('../../constants/App');

const StyleUtils = require('../../utils/Style');
const { deprecatePrimaryColor } = require('../../utils/Deprecation');

class SelectionPane extends React.Component {
  static propTypes = {
    currentDate: PropTypes.string,
    defaultRanges: PropTypes.array,
    onDateBoxClick: PropTypes.func,
    primaryColor: PropTypes.string,
    selectedBox: PropTypes.string,
    selectedEndDate: PropTypes.number,
    selectedStartDate: PropTypes.number,
    setCurrentDate: PropTypes.func,
    theme: themeShape
  };

  componentDidMount () {
    deprecatePrimaryColor(this.props);
  }

  _handleDateBoxClick = (date, selectedBox) => {
    this.props.onDateBoxClick(date, selectedBox);
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme, this.props.primaryColor);
    const styles = this.styles(theme);
    const { selectedStartDate, selectedEndDate } = this.props;

    return (
      <div style={styles.container}>
        <div>
          <label style={styles.boxLabel}>From</label>
          <a
            onClick={() => this._handleDateBoxClick(selectedStartDate, SelectedBox.FROM)}
            onKeyUp={(e) => keycode(e) === 'enter' && this._handleDateBoxClick(selectedStartDate, SelectedBox.FROM)}
            style={Object.assign({}, styles.dateSelectBox, this.props.selectedBox === SelectedBox.FROM ? styles.selectedDateSelectBox : null)}
            tabIndex={0}
          >
            {selectedStartDate ? moment.unix(selectedStartDate).format('MMM D, YYYY') : 'Select Start Date'}
          </a>

          <label style={styles.boxLabel}>To</label>
          <a
            onClick={() => this._handleDateBoxClick(selectedEndDate, SelectedBox.TO)}
            onKeyUp={(e) => keycode(e) === 'enter' && this._handleDateBoxClick(selectedEndDate, SelectedBox.TO)}
            style={Object.assign({}, styles.dateSelectBox, this.props.selectedBox === SelectedBox.TO ? styles.selectedDateSelectBox : null)}
            tabIndex={0}
          >
            {selectedEndDate ? moment.unix(selectedEndDate).format('MMM D, YYYY') : 'Select End Date'}
          </a>
        </div>
        <div>
          <div style={Object.assign({}, styles.defaultRangesTitle, { color: theme.Colors.PRIMARY })}>
            Select a Range
          </div>
          <DefaultRanges {...this.props} primaryColor={theme.Colors.PRIMARY} styles={styles} />
        </div>
      </div>
    );
  }

  styles = theme => {
    const isLargeOrMediumWindowSize = ['large', 'medium'].indexOf(StyleUtils.getWindowSize(theme.BreakPoints)) !== -1;

    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: isLargeOrMediumWindowSize ? '1px solid ' + theme.Colors.GRAY_300 : 'none',
        padding: theme.Spacing.MEDIUM,
        boxSizing: 'border-box',
        width: isLargeOrMediumWindowSize ? 275 : '100%'
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      boxLabel: {
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        color: theme.Colors.GRAY_700
      },
      dateSelectBox: {
        borderColor: theme.Colors.GRAY_300,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'block',
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        marginBottom: theme.Spacing.SMALL,
        marginTop: theme.Spacing.XSMALL,
        padding: '10px 15px'
      },
      selectedDateSelectBox: {
        borderColor: theme.Colors.PRIMARY,
        cursor: 'pointer',
        color: theme.Colors.PRIMARY
      },

      //Default Ranges
      defaultRangesTitle: {
        color: theme.Colors.PRIMARY,
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.SMALL,
        padding: `${theme.Spacing.LARGE}px 0px ${theme.Spacing.SMALL}px ${theme.Spacing.LARGE}px`
      },
      rangeOptions: {
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: theme.FontSizes.MEDIUM,
        width: '100%'
      },
      rangeOption: {
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'flex',
        padding: `${theme.Spacing.SMALL}px ${theme.Spacing.SMALL}px`,
        width: '50%',
        fontSize: theme.FontSizes.SMALL,

        ':hover': {
          backgroundColor: theme.Colors.GRAY_100
        },

        ':focus': {
          backgroundColor: theme.Colors.GRAY_100,
          outline: 'none'
        }
      },
      rangeOptionIcon: {
        paddingRight: theme.Spacing.SMALL
      }

    };
  }
}

module.exports = SelectionPane;
