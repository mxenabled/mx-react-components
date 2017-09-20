const PropTypes = require('prop-types');
const Radium = require('radium');
const keycode = require('keycode');
const React = require('react');
const Icon = require('../Icon');

const DefaultRanges = Radium(({ defaultRanges, handleDefaultRangeSelection, primaryColor, selectedStartDate, selectedEndDate, styles }) => (
  <div style={styles.rangeOptions}>

    {defaultRanges.map(range => (
      <div
        key={range.displayValue + range.getStartDate()}
        onClick={handleDefaultRangeSelection.bind(null, range)}
        onKeyUp={(e) => keycode(e) === 'enter' && handleDefaultRangeSelection(range)}
        style={styles.rangeOption}
        tabIndex={0}
      >
        <div>
          <Icon
            size={20}
            style={Object.assign({}, styles.rangeOptionIcon, {
              fill: range.getStartDate() === selectedStartDate && range.getEndDate() === selectedEndDate ? primaryColor : 'transparent'
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
