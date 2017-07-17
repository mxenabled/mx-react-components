'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var BreakPointGroup = function (_React$Component) {
  _inherits(BreakPointGroup, _React$Component);

  function BreakPointGroup() {
    _classCallCheck(this, BreakPointGroup);

    return _possibleConstructorReturn(this, (BreakPointGroup.__proto__ || Object.getPrototypeOf(BreakPointGroup)).apply(this, arguments));
  }

  _createClass(BreakPointGroup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          adjustedHeight = _props.adjustedHeight,
          adjustedWidth = _props.adjustedWidth,
          breakPointDate = _props.breakPointDate,
          breakPointLabel = _props.breakPointLabel,
          margin = _props.margin,
          translation = _props.translation,
          xScaleValueFunction = _props.xScaleValueFunction;

      var breakPointXValue = xScaleValueFunction(breakPointDate);
      var breakPointLabelOffSet = 10;
      var breakPointLabelYPosition = 40;

      return React.createElement(
        'g',
        { className: 'break-point-items', transform: translation },
        React.createElement('line', {
          className: 'break-point-line',
          x1: breakPointXValue,
          x2: breakPointXValue,
          y1: margin.top,
          y2: adjustedHeight + margin.bottom
        }),
        adjustedWidth - breakPointXValue - breakPointLabelOffSet > 100 ? React.createElement(
          'text',
          {
            className: 'break-point-label',
            x: breakPointXValue + breakPointLabelOffSet,
            y: breakPointLabelYPosition
          },
          breakPointLabel
        ) : null
      );
    }
  }]);

  return BreakPointGroup;
}(React.Component);

BreakPointGroup.propTypes = {
  adjustedHeight: PropTypes.number.isRequired,
  adjustedWidth: PropTypes.number.isRequired,
  breakPointDate: PropTypes.number.isRequired,
  breakPointLabel: PropTypes.string.isRequired,
  margin: PropTypes.object.isRequired,
  translation: PropTypes.string,
  xScaleValueFunction: PropTypes.func.isRequired
};
BreakPointGroup.defaultProps = {
  translation: 'translate(0,0)'
};


module.exports = BreakPointGroup;