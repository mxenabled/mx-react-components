const PropTypes = require('prop-types');
const Radium = require('radium');
const React = require('react');
const Icon = require('../Icon');

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

module.exports = DefaultRanges;
