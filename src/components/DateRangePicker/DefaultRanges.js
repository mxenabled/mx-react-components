const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');
const Icon = require('../Icon');
const { themeShape } = require('../../constants/App');

class DefaultRanges extends React.Component {
  state = {
    selectedOption: null
  };

  render () {
    const { defaultRanges, handleDefaultRangeSelection, selectedStartDate, selectedEndDate, styles, theme } = this.props;

    return (
      <div className='mx-default-ranges' role='' style={styles.rangeOptions}>

        {defaultRanges.map((range, index) => {
          const isSelectedRange
            = this.state.selectedOption === index
            && range.getStartDate() === selectedStartDate
            && range.getEndDate() === selectedEndDate;

          return (
            <button
              aria-label={`${range.displayValue} range${isSelectedRange ? ', Selected' : ''}`}
              className='mx-default-ranges-range'
              key={range.displayValue + range.getStartDate()}
              onClick={() => {
                handleDefaultRangeSelection(range);
                this.setState({ selectedOption: index });
              }}
              style={styles.rangeOption}
            >
              <div>
                <Icon
                  size={20}
                  style={Object.assign({}, styles.rangeOptionIcon, {
                    fill: isSelectedRange ? theme.Colors.PRIMARY : 'transparent'
                  })}
                  type='check-solid'
                />
              </div>
              <div>
                {range.displayValue}
              </div>
            </button>
          );
        })}
      </div>
    );
  }
}

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
  }),
  theme: themeShape
};

module.exports = Radium(DefaultRanges);
