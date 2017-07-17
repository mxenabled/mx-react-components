'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');
var Radium = require('radium');
var React = require('react');
var Icon = require('../Icon');

var DefaultRanges = Radium(function (_ref) {
  var defaultRanges = _ref.defaultRanges,
      handleDefaultRangeSelection = _ref.handleDefaultRangeSelection,
      primaryColor = _ref.primaryColor,
      selectedStartDate = _ref.selectedStartDate,
      selectedEndDate = _ref.selectedEndDate,
      styles = _ref.styles;
  return React.createElement(
    'div',
    { style: styles.rangeOptions },
    defaultRanges.map(function (range) {
      return React.createElement(
        'div',
        { key: range.displayValue + range.startDate, onClick: handleDefaultRangeSelection.bind(null, range), style: styles.rangeOption },
        React.createElement(
          'div',
          null,
          React.createElement(Icon, {
            size: 20,
            style: _extends({}, styles.rangeOptionIcon, {
              fill: range.startDate === selectedStartDate && range.endDate === selectedEndDate ? primaryColor : 'transparent'
            }),
            type: 'check-solid'
          })
        ),
        React.createElement(
          'div',
          null,
          range.displayValue
        )
      );
    })
  );
});

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