const React = require('react');
const moment = require('moment');
const PropTypes = require('prop-types');

import { withTheme } from '../Theme';
const DefaultRanges = require('../DateRangePicker/DefaultRanges');

const { SelectedBox } = require('../../constants/DateRangePicker');
const { themeShape } = require('../../constants/App');

const StyleUtils = require('../../utils/Style');

class SelectionPane extends React.Component {
  static propTypes = {
    currentDate: PropTypes.string,
    defaultRanges: PropTypes.array,
    getFromButtonRef: PropTypes.func,
    getToButtonRef: PropTypes.func,
    getTranslation: PropTypes.func,
    locale: PropTypes.string,
    onDateBoxClick: PropTypes.func,
    selectedBox: PropTypes.string,
    selectedEndDate: PropTypes.number,
    selectedStartDate: PropTypes.number,
    setCurrentDate: PropTypes.func,
    theme: themeShape
  };

  componentDidMount() {
    moment.locale(this.props.locale)
  }

  _handleDateBoxClick = (date, selectedBox) => {
    this.props.onDateBoxClick(date, selectedBox);
  }

  _formatDate = (date) => {
    return moment.unix(date).format('MMM D, YYYY')
  }

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const { getTranslation, selectedStartDate, selectedEndDate } = this.props;

    return (
      <div className='mx-selection-pane' style={styles.container}>
        <div>
          <label style={styles.boxLabel}>{getTranslation('From')}</label>
          <button
            aria-label={getTranslation(`Select Start Date${selectedStartDate ? ', Current start date is' : ''} %1`, this._formatDate(selectedStartDate))}
            className='mx-selection-pane-from-field'
            onClick={() => this._handleDateBoxClick(selectedStartDate, SelectedBox.FROM)}
            ref={this.props.getFromButtonRef}
            style={{ ...styles.dateSelectBox, ...this.props.selectedBox === SelectedBox.FROM ? styles.selectedDateSelectBox : {}}}
          >
            {selectedStartDate ? this._formatDate(selectedStartDate) : getTranslation('Select Start Date')}
          </button>

          <label style={styles.boxLabel}>{getTranslation('To')}</label>
          <button
            aria-label={getTranslation(`Select End Date${selectedEndDate ? ', Current end date is' : ''} %1`, this._formatDate(selectedEndDate))}
            className='mx-selection-pane-to-field'
            onClick={() => this._handleDateBoxClick(selectedEndDate, SelectedBox.TO)}
            ref={this.props.getToButtonRef}
            style={{ ...styles.dateSelectBox, ...this.props.selectedBox === SelectedBox.TO ? styles.selectedDateSelectBox : {}}}
          >
            {selectedEndDate ? this._formatDate(selectedEndDate) : getTranslation('Select End Date')}
          </button>
        </div>
        <div>
          <div style={{ ...styles.defaultRangesTitle, color: theme.Colors.PRIMARY }}>
            {getTranslation('Select a Range')}
          </div>
          <DefaultRanges {...this.props} styles={styles} theme={theme} />
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
        width: 275
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      boxLabel: {
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        color: theme.Colors.GRAY_700,
        display: 'inline-block',
        marginTop: theme.Spacing.SMALL
      },
      dateSelectBox: {
        backgroundColor: 'transparent',
        borderColor: theme.Colors.GRAY_300,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        cursor: 'pointer',
        display: 'block',
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.MEDIUM,
        marginBottom: theme.Spacing.SMALL,
        marginTop: theme.Spacing.XSMALL,
        padding: '10px 15px',
        textAlign: 'left',
        width: '100%'
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
        padding: `${theme.Spacing.LARGE}px 0px ${theme.Spacing.SMALL}px 0px`
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
        backgroundColor: 'transparent',
        border: 'none',
        boxSizing: 'border-box',
        color: theme.Colors.GRAY_700,
        cursor: 'pointer',
        display: 'flex',
        padding: `${theme.Spacing.SMALL}px ${theme.Spacing.SMALL}px`,
        width: '50%',
        fontSize: theme.FontSizes.SMALL,

        '&:hover': {
          backgroundColor: theme.Colors.GRAY_100
        },

        '&:focus': {
          backgroundColor: theme.Colors.GRAY_100
        }
      },
      rangeOptionIcon: {
        paddingRight: theme.Spacing.SMALL
      }
    };
  };
}

module.exports = withTheme(SelectionPane);
