const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');
const Icon = require('../Icon');

class DefaultRanges extends React.Component {
  state = {
    selectedOption: null
  };

  render () {
    const { defaultRanges, handleDefaultRangeSelection, primaryColor, selectedStartDate, selectedEndDate, styles } = this.props;

    return (
      <div className='mx-default-ranges' style={styles.rangeOptions}>

        {defaultRanges.map((range, index) => {
          const isSelectedRange =
            this.state.selectedOption === index &&
            range.getStartDate() === selectedStartDate &&
            range.getEndDate() === selectedEndDate;

          return (
            <button
              aria-pressed={isSelectedRange}
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
                    fill: isSelectedRange ? primaryColor : 'transparent'
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
  })
};

module.exports = Radium(DefaultRanges);
